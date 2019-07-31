// import React
import React, { Component } from 'react';
// import reactstrap
import { Input, Card, CardHeader, CardFooter, CardBody, CardDeck, Table } from 'reactstrap';
// import Amplify
import { Storage, API } from 'aws-amplify';
// import CSS stylesheet
import './Upload.css';
// import React Dropzone Uploader
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
// import cloud upload icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCloudUploadAlt} from '@fortawesome/free-solid-svg-icons';
// add cloud upload icon to library
library.add(faCloudUploadAlt);

// api params
const api = 'filestorageapi';
const filePath = '/files';
const rekogPath = '/rekog';

// s3 param
const bucket = 'internprojstorage-internproj';

export default class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '', // data of file to be uploaded to S3 bucket
            key: '', // name of file to be uploaded to S3 bucket
            meta: '', // metadata of file to be uploaded to S3 bucket
            files: [], // files in S3 bucket
            queue: [] // multiple files to be uploaded to S3 bucket
        };
    }

    /* GET */

    // load files when component mounts
    async componentDidMount() { this.getFiles(); };

    // call api to GET files then sort files
    getFiles = () => {
        const params = { headers: { "Access-Control-Allow-Origin": "*" } };
        API.get(api, filePath, params)
            .then(res => {
                console.log("files loaded successfully!", res);
                this.setState({ files: this.sortFiles(res.body.Contents) });
            })
            .catch(err => { console.log("files failed to load.", err); });
    };

    // sort files chronologically
    sortFiles = files => {
        return files.sort((file1, file2) => {
            if (file1.LastModified > file2.LastModified) { return -1; }
            if (file1.LastModified < file2.LastModified) { return 1; }
            return 0;
        });
    };

    /* PUT */

    // read new file as base64 and set state with new file data
    saveFile = (meta, file) => {
        this.setState({ key: file.name, meta: this.setMeta(meta) });
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            let base64 = fileReader.result.split(',');
            base64.shift();
            this.setState({ file: base64.join('') });
            this.putFile();
        };
    };

    // format and return new file metadata
    setMeta = meta => {
        let metadata = {};
        metadata.key = meta.name;
        metadata.name = meta.name.substring(0, meta.name.lastIndexOf('.'))
        metadata.date = meta.uploadedDate.substring(0, meta.uploadedDate.indexOf("T"));
        metadata.size = '' + meta.size;
        metadata.type = meta.type;
        metadata.ext = meta.type.substring(meta.type.lastIndexOf('/') + 1);
        metadata.bucket = bucket;
        return metadata;
    };

    // call api to PUT file then reload files
    putFile = () => {
        const params = {
            headers: { "Access-Control-Allow-Origin": "*" },
            body: { file: this.state.file, key: this.state.key, meta: this.state.meta }
        };
        API.put(api, filePath, params)
            .then(res => {
                console.log("file uploaded successfully!", res);
                if (["jpeg", "png"].includes(this.state.meta.ext)) { this.rekognizeFile(res.body._id); }
                let queue = this.state.queue;
                queue.shift();
                this.setState({ queue: queue });
                if (queue.length) { this.saveFile(this.state.queue[0].file) }
                else { console.log("all files uploaded successfully!"); this.getFiles(); }
            })
            .catch(err => {
                console.log("files failed to upload.", err);
            });
    };

    // runs rekognition on image
    rekognizeFile = id => {
        const params = {
            headers: { "Access-Control-Allow-Origin": "*" },
            body: { name: this.state.key, id: id, meta: this.state.meta }
        };
        API.put(api, rekogPath, params)
            .then(res => { console.log("image rekognized successfully!", res); })
            .catch(err => { console.log("image failed to be rekognized.", err); });
    };

    /* DOM */

    render() {
        return(
            <div className="jumbotron">
                <h1>Upload</h1>
                <p className="lead">manage files in an S3 bucket</p>
                <hr className="my-4"/>
                <CardDeck>
                    { this.renderUploadCard() }
                    { this.renderViewCard() }
                </CardDeck>
            </div>
        );
    }

    // render card to upload file to S3 bucket
    renderUploadCard = () => {
        return(
            <Card>
                <CardHeader className="lead">Upload</CardHeader>
                <CardBody>{ this.renderDropzone() }</CardBody>
                <CardFooter>
                    <div className="alert alert-secondary lead">drag & drop file(s) above or click to upload</div>
                </CardFooter>
            </Card>
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
            this.saveFile(this.state.queue[0].meta, this.state.queue[0].file);
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

    // render card to view table of files in S3 bucket
    renderViewCard = () => {
        return(
            <Card>
                <CardHeader className="lead">View</CardHeader>
                <CardBody>{ this.renderTable() }</CardBody>
                <CardFooter>
                    <div className="alert alert-secondary lead">{this.state.files.length} file(s)</div>
                </CardFooter>
            </Card>
        );
    };

    // render table to view files in S3 bucket
    renderTable = () => {
        return(
            <div className="table">
                <Table bordered striped>
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

    // convert size to MB or KB
    formatSize = B => {
        switch (true) {
            case (B >= 1000000) :
                return (B / 1e+6).toFixed(2) + " MB";
            case (B > 999) :
                return (B / 1024).toFixed(2) + " KB";
            default :
                return B.toFixed(2) + " B";
        }
    };
}
