import React, { Component } from 'react';
import ReactDom from 'react-dom';

import { BrowserRouter as Router , Link, Route} from 'react-router-dom'
import MetisMenu from 'react-metismenu';
import RouterLink from 'react-metismenu-router-link';
import {Grid, Row, Col} from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-metismenu/dist/react-metismenu-standart.min.css';
import './dist/style.css';
import SideNav, {Toggle, Nav, NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const Card = (props)=> {
    const cb = (msg)=> {
                return ()=> props.callBack(msg);
    }
   
    let id = props.match.params.id;
    let prefix = '';
    console.log(props);
    console.log("in cards" + id);
    if (id == undefined) {
        prefix = '/catalog/';
    } else {
        prefix = '/details/';
    }
    let res = [];
    for (let i=0; i<10; i++) {
        res.push(((id===undefined)?'':(id+'/'))+(i+1));
    }
    const items = res.map((item)=> {
        console.log(item);
        return (<Col md={3} sm={6} xs={6} key={item} onClick={cb(id==undefined?item:id)}>
                  
                  
                  <Link to={prefix+item}>
                  <div className="info-card">
                  {item}
                  </div>
                  </Link>
               </Col>);       
    });
    return (
        <Grid fluid className="info-wrap">
        <Row>            
        {items}
        </Row>
        </Grid>
    );
};
const Details = ({match}) => {
    let id = match.params.id;
    return (<Grid fluid className="info-wrap">
    <Row>            
    {id}
    </Row>
    </Grid>);
};
class Catalog extends Component {
    constructor(props) {
        super(props);
        this.match = props.match;
        this.state = {
            catalog: '/'
        };
        let cat = '/';
        if (this.props.match.params.id != undefined) {
            cat = '/' + this.props.match.params.id
        }
        this.setState({catalog: cat})
    }
    setCatalog(item) {
        console.log('set from callback');
        console.log(item);
        this.setState({catalog: '/'+item});
    }
    render() {
        
        console.log(this.props);
        return (
            <Router>
    <Route render={({ location, history }) => {
        return (
        <Grid fluid>
        
                <React.Fragment>
                    <SideNav defaultExpanded
                        onSelect={(selected) => {
                            const to = '/catalog' + selected;
                            if (location.pathname !== to) {
                                history.push(to);
                                console.log('in selected');
                                console.log(this.state);
                                this.setState({catalog: selected});
                                console.log('in selected over');
                                console.log(this.state);
                                //this.setCatalog(selected.sub)
                            }
                        }}
                    >
                        <SideNav.Toggle />
                        <SideNav.Nav selected={this.state.catalog}>
                            <NavItem eventKey={'/'}>
                                    <NavIcon>
                                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>
                                        All
                                    </NavText>
                                </NavItem>
                            <NavItem eventKey="/1">
                                <NavIcon>
                                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Home
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="/2">
                                <NavIcon>
                                    <i className="fa fa-fw fa-tablet" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Devices
                                </NavText>
                            </NavItem>
                        </SideNav.Nav>
                    </SideNav>
                    <main>
                        
                    </main>
                </React.Fragment>
                    <Route path="/catalog/:id" render={({match})=><Card callBack={this.setCatalog.bind(this)} match={match}/>}/>
                    <Route path="/catalog/" render={({match})=><Card callBack={this.setCatalog.bind(this)} match={match}/>}/>
                    <Route path="/details/:cataId/:id" component={Details} />
             
       
        </Grid>
    )}}
    />
</Router>);




        //     <Router>
        //     <Grid fluid>
        //         <Row className="catalog">
        //             <Col xsHidden sm={4} md={3} lg={2} className="no-padding">
                   
        //             <SideNav
        //         onSelect={(selected) => {
        //             const to = '/' + selected;
        //             if (location.pathname !== to) {
        //                 history.push(to);
        //             }
        //         }}
        //     >
        //         <SideNav.Toggle />
        //         <SideNav.Nav defaultSelected="home">
        //             <NavItem eventKey="home">
        //                 <NavIcon>
        //                     <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
        //                 </NavIcon>
        //                 <NavText>
        //                     Home
        //                 </NavText>
        //             </NavItem>
        //             <NavItem eventKey="devices">
        //                 <NavIcon>
        //                     <i className="fa fa-fw fa-device" style={{ fontSize: '1.75em' }} />
        //                 </NavIcon>
        //                 <NavText>
        //                     Devices
        //                 </NavText>
        //             </NavItem>
        //         </SideNav.Nav>
        //     </SideNav>

        //             </Col>
        //             <Col sm={8} md={9} lg={10}>
        //             {items}
                   
        //             </Col>
        //         </Row>
        //     </Grid>
        // </Router>)
    }
}
export default Catalog;
      
     
      




       
