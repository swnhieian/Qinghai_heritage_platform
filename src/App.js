import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './dist/style.css'
import TopBar from './TopBar';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './Home';
import Catalog from './Catalog';
import About from './About';
import Detail from './Detail';

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
          <Route exact path="/" component={Home}></Route>
          <Route path="/catalog/:id?" component={Catalog}></Route>
          <Route path="/details/:id?" component={Detail}></Route>
          <Route path="/about" component={About}></Route>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
