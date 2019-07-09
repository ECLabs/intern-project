import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Auth from '@aws-amplify/auth';

export default class WFSignOut extends Component {
    constructor(props) {
        super(props);
        this.signOut = this.signOut.bind(this);
    }

    signOut() {
        Auth.signOut({ global: true });
    }

    render() {
        return(
            <Button onClick={this.signOut}>Sign Out</Button>
        );
    }
}
