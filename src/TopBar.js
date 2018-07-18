import React, { Component } from 'react';
import { Navbar, FormControl, FormGroup, MenuItem, Nav, NavItem } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './dist/style.css';

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen : false};
  }
  handleOpen = () => {
    this.setState({isOpen: true});
  }
  handleClose = () => {
    this.setState({isOpen: false});
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
      const menus = resourceMenuItems.map((menu) =>
        <MenuItem eventKey={menu.id} key={menu.id}>{menu.name}</MenuItem>
      );
      return (
        <Navbar fixedTop collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">青海非物质文化遗产保护平台</Link>  
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} componentClass={Link} to="/" href="/">首页</NavItem>
              <NavItem eventKey={2} componentClass={Link} to="/catalog/" href="/resources">资源库</NavItem>
              <NavItem eventKey={3} componentClass={Link} to="/resources" href="/about">发现</NavItem>
              <NavItem eventKey={4} componentClass={Link} to="/about" href="/about">关于</NavItem>              
            </Nav>
            <Navbar.Form pullRight>
                <FormGroup>
                  <FormControl type="text" placeholder="搜索" />
                </FormGroup>{' '}
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>)
    }
}
export default TopBar;