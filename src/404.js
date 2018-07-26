import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './dist/style.css'
class Page404 extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen : false};
  }
  render() {
    return (
        <div>
          <h1>404</h1>
        </div>
    );
  }
}

export default Page404;
