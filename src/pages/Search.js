import React, { Component } from 'react';
import { Button, FormGroup, Input, Alert, Table  } from 'reactstrap';

import { API } from 'aws-amplify';

const api = 'filestorageapi';
const basePath = '/es';

export default class Search extends Component {
    state = {
        text: '',
        alert: null,
        results: []
    };

    query = () => {
        if (!this.state.text.length) { return }
        const params = { headers: { "Access-Control-Allow-Origin": "*" } };
        const qsp = "?q=";
        const path = basePath + qsp + this.state.text;
        API.get(api, path, params)
            .then(res => {
                console.log("results loaded successfully!", res);
                this.setState({ results: res.hits.hits });
            })
            .catch(err => {
                console.log("results failed to load.", err);
            });
    };

    handleChange = change => { this.setState({ text: change.target.value }); }

    renderTable = () => {
        const style = { marginTop: 50 }
        return (
            <Table style={style} >
                <thead>
                    <tr>
                        <th>Key</th>
                        <th>Bucket</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.results.map((file, index) => {
                            return (
                                <tr key={ index }>
                                    <td>{file._source.key}</td>
                                    <td>{file._source.bucket}</td>
                                    <td>{file._source.location}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        );
    }

    render() {
        return (
            <div className="text-center mt-4 row">
            {/* <Alert color="warning">
              Please fill out this field.
            </Alert> */}
             <form className="col-md-6 mx-auto">
                <FormGroup>
                    <Input type="text" className="form-control" id="text" name="text" autoComplete="off" required
                        onChange={this.handleChange} />
                </FormGroup>
                <Button color="primary" onClick={this.query}>Search</Button>
                {this.renderTable()}
            </form>
            </div>
        )
    }
}
