import React, { Component } from 'react';
import { Button, FormGroup, Input, Alert, Table } from 'reactstrap';

import { API } from 'aws-amplify';

const api = 'filestorageapi';
const searchPath = '/es';
const downloadPath = '/download';

export default class Search extends Component {
    state = {
        text: '',
        alert: null,
        results: [],
        url: ''
    };

    downloadFile = (fileName) => {
        const params = { headers: { "Access-Control-Allow-Origin": "*" } };
        const qsp = "?filename=";
        const path = downloadPath + qsp + fileName;
        API.get(api, path, params)
            .then(res => {
              const link = document.createElement('a');
              link.href = res.url;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              console.log("Success!", res.url);
            })
            .catch(err => {
                console.log("Denied!", err);
            });
    };

    query = () => {
        const params = { headers: { "Access-Control-Allow-Origin": "*" } };
        const qsp = "?q=";
        const path = searchPath + qsp + this.state.text;
        API.get(api, path, params)
            .then(res => {
                console.log("results loaded successfully!", res);
                this.setState({ results: res.body.hits.hits });
            })
            .catch(err => {
                console.log("results failed to load.", err);
            });
    };

    handleChange = change => { this.setState({ text: change.target.value }); }

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

    listLabels = labels => {
        if (!labels) {return (<i>N/A</i>);}
        while (labels.length > 3) { labels.pop(); }
        return (
            <ul className="list-unstyled">
                {
                    labels.map((label, index) => {
                        return ( <li key={ index }><i>{label.Name}</i>: {label.Confidence.toFixed(2)}%</li> );
                    })
                }
            </ul>
        );
    };

    listMeta = file => {
        return (
            <ul className="list-unstyled">
                <li><i>Date</i>: {file._source.date}</li>
                <li><i>Size</i>: {this.formatSize(file._source.size)}</li>
                <li><i>Type</i>: {file._source.type}</li>
            </ul>
        );
    };

    renderTable = () => {
        const styles = { marginTop: 50 }
        return (
            <Table bordered striped style={styles} >
                <thead>
                    <tr>
                        <th>Key</th>
                        <th>Meta</th>
                        <th>Rekognition</th>
                        <th>File</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.results.map((file, index) => {
                            return (
                                <tr key={ index }>
                                    <td>{file._source.key}</td>
                                    <td>{this.listMeta(file)}</td>
                                    <td>{this.listLabels(file._source.labels)}</td>
                                    <td><Button color="primary" onClick={()=>{this.downloadFile(file._source.key)}}>Download</Button></td>
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
                <Button color="primary" onClick={this.query} disabled={!this.state.text.length}>Search</Button>
            </form>
            <div className="col-md-10 mx-auto"> { this.state.results.length > 0 && this.renderTable() } </div>
            </div>
        )
    }
}
