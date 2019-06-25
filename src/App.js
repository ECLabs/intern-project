import React, { Component } from 'react';
import Amplify from 'aws-amplify';
import { SignIn, ConfirmSignIn, ForgotPassword, RequireNewPassword, VerifyContact, withAuthenticator } from 'aws-amplify-react';
import aws_exports from './aws-exports';
import './App.css';
import SignOut from './auth/SignOut';

Amplify.configure(aws_exports);

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <SignOut />
        
      </React.Fragment>
    );
  }
}

const MyTheme = {
  button: { backgroundColor: "#007bff"}
};

export default withAuthenticator(App, false, [
  <SignIn/>,
  <ConfirmSignIn/>,
  <VerifyContact/>,
  <ForgotPassword/>,
  <RequireNewPassword/>
], null, MyTheme);