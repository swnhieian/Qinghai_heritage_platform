import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Navbar, Form, Input, Collapse, NavbarBrand, NavLink, NavItem , NavbarToggler, Nav} from 'reactstrap';
import {Link} from 'react-router-dom';

import './dist/style.css';

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {isOpen : false};
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
    render() {
      const resourceMenuItems = [
        {name: 'a', id:'a'},
        {name: 'b', id:'b'},
        {name: 'c', id:'c'},
        {name: 'd', id:'d'},
        {name: 'e', id:'e'},
        {name: 'f', id:'f'},
        {name: 'g', id:'g'},
        {name: 'h', id:'h'},
        {name: 'i', id:'i'},
      ];
      
      return (
      
        <Navbar color="faded" dark expand="md" fixed="top">
        <Container>
        <NavbarBrand tag={Link} to="/">
           青海非物质文化遗产保护平台
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={Link} href="/" to="/">首页</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/catalog">资源库</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/resources">发现</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/about">关于</NavLink>
            </NavItem>          
          </Nav>  
          <Form inline>
            <Input type="text" name="search" id="exampleEmail" placeholder="搜索" />
          </Form>
        </Collapse>
        </Container>
        </Navbar>

       )
    }
}
export default TopBar;