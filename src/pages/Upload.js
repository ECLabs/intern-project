import React, { Component } from 'react';
import { InputGroup, Input, Button, Card, CardHeader, CardFooter, CardBody, CardText, CardDeck, Table } from 'reactstrap';
import { Storage, API } from 'aws-amplify'

export default class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            filename: '',
            content: []
        };
    }

    selectFile = change => {
        const file = change.target.files[0];
        if (!file) { return }
        this.getBase64(file);
        this.setState({ filename: file.name });
    };

    getBase64 = (file) => {
        const fr = new FileReader();
        fr.readAsDataURL(file);
        fr.onload = () => { this.state.file = fr.result };
    };

    saveFile = () => {
        const splitBase64 = this.state.file.split(',');
        const header = splitBase64[0];
        splitBase64.shift();
        const base64 = splitBase64.join('');
        const api = 'filestorageapi';
        const path = '/files';
        const params = {
            headers: { "Access-Control-Allow-Origin": "*" },
            body: { filename: this.state.filename, file: base64 }
        };
        API.put(api, path, params)
            .then(res => {
                console.log("file uploaded successfully!", res);
                this.getContent(res);
            })
            .catch(err => {
                console.log("files failed to load.", err);
            });
    };

    async componentDidMount() { this.getContent() };

    getContent = () => {
        const api = 'filestorageapi';
        const path = '/files';
        const params = { headers: { "Access-Control-Allow-Origin": "*" } };
        API.get(api, path, params)
            .then(res => {
                console.log("files loaded successfully", res);
                this.setContent(res);
            })
            .catch(err => {
                console.log("files failed to load", err);
            });
    };

    setContent = (res) => {
        let unformattedContent = res.body.Contents;
        let formattedContent = [];
        let file = {};
        for (let i = 0; i < unformattedContent.length; i++) {
            file = {};
            file.name = unformattedContent[i].Key;
            file.name = file.name.substring(file.name.indexOf('/') + 1);
            if (!file.name.length) { continue }
            file.date = unformattedContent[i].LastModified;
            file.date = file.date.substring(0, file.date.indexOf('T'));
            formattedContent.push(file);
        }
        this.setState({ content: formattedContent });
    };

    render() {
        return (
            <div className="jumbotron">
                <h1>Upload</h1>
                <p className="lead">Upload files to an S3 bucket.</p>
                <hr className="my-4"/>
                <CardDeck>
                    <Card>
                        <CardHeader>Upload</CardHeader>
                        <CardBody>
                            <Input type="file" onChange={this.selectFile} />
                            <br/>
                            <p className="lead">{ this.state.filename }</p>
                        </CardBody>
                        <CardFooter>
                            <Button outline color="secondary"onClick={this.saveFile}>upload</Button>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader>View</CardHeader>
                        <CardBody>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.content.map((file, index) => {
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
                        </CardBody>
                        <CardFooter><Button outline color="secondary" onClick={this.getContent}>view</Button></CardFooter>
                    </Card>
                </CardDeck>
            </div>
        );
    }
}