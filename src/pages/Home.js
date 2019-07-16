import React, { Component } from 'react'
import { Collapse, Button, CardBody, Card, CardDeck, CardHeader, CardFooter} from 'reactstrap';

export default class Home extends Component {

  renderSecurityCard = () => {
    return(
      <Card>
        <CardHeader><h2>Security</h2> <h6>Jeffrey Mercedes</h6></CardHeader>
        <CardBody>Placeholder.</CardBody>
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
          resources/services include AWS Amplify, Cognito, S3, API Gateway, and Elasticsearch.
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
