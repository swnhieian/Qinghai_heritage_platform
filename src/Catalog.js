import React, { Component } from 'react';
import ReactDom from 'react-dom';

import { BrowserRouter as Router , Link, Route} from 'react-router-dom'
import {Container, Row, Col} from 'reactstrap';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import './dist/style.css';
import * as Scroll from 'react-scroll';

class Catalog extends Component {
    constructor(props) {
        super(props);
        this.sidebarData = [
            {id: 'dance0', name: '竞技', children: [{id: '01', name:'1'},{id: '2', name:'2'},{id: '3', name:'3'},{id: '4', name:'4'}]},
            {id: 'dance1', name: '美术', children: [{id: '01', name:'1'},{id: '2', name:'2'},{id: '3', name:'3'},{id: '4', name:'4'}]},
            {id: 'dance2', name: '民俗', children: [{id: '01', name:'1'},{id: '2', name:'2'},{id: '3', name:'3'},{id: '4', name:'4'}]},
            {id: 'dance3', name: '曲艺', children: [{id: '01', name:'1'},{id: '2', name:'2'},{id: '3', name:'3'},{id: '4', name:'4'}]},
            {id: 'dance4', name: '手工艺', children: [{id: '01', name:'1'},{id: '2', name:'2'},{id: '3', name:'3'},{id: '4', name:'4'}]},
            {id: 'dance5', name: '文学', children: [{id: '01', name:'1'},{id: '2', name:'2'},{id: '3', name:'3'},{id: '4', name:'4'}]},
            {id: 'dance', name: '舞蹈', children: [{id: '01', name:'1'},{id: '2', name:'2'},{id: '3', name:'3'},{id: '4', name:'4'}]},
            {id: 'dance6', name: '戏剧', children: [{id: '01', name:'1'},{id: '2', name:'2'},{id: '3', name:'3'},{id: '4', name:'4'}]},
            {id: 'dance7', name: '医药', children: [{id: '01', name:'1'},{id: '2', name:'2'},{id: '3', name:'3'},{id: '4', name:'4'}]},
            {id: 'dance8', name: '音乐', children: [{id: '01', name:'1'},{id: '2', name:'2'},{id: '3', name:'3'},{id: '4', name:'4'}]}
        ];
        this.sidebarItems = this.sidebarData.map((item) => {
            return (
                <li className="sidebar-item" key={item.id}>
                  <Scroll.Link className="sidebar-link" offset={-50} duration={500} to={item.id} spy={true} smooth={true}>{item.name}</Scroll.Link>
                </li>
            )
        });
        this.contentItems = this.sidebarData.map((item, no) => {
            return (
                <section id={item.id} key={item.id}>
                    <div className="catalog-header"><h2>{item.name}</h2></div>
                    <Container className="catalog-content">
                      <Row>
                        {item.children?item.children.map((i)=> {
                            return (
                                <Col lg="4" key={i.id}> 
                                  <div className="heritage-card">                                 
                                  <Link to={'/detail/'+i.id} className="heritage-link" style={{'backgroundImage':'url("/img/example.jpg")'}}>
                                        <div className="heritage-name">{i.name}</div>
                                  </Link>
                                  </div>
                                </Col>
                            )
                        }):''}
                      </Row>
                    </Container>
                </section>
            )
        });
    }
    render() {
        
        
        return (
            <div className="catalog-wrapper">
                <div className="sidebar d-sm-none d-md-block">
                    <nav className="sidebar-body">
                        <ul className="sidebar-list">
                            {this.sidebarItems}
                        </ul>                                     
                    </nav>
                </div>
                <div className="with-sidebar">             
                    
                        {this.contentItems}
                  
                </div>
            </div>
        )
    }
}
export default Catalog;
