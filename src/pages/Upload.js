import React, { Component } from 'react';
import { InputGroup, Input, Button, Card, CardHeader, CardFooter, CardBody, CardText, CardDeck, Table } from 'reactstrap';
import { Storage } from 'aws-amplify';

export default class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            filename: '',
            contents: []
        };
    }

    handleChange = change => {
        const file = change.target.files[0];
        if (!file) { return }
        this.setState({
            file: file,
            filename: file.name
        });
    };

    saveFile = () => {
        Storage.put(this.state.file, this.state.filename)
            .then((result) => {
                console.log("file saved successfully", result);
                this.setState({
                    file: '',
                    filename: ''
                });
            })
            .catch(error => {
                console.log("file failed to save", error)
            });
    };

    listContents = () => {
        Storage.list('')
            .then(result => {
                console.log("contents listed successfully", result);
                this.setState({
                    contents: this.format(result)
                });
            })
            .catch(error => {
                console.log("contents failed to list", error);
            });
    };

    format = (result) => {
        let contents = [];
        return contents;
    };

    render() {
        return (
            <div class="jumbotron">
                <h1>Upload</h1>
                <p class="lead">Upload files to an S3 bucket.</p>
                <hr class="my-4"/>
                <CardDeck>
                    <Card>
                        <CardHeader>Upload</CardHeader>
                        <CardBody>
                            <Input type="file" onChange={this.handleChange} />
                            <br/>
                            <p class="lead">{ this.state.filename }</p>
                        </CardBody>
                        <CardFooter>
                            { this.state.url && <Button color="secondary" onClick={this.saveFile}>upload</Button> }
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader>View</CardHeader>
                        <CardBody>
                            <Button color="secondary" onClick={this.listContents}>list</Button>
                            <br/>
                            <br/>
                        </CardBody>
                    </Card>
                </CardDeck>
            </div>
        );
    }
}