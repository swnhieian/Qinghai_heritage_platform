import React, { Component } from 'react';
import './dist/style.css';
import "react-image-gallery/styles/css/image-gallery.css";
// import ImageGallery from 'react-image-gallery';
import MultimediaGallery from "./MultimediaGallery";
import {Grid, Row, Col} from 'react-bootstrap';
import GotoTop from './GotoTop';


class Detail extends Component {

    constructor() {
        super();
        this.state = {loaded: false};
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        console.log("loadData");
        fetch("/api/items/" + this.props.match.params.title).then(response => {
            if (response.ok) {
                console.log("Got Response:", response);
                response.json().then(data => {
                    console.log("Got data:", data);
                    this.setState({details: data.item, loaded: true});
                });
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
                  <p>No Page for {this.props.match.params.title}</p>
                  <p>Try url http://localhost:port/details/河湟皮影</p>
                </div>
            ) : (<div></div>);
        }
        const content = details.content.map((item) => {
            switch (item.type) {
            case 'text':
                return (<p className='detail-text'>{item.content}</p>);
            case 'image':
                return (
                    <div className='detail-media'>
                      <img src={item.src} alt={item.src}/>
                      <div className='detail-media-caption'>
                        {item.caption}
                      </div>
                    </div>
                );
            default:
                return (<div></div>);
            }
        });
        return (
            <div>
              <Grid>
                <Row>
                  <Col>
                    <h1 className='detail-title'>{details.title}</h1>
                    <div className='detail-gallery'>
                      <MultimediaGallery className="detail-gallery"
                                        items={details.gallery}/>
                    </div> 
                    <div className='detail-content'>
                      {content}
                    </div>
                  </Col>
                </Row>
              </Grid> 
              <GotoTop />
            </div>
        );
    }
}
export default Detail;
