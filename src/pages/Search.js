import React, { Component } from 'react';
import { Button, FormGroup, Input, Alert  } from 'reactstrap';

import { API } from 'aws-amplify';

const api = 'filestorageapi';
const basePath = '/es';

export default class Search extends Component {
    state = {
        text: '',
        alert: null,
    };

    query = () => {
        if (!this.state.text.length) { return }
        const params = { headers: { "Access-Control-Allow-Origin": "*" } };
        const qsp = "?q=";
        const path = basePath + qsp + this.state.text;
        API.get(api, path, params)
            .then(res => {
                console.log("results loaded successfully!", res);
                console.log(res.hits.hits[0])
            })
            .catch(err => {
                console.log("results failed to load.", err);
            });
    };

    handleChange = change => { this.setState({ text: change.target.value }); }

    render() {
        return (
            <div className="text-center mt-4 row">
            {/* <Alert color="warning">
              Please fill out this field.  
            </Alert> */}
             <form className="col-md-4 mx-auto">
                <FormGroup>
                    <Input type="text" className="form-control" id="text" name="text" autoComplete="off" required
                        onChange={this.handleChange} />
                </FormGroup>
                <Button color="primary" onClick={this.query}>Search</Button>
            </form>
            { this.state.results }
            </div>
        )
    }
}


