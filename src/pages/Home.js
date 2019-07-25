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
        <CardHeader><h2>Upload</h2><h6>Jason Brito</h6></CardHeader>
        <CardBody>
        <b>How It Works:</b>
        <br/>
        The upload process for this serverless application implements Amazon API Gateway, AWS Lambda, Amazon
        Elasticsearch Service, and Amazon S3. Amazon API Gateway routes requests to other services in the application;
        AWS Lambda uploads files to Amazon S3 and metadata to Amazon Elasticsearch Service; finally, Amazon S3 stores
        files for further processing. Using Amazon API Gateway and AWS Lambda, we separate and secure different
        services that use our data.
        <br/><br/>
        <b>What I Learned:</b>
        <br/>
        I learned how to process data from the front end through the back end with various AWS services. The benefit of
        introducing different services to interact with my data instead of directly accessing it was the layers of
        protection offered by these services. Specifically, by managing permissions for each of these services, I
        learned how to compartmentalize access which further secured my data. While the most difficult aspect of this
        project was debugging cryptic errors from the AWS Console, I have become more comfortable and competent
        resolving such errors by writing effective tests for Lambda functions and tracing the application execution.
        I am now much more capable of determining which AWS services would best suit my application and integrating
        them into my application.
        </CardBody>
      </Card>
    );
  };

  renderSearchCard = () => {
    return(
      <Card>
        <CardHeader><h2>Search Functionality</h2><h6>Jason Brito & Jeffrey Mercedes</h6></CardHeader>
        <CardBody>
            Amazon Elasticsearch Service securely ingests data from S3 and searches, analyzes,
            and visualizes it in real time.
        </CardBody>
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
