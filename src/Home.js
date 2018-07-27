import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Row, Col, Container} from 'reactstrap';
import './dist/style.css';
import {Link } from 'react-router-dom';

import CarouselSlides from "./CarouselSlides";

const Card = (props) => (
    <Col key={props.idx}>
      <Link to="/catalog" className="catalog-card">
        <img src={props.item.thumbnail} alt={props.item.thumbnail} className="rounded"/>
        <div className="catalog-name d-flex align-items-center justify-content-around">
          <span className="d-flex">{props.item.category}</span>
        </div>
      </Link>
    </Col>
);

function Catalogs(props) {
    let c1 = props.catalogs.map((item, i) => (
        i < 5 ? (<Card item={item} idx={i} key={i}/>) : ''
    ));
    let c2 = props.catalogs.map((item, i) => (
        i > 4 ? (<Card item={item} idx={i} key={i}/>) : ''
    ));
    return (
        <section className="catalogs">
          <Container>
            <Row>{c1}</Row>
            <Row>{c2}</Row>
          </Container>
        </section>
    );
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {catalogs: []};
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        fetch("/api/catalogs").then(response => {
            if (response.ok) {
                response.json().then(data => {
                    this.setState({catalogs: data.catalogs});
                });
            } else {
                response.json().then(error => {
                    console.log("Failed to get /api/catalogs: " + error.message);
                });
            }
        }).catch(error => {
            console.log("Failed to get /api/catalogs: ", error);
        });
    }

    render() {
        return (
            <div>
              <CarouselSlides/>
              <Catalogs catalogs={this.state.catalogs}/>
              <section className="tangka"/>
              <div className="carousel container">very high</div>
              <div className="carousel container">very high</div>
            </div>
        );
    }
}
export default Home;

