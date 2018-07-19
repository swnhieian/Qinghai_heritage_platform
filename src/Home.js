import React, { Component } from 'react';
import {Carousel} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './dist/style.css';

class Home extends Component {    
    render() {
      let catalog = ['竞技', '美术', '民俗', '曲艺', '手工艺', '文学', '舞蹈', '戏剧', '医药', '音乐'];
      let catalogs = catalog.map((item) => (<div>{item}</div>));
        return (
       <div>
        <Carousel className="carousel carousel-fade">
          <Carousel.Item>
            <img width={900} height={500} alt="900x500" src="img/1.jpg" />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={900} height={500} alt="900x500" src="img/2.jpg" />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={900} height={500} alt="900x500" src="img/3.jpg" />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        <div className="carousel">
          {catalogs}
        </div>
        <div className="carousel">very high</div>
        <div className="carousel">very high</div>

      </div>)
    }
}
export default Home;
      
     
      




       
