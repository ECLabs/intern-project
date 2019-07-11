import React, { Component } from 'react';
import {InputGroup, Input, Button, Card, CardHeader, CardFooter, CardBody, CardText, CardDeck, Table} from 'reactstrap';
import { Storage, API } from 'aws-amplify'

// api params
const api = 'filestorageapi';
const path = '/files';

export default class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '', // data of file in base64
            filename: '', // name of file
            files: [] // files in S3 bucket
        };
    }

    // load files when component mounts
    async componentDidMount() { this.getFiles(); };

    // get new file and set state with new filename
    setFile = change => {
        const file = change.target.files[0];
        if (!file) { return; }
        this.getBase64(file);
        this.setState({ filename: file.name });
    };

    // read new file as base64 and set state with new file
    getBase64 = file => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => { this.state.file = this.formatBase64(fileReader.result); };
    };

    // remove extraneous header from base64
    formatBase64 = result => {
        const base64 = result.split(',');
        base64.shift();
        return base64.join('');
    };

    // call api to PUT file then reload files
    saveFile = () => {
        const params = {
            headers: { "Access-Control-Allow-Origin": "*" },
            body: { file: this.state.file, filename: this.state.filename }
        };
        API.put(api, path, params)
            .then(res => {
                console.log("file uploaded successfully!", res);
                this.getFiles();
            })
            .catch(err => {
                console.log("files failed to load.", err);
            });
    };

    // call api to GET files then format files
    getFiles = () => {
        const params = { headers: { "Access-Control-Allow-Origin": "*" } };
        API.get(api, path, params)
            .then(res => {
                console.log("files loaded successfully!", res);
                this.setState({ files: res.body.Contents });
            })
            .catch(err => {
                console.log("files failed to load.", err);
            });
    };

    // convert size to KB or MB
    formatSize = B => {
        switch (true) {
            case (B >= 1000 && B < 1000000) :
                return (B / 1024).toFixed(2) + ' KB';
                break;
            case (B >= 1000000) :
                return (B / 1e+6).toFixed(2) + ' MB';
                break;
            default :
                return B.toFixed(2) + ' B';
        }
    };

    // render table to view files in S3 bucket
    renderTable = () => {
        return(
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Size</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.files.map((file, index) => {
                            return (
                                <tr key={ index }>
                                    <td>{ file.Key }</td>
                                    <td>{ file.LastModified.substring(0, file.LastModified.indexOf('T')) }</td>
                                    <td>{ this.formatSize(file.Size) }</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        );
    };

    // render card to upload file to S3 bucket
    renderUploadCard = () => {
        return(
            <Card>
                <CardHeader>Upload</CardHeader>
                <CardBody>
                    <Input type="file" onChange={ this.setFile } />
                    <br/>
                    <p className="lead">{ this.state.filename }</p>
                </CardBody>
                <CardFooter><Button outline color="secondary"onClick={ this.saveFile }>upload</Button></CardFooter>
            </Card>
        );
    };

    // render card to view table of files in S3 bucket
    renderViewCard = () => {
        return(
            <Card>
                <CardHeader>View</CardHeader>
                <CardBody>{ this.renderTable() }</CardBody>
                <CardFooter><Button outline color="secondary" onClick={ this.getFiles }>view</Button></CardFooter>
            </Card>
        );
    };

    render() {
        return (
            <div className="jumbotron">
                <h1>Upload</h1>
                <p className="lead">Manage files in an S3 bucket.</p>
                <hr className="my-4"/>
                <CardDeck>
                    { this.renderUploadCard() }
                    { this.renderViewCard() }
                </CardDeck>
            </div>
        );
    }
}