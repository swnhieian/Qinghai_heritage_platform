import React, { Component } from 'react';
import './dist/style.css';
import {Button} from 'reactstrap';
import { Icon } from 'react-icons-kit'
import {chevronUp} from 'react-icons-kit/fa/chevronUp'

class GotoTop extends React.Component {
    constructor() {
      super();
  
      this.state = {
          intervalId: 0
      };
    }
    
    scrollStep() {
      if (window.pageYOffset === 0) {
          clearInterval(this.state.intervalId);
      }
      window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
    }
    
    scrollToTop() {
      let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
      this.setState({ intervalId: intervalId });
    }
    
    render () {
        return (
            <div className="gotoTop">
        <Button title='????' className='scroll' 
                 onClick={ () => { this.scrollToTop(); }}>
                  <Icon icon={chevronUp} className="arrow-up"/>
                </Button>
                </div>
        );
     }
  } 
export default GotoTop;