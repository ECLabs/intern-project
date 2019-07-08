import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import SignOut from '../auth/SignOut';

export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle className="mr-3" nav caret>
                            Pages
                            </DropdownToggle>
                            <DropdownMenu right>
                            <DropdownItem tag={Link} to='/'>
                                Home
                            </DropdownItem>
                            <DropdownItem tag={Link} to='/search'>
                                Search
                            </DropdownItem>
                            <DropdownItem tag={Link} to='/upload'>
                                Upload
                            </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <NavItem>
                            <SignOut />
                        </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

