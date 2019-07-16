import React, { Component } from 'react';
import {InputGroup, Input, Button, Card, CardHeader, CardFooter, CardBody, CardText, CardDeck, Table} from 'reactstrap';
import { Storage, API } from 'aws-amplify';
import './Upload.css';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCloudUploadAlt} from '@fortawesome/free-solid-svg-icons';

library.add(faCloudUploadAlt);

// api params
const api = 'filestorageapi';
const path = '/files';

export default class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '', // data of file to be uploaded to S3 bucket
            filename: '', // name of file to be uploaded to S3 bucket
            files: [], // files in S3 bucket
            queue: [] // multiple files to be uploaded to S3 bucket
        };
    }

    // load files when component mounts
    async componentDidMount() { this.getFiles(); };

    // read new file as base64 and set state with new file data
    saveFile = file => {
        this.setState({ filename: file.name });
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            let base64 = fileReader.result.split(',');
            base64.shift();
            this.setState({ file: base64.join('') });
            this.putFile();
        };
    };

    // call api to PUT file then reload files
    putFile = () => {
        const params = {
            headers: { "Access-Control-Allow-Origin": "*" },
            body: { file: this.state.file, filename: this.state.filename }
        };
        API.put(api, path, params)
            .then(res => {
                console.log("file uploaded successfully!", res);
                this.getFiles();
                let queue = this.state.queue;
                queue.shift();
                this.setState({ queue: queue });
                if (queue.length) { this.saveFile(this.state.queue[0].file) }
                else { console.log("all files uploaded successfully!") }
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
                this.setState({ files: this.sortFiles(res.body.Contents) });
            })
            .catch(err => {
                console.log("files failed to load.", err);
            });
    };

    // convert size to KB or MB
    formatSize = B => {
        switch (true) {
            case (B >= 1000 && B < 1000000) :
                return (B / 1024).toFixed(2) + " KB";
                break;
            case (B >= 1000000) :
                return (B / 1e+6).toFixed(2) + " MB";
                break;
            default :
                return B.toFixed(2) + " B";
        }
    };

    // sort files chronologically
    sortFiles = files => {
        return files.sort((file1, file2) => {
            if (file1.LastModified > file2.LastModified) { return -1; }
            if (file1.LastModified < file2.LastModified) { return 1; }
            return 0;
        });
    };

    // render table to view files in S3 bucket
    renderTable = () => {
        return(
            <div className="table">
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
                                return(
                                    <tr key={ index }>
                                        <td>{ file.Key }</td>
                                        <td>{ file.LastModified.substring(0, file.LastModified.indexOf("T")) }</td>
                                        <td>{ this.formatSize(file.Size) }</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
            </div>
        );
    };

    // render dropzone for drag&drop upload
    renderDropzone = () => {
        const getInputContent = () => {
            return(
                <div className="input-content">
                    <FontAwesomeIcon icon="cloud-upload-alt" size="lg"/>
                    <p className="lead"><strong>Upload</strong></p>
                </div>
            );
        };
        const handleSubmit = files => {
            this.setState({ queue: files });
            if (!this.state.queue.length) { return; }
            this.saveFile(this.state.queue[0].file);
            files.forEach(file => file.remove());
        };
        return(
            <Dropzone
                inputContent={ getInputContent }
                inputWithFilesContent={ <FontAwesomeIcon icon="cloud-upload-alt" size="lg"/> }
                submitButtonContent="Upload"
                onSubmit={ handleSubmit }
                styles={ { dropzone: { minHeight: 300, maxHeight: 300 } } }
            />
        );
    };

    // render card to upload file to S3 bucket
    renderUploadCard = () => {
        return(
            <Card>
                <CardHeader>Upload</CardHeader>
                <CardBody>{ this.renderDropzone() }</CardBody>
                <CardFooter>
                    <div className="alert alert-secondary">drag & drop file(s) above or click to upload</div>
                </CardFooter>
            </Card>
        );
    };

    // render card to view table of files in S3 bucket
    renderViewCard = () => {
        return(
            <Card>
                <CardHeader>View</CardHeader>
                <CardBody>{ this.renderTable() }</CardBody>
                <CardFooter>
                    <div className="alert alert-secondary">{this.state.files.length} file(s)</div>
                </CardFooter>
            </Card>
        );
    };

    render() {
        return(
            <div className="jumbotron">
                <h1>Upload</h1>
                <p className="lead">manage files in an S3 bucket.</p>
                <hr className="my-4"/>
                <CardDeck>
                    { this.renderUploadCard() }
                    { this.renderViewCard() }
                </CardDeck>
            </div>
        );
    }
}