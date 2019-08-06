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
            The upload process for this serverless application implements Amazon API Gateway, AWS Lambda, Amazon S3,
            Amazon Elasticsearch Service, and Amazon Rekognition. Amazon API Gateway routes requests to the other
            services in the application; AWS Lambda uploads files to Amazon S3 and metadata to Amazon Elasticsearch
            Service; finally, if a file is an image, Amazon Rekognition analyzes it and updates the metadata in Amazon
            Elasticsearch Service with the detected labels.
            <br/><br/>
            <b>What I Learned:</b>
            <br/>
            I learned how to process data from the front end to the back end with various AWS services. The benefit of
            introducing different services to interact with the data instead of directly accessing it was the layers of
            protection offered by these services. Specifically, by setting permissions for each of these services, I
            learned how to compartmentalize access which further secured the data. Breaking the upload pipeline into
            multiple components managed by different services also distributed the risk of errors, which simplified the
            debugging process. While the most difficult aspect of this component was decoding cryptic errors from the
            AWS Console, I have become much more capable of resolving such errors across different services, with
            effective testing for AWS Lambda functions and log reporting, and integrating them cohesively to create a
            fully functioning application.
        </CardBody>
      </Card>
    );
  };

  renderSearchCard = () => {
    return(
      <Card>
        <CardHeader><h2>Search Functionality</h2><h6>Jason Brito & Jeffrey Mercedes</h6></CardHeader>
        <CardBody>
            <b>How It Works:</b>
            <br/>
            The search process for this serverless application implements Amazon API Gateway, AWS Lambda, Amazon S3, and
            Amazon Elasticsearch Service. Amazon API Gateway routes requests to AWS Lambda and AWS Lambda manages
            metadata retrieval from Amazon Elasticsearch Service and file download from Amazon S3. Amazon Elasticsearch
            Service independently identifies significant data fields, such as file type or detected labels, and
            configures them to be searchable.
            <br/><br/>
            <b>What I Learned:</b>
            <br/>
            I learned how to index, update, and get data from an Amazon Elasticsearch Service cluster. The benefit of
            using an Amazon Elasticsearch Service cluster to manage the data stored in Amazon S3 was the flexibility
            with which the data could be modified. While the most difficult aspect of this component was properly
            forming requests to Amazon Elasticsearch Service, I solved this using NPM packages to take care of
            issues such as signed HTTP requests. I also briefly experimented with Python as I initially implemented the
            AWS Lambda function that called Amazon Elasticsearch Service in Python. However, because the AWS Amplify API
            only generated functions as serverless express applications in Node.js, I changed the implementation to a
            Node.js AWS Lambda function with an Amazon API Gateway API route in order to integrate more easily with the
            rest of the application.
        </CardBody>
      </Card>
    );
  };

  renderNavBarCard = () => {
    return(
      <Card>
        <CardHeader><h2>Navbar & Search Page</h2> <h6>Steven Lee</h6></CardHeader>
        <CardBody>
        <b>How It Works:</b>
        <br/>
        The navigation bar allows the user to navigate to any page. I also added a sign out button to the navigation bar.
        The search page functionality will be developed by Jeff and Jason.
        <br/><br/>
        <b>What I Learned:</b>
        <br/>
        This project was my first introduction to React, Reactstrap, and Bootstrap. This was also my first time collaborating with 
        other developers using Github. 
        </CardBody>
      </Card>
    );
  }

  render() {
    return (
      <div className="jumbotron">
        <h1>Intern Serverless Application Project</h1>
        <p className="lead">We, the interns, have put together a serverless
          application by using a number of resources/services offered by AWS. Those
          resources/services include AWS Amplify, Cognito, S3, API Gateway, Lambda, Elasticsearch, and Rekognition.
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
