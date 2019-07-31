import React, { Component } from 'react';
import { Button, FormGroup, Input, Alert, Table  } from 'reactstrap';

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
        if (!this.state.text.length) { return }
        const params = { headers: { "Access-Control-Allow-Origin": "*" } };
        const qsp = "?q=";
        const path = searchPath + qsp + this.state.text;
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

    formatSize = B => {
        if (!B) return;
        switch (true) {
            case (B >= 1000000) :
                return (B / 1e+6).toFixed(2) + " MB";
            case (B > 999) :
                return (B / 1024).toFixed(2) + " KB";
            default :
                return B.toFixed(2) + " B";
        }
    };

    renderTable = () => {
        const style = { marginTop: 50 }
        return (
            <Table bordered striped style={style} >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Size</th>
                        <th>File</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.results.map((file, index) => {
                            return (
                                <tr key={ index }>
                                    <td>{file._source.key}</td>
                                    <td>{file._source.date}</td>
                                    <td>{file._source.type}</td>
                                    <td>{this.formatSize(file._source.size)}</td>
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
                <Button color="primary" onClick={this.query}>Search</Button>
            </form>
            <div className="col-md-10 mx-auto"> { this.state.results.length > 0 && this.renderTable() } </div>
            </div>
        )
    }
}
