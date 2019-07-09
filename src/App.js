import React, { Component } from 'react';
import Amplify from '@aws-amplify/core';
import { withAuthenticator } from 'aws-amplify-react';
import awsconfig from './aws-exports';
import './App.css';
import SignOut from './auth/SignOut';
import Upload from './pages/Upload'
import { Analytics } from 'aws-amplify'

Analytics.configure({ disabled: true })
Amplify.configure(awsconfig);

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Upload />
        <SignOut />
      </React.Fragment>
    );
  }
}

const MyTheme = {
    button: { backgroundColor: "#007bff"},
    signInButtonIcon: { display: "none" }
};

export default withAuthenticator(App, false, [], null, MyTheme);
