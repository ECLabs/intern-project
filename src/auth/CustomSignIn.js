import React from 'react';
import '../App.css';
import { Auth } from 'aws-amplify';
import { SignIn } from 'aws-amplify-react';
import { Col, Form, FormGroup, Label, Input, Button, FormText, FormFeedback } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faKey} from '@fortawesome/free-solid-svg-icons';
import GoogleButton from 'react-google-button'

library.add(faEnvelope, faKey);

export default class CustomSignIn extends SignIn {
  constructor(props) {
    super(props);
      this.state = {
      'email': '',
      'password': '',
      validate: {
        emailState: '',
      },
    }
    this.handleChange = this.handleChange.bind(this);
  }

  validateEmail(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))$/;
    const { validate } = this.state
      if (emailRex.test(e.target.value)) {
        validate.emailState = 'has-success'
      } else {
        validate.emailState = 'has-danger'
      }
      this.setState({ validate })
  }

  handleChange = async (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [ name ]: value,
    });
  }

  submitForm(e) {
    e.preventDefault();
    this.inputs.username = this.state.email;
    this.inputs.password = this.state.password;
    this.signIn();
    console.log(`Email: ${ this.state.email }`);
    console.log(`Password: ${ this.state.password}`);
  }


  showComponent(theme) {
    const { email, password } = this.state;
    const { hide = [] } = this.props;
    if (hide && hide.includes(CustomSignIn)) { return null; }
    return (
      <div className="App">
        <h2>Sign In</h2>
        <Form className="form" onSubmit={ (e) => this.submitForm(e) }>
          <Col>
            <FormGroup>
              <Label>
                <FontAwesomeIcon
                  icon="envelope"
                  color="#4885ed"
                  size="sm"
                />{' '}Username
                </Label>
              <Input
                type="username"
                name="email"
                id="exampleEmail"
                placeholder="name@position"
                value={ email }
                valid={ this.state.validate.emailState === 'has-success' }
                invalid={ this.state.validate.emailState === 'has-danger' }
                onChange={ (e) => {
                            this.validateEmail(e)
                            this.handleChange(e)
                          } }
              />
              <FormFeedback valid> </FormFeedback>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">
                <FontAwesomeIcon
                  icon="key"
                  color="#4885ed"
                  size="sm"
                />{' '}Password
              </Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="********"
                value={ password }
                onChange={ (e) => this.handleChange(e) }
            />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Button outline color="primary">Login</Button>
            </FormGroup>
          </Col>
          <Col className="google">
            <FormGroup>
              <hr/>
              <GoogleButton onClick={() => Auth.federatedSignIn({provider: 'Google'})}/>
            </FormGroup>
          </Col>
        </Form>
      </div>
    );
  }
}
