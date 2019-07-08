import React, { Component } from 'react';
import { Button, FormGroup, Input } from 'reactstrap';

export default class Search extends Component {
    render() {
        return (
            <div>
             <form>
                <FormGroup>
                    <Input type="text" id="text" name="text" required />
                </FormGroup>
                <Button className="mx-auto" color="primary">Submit</Button>
            </form>   
            </div>
        )
    }
}


