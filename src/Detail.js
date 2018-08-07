import React, { Component } from 'react';
import './dist/style.css';
import "react-image-gallery/styles/css/image-gallery.css";
import MultimediaGallery from "./MultimediaGallery";
import {Container, Row, Col} from 'reactstrap';
import GotoTop from './GotoTop';
import {Redirect} from 'react-router-dom';
import {animateScroll as scroll} from 'react-scroll';

class Detail extends Component {
    constructor() {
        super();
        this.state = {loaded: false};
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        fetch("/api/items/" + this.props.match.params.title).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    this.setState({details: data.item, loaded: true});
                });
                scroll.scrollToTop({delay:0, duration:0});
            } else {
                response.json().then(error => {
                    console.log("Failed to get /api/items: " + error.message);
                });
            }
        }).catch(error => {
            console.log("Failed to get /api/items: ", error);
        });
    }

    render() {
        const details = this.state.details;
        if (details === undefined || details === null) {
            return this.state.loaded ? (
                <div>
                    <Redirect to="/404" />
                  <p>No Page for {this.props.match.params.title}</p>
                  <p>Try url http://localhost:port/detail/湟源陈醋</p>

                </div>
            ) : (<div></div>);
        }
        
        const content = details.contents.map((item, idx) => {
            switch (item.type) {
            case 'text':
                const paras = item.content.split("\\endl").map((para, no) => (
                    <p className='detail-text' key={no}>{para}</p>
                ));
                return (<div key={idx}>{paras}</div>);
            case 'image':
                return (<div className='detail-media' key={idx}>
                        <img src={item.src} alt={item.src}/>
                        <div className='detail-media-caption'>{item.caption}</div>
                        </div>);
            default:
                return (<div key={idx}></div>);
            }
        });
        return (
            <div className="detail-wrapper">
              <Container>
                <Row>
                  <Col>
                    <h1 className='detail-title'>{details.title}</h1>
                    <div className='detail-content'>
                      {content}
                    </div>
                    {details.gallery.length == 0?'':
                    <div className='detail-gallery'>
                      <MultimediaGallery className="detail-gallery"
                                         items={details.gallery}/>
                    </div> }
                  </Col>
                </Row>
              </Container> 
              <GotoTop />
            </div>
        );
    }
}
export default Detail;

