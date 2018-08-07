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
        <Scroll.Element className="section" id={props.id} name={props.id} key={props.id}>
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

//将URL中的UTF-8字符串转成中文字符串
function getCharFromUtf8(str) {
    var cstr = "";
    var nOffset = 0;
    if (str == "")
        return "";
    str = str.toLowerCase();
    nOffset = str.indexOf("%e");
    if (nOffset == -1)
        return str;
    while (nOffset != -1) {
        cstr += str.substr(0, nOffset);
        str = str.substr(nOffset, str.length - nOffset);
        if (str == "" || str.length < 9)
            return cstr;
        cstr += utf8ToChar(str.substr(0, 9));
        str = str.substr(9, str.length - 9);
        nOffset = str.indexOf("%e");
    }
    return cstr + str;
}

//将编码转换成字符
function utf8ToChar(str) {
    var iCode, iCode1, iCode2;
    iCode = parseInt("0x" + str.substr(1, 2));
    iCode1 = parseInt("0x" + str.substr(4, 2));
    iCode2 = parseInt("0x" + str.substr(7, 2));
    return String.fromCharCode(((iCode & 0x0F) << 12) | ((iCode1 & 0x3F) << 6) | (iCode2 & 0x3F));
}




class Catalog extends Component {
    constructor(props) {
        super(props);
        


        this.state = {sidebarData: [], location: props.location};
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
                    if (this.state.location.hash) {
                        Scroll.scroller.scrollTo(getCharFromUtf8(this.state.location.hash.slice(1)), {
                            duration: 500,
                            smooth: true,
                            spy: true,
                            hashSpy: true,
                            offset: -50 // Scrolls to element - 50 pixels down the page
                          });
                    }
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
