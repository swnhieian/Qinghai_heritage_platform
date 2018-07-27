import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

import {Carousel, CarouselItem, CarouselCaption, CarouselIndicators, CarouselControl, Row, Col, Container} from 'reactstrap';
import './dist/style.css';
import {Link } from 'react-router-dom';

const items = [
  {
    src: '/img/1.jpg',
    altText: 'Slide 1',
    caption: 'Slide 1'
  },
  {
    src: '/img/2.jpg',
    altText: 'Slide 2',
    caption: 'Slide 2'
  },
  {
    src: '/img/3.jpg',
    altText: 'Slide 3',
    caption: 'Slide 3'
  }
];
class Home extends Component {
    constructor(props) {
      super(props);
      this.state = { activeIndex: 0 };
      this.next = this.next.bind(this);
      this.previous = this.previous.bind(this);
      this.goToIndex = this.goToIndex.bind(this);
      this.onExiting = this.onExiting.bind(this);
      this.onExited = this.onExited.bind(this);
    }

    onExiting() {
      this.animating = true;
    }

    onExited() {
      this.animating = false;
    }

    next() {
      if (this.animating) return;
      const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
      this.setState({ activeIndex: nextIndex });
    }

    previous() {
      if (this.animating) return;
      const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
      this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
      if (this.animating) return;
      this.setState({ activeIndex: newIndex });
    }
    createCard(item, i) {
      return (
        <Col key={i}>
          <Link to="/catalog" className="catalog-card">
            <img src='/img/example.jpg' className="rounded"/>
            <div class="catalog-name d-flex align-items-center justify-content-around"> <span className="d-flex">{item}</span> </div>
          </Link>
        </Col>
      )
    }
    render() {
      let catalog = ['竞技', '美术', '民俗', '曲艺', '手工艺', '文学', '舞蹈', '戏剧', '医药', '音乐'];
      let c1 = catalog.map((item, i)=>(i<5?(this.createCard(item, i)):''));
      let c2 = catalog.map((item, i)=>(i>4?(this.createCard(item, i)):''));
      let catalogs = catalog.map((item) => (<div key={item}>{item}</div>));
      
      const slides = items.map((item) => {
        return (
          <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.src}>
            <img className="image-fluid" src={item.src} alt={item.altText} />
            <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
          </CarouselItem>
        )
      })
        return (
       <div>
         <Carousel
        activeIndex={this.state.activeIndex}
        next={this.next}
        previous={this.previous}
        className="carousel-fade"
         >
        <CarouselIndicators items={items} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
      <section className="catalogs">
        <Container>
          <Row>
            {c1}
          </Row>
          <Row>
            {c2}
          </Row>
        </Container>
      </section>
      <section className="tangka">
      
      </section>

        <div className="carousel container">
          <Row>
          {catalogs}
          </Row>
        </div>
        <div className="carousel container">very high</div>
        <div className="carousel container">very high</div>

      </div>)
    }
}
export default Home;
      
     
      




       
