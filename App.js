import React, { Component, Fragment } from 'react';
import Amplify from 'aws-amplify';
import { SignIn, ConfirmSignIn, ForgotPassword, RequireNewPassword, VerifyContact, withAuthenticator } from 'aws-amplify-react';
import aws_exports from './aws-exports';
import './App.css';
import Navigation from './navigation/Navigation';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';

Amplify.configure(aws_exports);

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Navigation />  
        </Fragment>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='search' component={Search} />
        </Switch>
      </Router>
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