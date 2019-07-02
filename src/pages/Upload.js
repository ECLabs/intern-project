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

    selectFile = change => {
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
                    contents: this.setContents(result)
                });
            })
            .catch(error => {
                console.log("contents failed to list", error);
            });
    };

    setContents = (result) => {
        let contents = [];
        let names = Object.keys(result).map((i) => { return result[i].key; });
        let dates = Object.keys(result).map((i) => { return result[i].lastModified; });
        for (let i = 0; i < result.length; i++) {
            let file = {};
            file.name = names[i];
            file.date = dates[i].toString().match(/.+?(?= GMT)/g)[0];
            contents.push(file);
        }
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
                            <Input type="file" onChange={this.selectFile} />
                            <br/>
                            <p class="lead">{ this.state.filename }</p>
                        </CardBody>
                        <CardFooter>
                            { this.state.file && <Button outline color="secondary" onClick={this.saveFile}>upload</Button> }
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader>View</CardHeader>
                        <CardBody>
                            <Button outline color="secondary" onClick={this.listContents}>view</Button>
                        </CardBody>
                        { this.state.contents.length > 0 &&
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.contents.map((file, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{file.name}</td>
                                                    <td>{file.date}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </Table>
                        }
                        <CardFooter></CardFooter>
                    </Card>
                </CardDeck>
            </div>
        );
    }
}