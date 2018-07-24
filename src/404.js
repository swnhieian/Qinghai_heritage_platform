import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './dist/style.css'
class Page404 extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen : false};
  }
  componentDidMount () {
    const script = document.createElement("script");
    script.src = "//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js";
    script.setAttribute('homePageUrl', "http://127.0.0.1:3000/");
    script.setAttribute('homePageName', "返回青海非物质文化遗产保护平台");
    script.async = true;
    document.body.appendChild(script);
  }
  render() {
    return (
        <div>
        </div>
    );
  }
}

export default Page404;
