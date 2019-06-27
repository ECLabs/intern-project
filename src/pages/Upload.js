import React, { Component } from 'react';
import { InputGroup, Input, Button } from 'reactstrap';

import { withAuthenticator } from 'aws-amplify-react';
import { Storage } from 'aws-amplify';

export default class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            file: '',
            name: ''
        };
    }

    handleChange = e => {
        const file = e.target.files[0];
        if (!file) { return }
        this.setState({
            url: URL.createObjectURL(file),
            file: file,
            name: file.name
        });
    };

    saveFile = () => {
        Storage.put(this.state.name, this.state.file)
            .then(() => {
                console.log("file saved successfully");
                this.setState({
                    url: '',
                    file: '',
                    name: ''
                });
            })
            .catch(error => {
                console.log("file failed to save", error)
            });
    };

    render() {
        return (
            <div class="jumbotron">
                <h1 class="display-4">Upload</h1>
                <p class="lead">Upload files to an S3 bucket.</p>
                { this.state.url && <Button outline color="primary" onClick={this.saveFile}>upload</Button> }
                <hr class="my-4"/>
                <InputGroup>
                    <Input type="file" onChange={this.handleChange} />
                </InputGroup>
                <br/>
                { this.state.url && <img src={this.state.url} /> }
            </div>
        );
    }
}