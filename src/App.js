import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './dist/style.css'
import TopBar from './TopBar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Home';
import Catalog from './Catalog';
// import About from './About';
import Detail from './Detail';
import Footer from './Footer';
import SearchResults from './SearchResults';
import Page404 from './404';

class App extends Component {
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
    return (
      <Router>
        <div>
        <TopBar></TopBar>
        <div className="page-content">
         <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/catalog" component={Catalog}></Route>          
          <Route path="/detail/:title" component={Detail}></Route>
          <Route path="/search" component={SearchResults}></Route>
          <Route component={Page404}></Route>
         </Switch>
          {/*<Route path="/about" component={About}></Route> */}
        </div>
        <Footer></Footer>
      </div>
      </Router>
    );
  }
}

export default App;