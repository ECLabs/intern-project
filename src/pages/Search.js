import React, { Component } from 'react';
import { Button, FormGroup, Input, } from 'reactstrap';

export default class Search extends Component {
    render() {
        return (
            <div className="text-center mt-4 row">
             <form className="col-md-4 mx-auto">
                <FormGroup>
                    <Input type="text" className="form-control" id="text" name="text" required />
                </FormGroup>
                <Button color="primary">Search</Button>
            </form>   
            </div>
        )
    }
}


