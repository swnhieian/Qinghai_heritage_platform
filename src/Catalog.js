import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Container, Row, Col} from 'reactstrap';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './dist/style.css';
import * as Scroll from 'react-scroll';


  
const SidebarItem = (props) => (
    <li className="sidebar-item" key={props.item.id}>
      <Scroll.Link className="sidebar-link" hashSpy={true}
                   offset={-50} duration={500} to={props.item.id}
                   spy={true} smooth={true}>
        {props.item.name}
      </Scroll.Link>
    </li>
);

function Sidebar(props) {
    const sidebarItems = props.items.map(
        item => <SidebarItem item={item} key={item.id}/>);
    return (
        <div className="sidebar d-sm-none d-md-block">
          <nav className="sidebar-body">
            <ul className="sidebar-list">
              {sidebarItems}
            </ul>
          </nav>
        </div>
    );
}

const ContentItem = (props) => (
    <Col lg="4" key={props.item.id}> 
      <div className="heritage-card">                                 
        <Link to={'/detail/'+ props.item.id} className="heritage-link"
              style={{backgroundImage:'url("'+props.item.thumbnail+'")'}}>
          <div className="heritage-info d-flex align-items-center justify-content-around">
            <div className="heritage-name">
              {props.item.name}
            </div>
          </div>
        </Link>
      </div>
    </Col>
);

function ContentCategory(props) {
    const items = props.items.map(
        item => <ContentItem item={item} key={item.id}/>);
    return (
        <Scroll.Element id={props.id} name={props.id} key={props.id}>
          <div className="catalog-header"><h2>{props.name}</h2></div>
          <Container className="catalog-content">
            <Row>{items}</Row>
          </Container>
        </Scroll.Element>
    );
}

function ContentPane(props) {
    const categories = props.categories.map(category => (
        <ContentCategory id={category.id} name={category.name} key={category.id}
                         items={category.children}/>));
    return (
        <div className="with-sidebar">
          {categories}
        </div>
    );
}

class Catalog extends Component {
    constructor(props) {
        super(props);
        this.state = {sidebarData: []};
    }

    componentDidMount() {
        this.loadData();
        Scroll.scrollSpy.update();
    }

    loadData() {
        fetch("/api/catalog_groups").then(response => {
            if (response.ok) {
                response.json().then(data => {
                    this.setState({sidebarData: data.categories});
                });
            } else {
                response.json().then(error => {
                    console.log("Failed to get /api/items: " + error.message);
                });
            }
        }).catch(error => {
            console.log("Failed to get /api/catalog: ", error);
        });
    }

    render() {

        return (
            <div className="catalog-wrapper" id="content">
              <Sidebar items={this.state.sidebarData}/>
              <ContentPane categories={this.state.sidebarData}/>
            </div>
        );
    }
}
export default Catalog;
