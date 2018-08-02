import React, { Component } from 'react';
import './dist/style.css';
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";

class GotoTop extends Component {
    
    render () {
        return (


      <div title="回到顶部">
        <ScrollUpButton ContainerClassName="gotoTop" style={{'bottom': '60px'}} TransitionBtnPosition={300}/>
      </div>

            
        );
    }
} 
export default GotoTop;
