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
              <div className="tangka "> 
                <div class="jumbotron">
                  <Container>
                    <h1 class="display-4">唐卡</h1>
                    <p class="lead">也叫唐嘎，唐喀，系藏文音译，指用彩缎装裱后悬挂供奉的宗教卷轴画。唐卡是藏族文化中一种独具特色的绘画艺术形式，题材内容涉及藏族的历史、政治、文化和社会生活等诸多领域，传世唐卡大都是藏传佛教和本教作品。</p>
                    <hr class="my-4" /> <p>青海非物质文化博物馆的宗旨：让所有青海非物质文化遗产三维化，让人可以通过视频、音频、AR、VR等方式了解和传承青海非物质文化遗产。</p>
                    <p class="lead">
                      <a href="http://192.168.1.102:8080/web3dproduct/ArtAndCraft/tangkaindex" target="_blank"><button className="btn btn-outline-light btn-lg">中国唐卡图像数字博物馆</button></a>
                  </p></Container>
                </div>
              </div>
              <div className="carousel container">very high</div>
              <div className="carousel container">very high</div>
            </div>
        );
    }
}
export default Home;

