import React, { Component, Fragment } from 'react';
import Navigation from './navigation/Navigation';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Upload from './pages/Upload';
import CustomSignIn from './auth/CustomSignIn';
import './App.css';

import Amplify, { Analytics } from 'aws-amplify';
import awsconfig from './aws-exports';
import { ConfirmSignIn, ConfirmSignUp, ForgotPassword, RequireNewPassword, VerifyContact, withAuthenticator } from 'aws-amplify-react';

Amplify.configure(awsconfig);
Analytics.configure({ disabled: true });

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Navigation />
        </Fragment>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/upload' component={Upload} />
          <Route exact path='/search' component={Search} />
        </Switch>
      </Router>
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
