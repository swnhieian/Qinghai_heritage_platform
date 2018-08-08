import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Carousel, CarouselItem, CarouselCaption, CarouselIndicators, CarouselControl} from 'reactstrap';
import {Link} from 'react-router-dom';
import './dist/style.css';

class CarouselSlides extends Component {
    constructor(props) {
        super(props);
        this.state = {activeIndex: 0, items: []};
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        fetch("/api/configs").then(response => {
            if (response.ok) {
                response.json().then(data => {
                    this.setState({items: data.configs.home_carousel_slides});
                });
            } else {
                response.json().then(error => {
                    console.log("Failed to get /api/configs: " + error.message);
                });
            }
        }).catch(error => {
            console.log("Failed to get /api/items: ", error);
        });
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === this.state.items.length - 1
                  ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0
                  ? this.state.items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render() {
        const slides = this.state.items.map(item => (
            <CarouselItem onExiting={this.onExiting}
                          onExited={this.onExited} key={item.src}>
              <Link to={item.url}>
                <img className="image-fluid" src={item.src} alt={item.altText} />
              </Link>
              <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
            </CarouselItem>
        ));
        
        return (
            <Carousel activeIndex={this.state.activeIndex}
                      next={this.next}  previous={this.previous}
                      className="carousel-fade">
              <CarouselIndicators items={this.state.items}
                                  activeIndex={this.state.activeIndex}
                                  onClickHandler={this.goToIndex} />
              {slides}
              <CarouselControl direction="prev" directionText="Previous"
                               onClickHandler={this.previous} />
              <CarouselControl direction="next" directionText="Next"
                               onClickHandler={this.next} />
            </Carousel>
        );
    }
}

export default CarouselSlides;
