import React, { Component } from 'react';
import { Button, FormGroup, Input } from 'reactstrap';
import '../App.css';

export default class Search extends Component {
    render() {
        return (
                <div className="text-center row">
                    <form className="col-md-4 mx-auto mt-5">
                         <FormGroup>
                             <Input type="text" className="form-control" id="text" name="text" required />
                        </FormGroup>
                        <Button color="primary">Search</Button>
                   </form>
                </div>
            );
        }
}
