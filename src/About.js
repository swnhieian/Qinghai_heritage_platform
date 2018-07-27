import React, { Component } from 'react';
import './dist/style.css';
import STLViewer from 'stl-viewer';
import {Button, Container} from 'reactstrap';


class About extends Component {
    constructor(props) {
		super(props);
		this.state = {
			rotate : false,
			restart: true
		};
	}
	rerender() {
		this.setState({restart: !this.state.restart});
	}
	stopRotate() {
		this.setState({rotate: false});
		this.rerender();
	}
	startRotate() {
		this.setState({rotate: true});
		this.rerender();
	}
  
  render() {
    return (
		<Container className="stl-viewer-container">
		<STLViewer 
		  url='/关公.stl'
		  className="stl-viewer"
		  rotate={this.state.rotate}
		  restart={this.state.restart}  //trick for rerender the whole component
		  width={500}
		  lightX={0}
		  lightY={-200}
		  lightZ={100}
		  cameraX={0}
		  cameraY={-300}
		  cameraZ={10}
		  backgroundColor={ '#EAEAEA'}
		  modelColor={'#B92C2C'}
		  lightColor={'#ffffff'}
		  rotationSpeeds={[0, 0, 0.02]}/>

		  <Button outline color="primary" onClick={this.startRotate.bind(this)}>开始旋转</Button>{' '}
          <Button outline color="danger" onClick={this.stopRotate.bind(this)}>停止旋转</Button>
		</Container>
    )
  }
}

export default About;
