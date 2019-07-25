import React, { Component } from 'react'
import { Collapse, Button, CardBody, Card, CardDeck, CardHeader, CardFooter} from 'reactstrap';

export default class Home extends Component {

  renderSecurityCard = () => {
    return(
      <Card>
        <CardHeader><h2>Security</h2> <h6>Jeffrey Mercedes</h6></CardHeader>
        <CardBody>
        <b>How It Works:</b>
        <br/>
        The security for this servlerss application was implemented using AWS Cognito. Cognito is an AWS feature
        that simplies the authorization process. It can be used in conjunction with multiple other services
        like API Gateway, which would make it possible to protect our api routes. Implementing our security with Cognito
        allowed us to use Cognito's federated login feature, which lets us login into the application using EC's google
        identity pool. This meant we could now login using our EC email and password.
        <br/><br/>
        <b>What I Learned:</b>
        <br/>
        The main thing I learned from this was being able to successfully impement Cognito into a web application. With that
        comes the ability to also implement federated login. Implementing Cognito was made easier because we used AWS Amplify
        to manage, add, connect, and in some instances remove services from interacting with our application. I learned how to naviagte
        through the AWS Management Console in order to add and/or update user pools and identity pools. The toughest part was trying to
        manage the Amplify environments to make sure all of the environments we were working on were up to date. Since it was my first time
        using amplify I had some trouble doing that and it actually broke cognito a few times. Although it was a set back it, it forced me to
        manually manage cognito through the console and therefor gave me more hands on experience trouble shooting with cognito.
        </CardBody>
      </Card>
    );
  };

  renderUploadCard = () => {
    return(
      <Card>
        <CardHeader><h2>Upload</h2> <h6>Jason Brito</h6></CardHeader>
        <CardBody>Placeholder.</CardBody>
      </Card>
    );
  };

  renderSearchCard = () => {
    return(
      <Card>
        <CardHeader><h2>Search Functionality</h2> <h6>Jason Brito & Jeffrey Mercedes</h6></CardHeader>
        <CardBody>Placeholder.</CardBody>
      </Card>
    );
  };

  renderNavBarCard = () => {
    return(
      <Card>
        <CardHeader><h2>Navbar & Search Page</h2> <h6>Steven Lee</h6></CardHeader>
        <CardBody>Steven created the navigation bar and the UI for the search page.
          The navigation bar allows the user to navigate to any page.
          This project was his first introduction to React and Reactstrap.
        </CardBody>
      </Card>
    );
  }

  render() {
    return (
      <div className="jumbotron">
        <h1>Intern Serverless Application Project</h1>
        <p className="lead">We, the interns, have put together a servless
          application by using a number of resources/services offered by AWS. Those
          resources/services include AWS Amplify, Cognito, S3, API Gateway, Lambda, and Elasticsearch.
        </p>
        <hr className="my-4"/>
        <div>
          <CardDeck>
            { this.renderSecurityCard() }
            { this.renderUploadCard() }
          </CardDeck>
        </div>
        <br/>
        <div>
          <CardDeck>
            { this.renderSearchCard() }
            { this.renderNavBarCard() }
          </CardDeck>
        </div>
      </div>
    );
  }
}
