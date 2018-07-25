import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Navbar, Form, Input, Collapse, NavbarBrand, NavLink, NavItem , NavbarToggler, Nav} from 'reactstrap';
import {Link, withRouter} from 'react-router-dom';

import './dist/style.css';

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyup = this.onKeyup.bind(this);
    this.handler = this.handler.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  onChange(e) {
    this.setState({
        searchText : e.target.value
     });
     console.log(this.props);
  }
  onKeyup(e) {
      e.keyCode === 13 && this.handler()
  }
  handler() {
      // 你的逻辑
      this.props.history.push('/search');
  }
    render() {
      
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
              <NavLink tag={Link} to="/discovery">发现</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/about">关于</NavLink>
            </NavItem>          
          </Nav>  
          <Form inline>
            <Input type="text" name="word" onChange={this.onChange} onSubmit={this.handler} onKeyDown={this.onKeyup} placeholder="搜索" />
          </Form>
        </Collapse>
        </Container>
        </Navbar>

       )
    }
}
export default withRouter(TopBar);