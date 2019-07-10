import React, { Component } from 'react';
import './App.css';
import CustomSignIn from './auth/CustomSignIn';
import SignOut from './auth/SignOut';

import Amplify, { Analytics } from 'aws-amplify';
import awsconfig from './aws-exports';
import { ConfirmSignIn, ConfirmSignUp, ForgotPassword, RequireNewPassword, VerifyContact, withAuthenticator } from 'aws-amplify-react';

Amplify.configure(awsconfig);
Analytics.configure({ disabled: true });

class App extends Component {
  render() {
    return (
      <div>
        <SignOut />
      </div>
    );
  }
}

export default withAuthenticator(App, false, [
  <CustomSignIn/>,
  <ConfirmSignIn/>,
  <VerifyContact/>,
  <ConfirmSignUp/>,
  <ForgotPassword/>,
  <RequireNewPassword/>
]);
