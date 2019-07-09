import React, { Component } from 'react';
import './App.css';
import SignOut from './auth/SignOut';

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

Amplify.configure(awsconfig);

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
    button: { backgroundColor: "#007bff"},
    signInButtonIcon: { display: "none" }
};

export default App;
