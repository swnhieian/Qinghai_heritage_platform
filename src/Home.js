import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Row, Col, Container} from 'reactstrap';
import './dist/style.css';
import {Link } from 'react-router-dom';

import CarouselSlides from "./CarouselSlides";

const Card = (props) => (
    <Col key={props.idx}>
      <Link to={"/catalog#"+props.item.category} className="catalog-card">
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
                <div className="jumbotron">
                  <Container>
                    <h1 className="display-4">唐卡</h1>
                    <p className="lead">也叫唐嘎，唐喀，系藏文音译，指用彩缎装裱后悬挂供奉的宗教卷轴画。唐卡是藏族文化中一种独具特色的绘画艺术形式，题材内容涉及藏族的历史、政治、文化和社会生活等诸多领域，传世唐卡大都是藏传佛教和本教作品。</p>
                    <hr className="my-4" /> <p>青海非物质文化博物馆的宗旨：让所有青海非物质文化遗产三维化，让人可以通过视频、音频、AR、VR等方式了解和传承青海非物质文化遗产。</p>
                    <p className="lead">
                      <a href="http://192.168.1.102:8080/web3dproduct/ArtAndCraft/tangkaindex" target="_blank" rel="noopener noreferrer">
                        <button className="btn btn-outline-light btn-lg">中国唐卡图像数字博物馆</button>
                      </a>
                    </p>
                  </Container>
                </div>
              </div>
   
              <Container className="contact">
                <Row>
                  <Col>本团队隶属于青海大学计算机技术与应用系，成立于2015年9月。团队的主要研究方向是数字可视化与媒体计算，目前本团队的可用硬件资源有：国家重点实验室一个，3D打印机若干，动捕设备，三维扫描仪等。 团队目前有在职教师2人，在读硕士研究生5人，在读本科生若干。本团队有良好的学习科研氛围，有积极的工程经验。本团队与清华大学联系密切，具有良好的技术支撑。共赢未来！</Col>
                  <Col>
                    地址：青海省西宁市宁大路251号(810016)<br/>
                    联系电话：0971-5315609<br/>
                    联系邮箱：qhujsjx@163.com<br/>
                  </Col>
                </Row>
                
              </Container>
            </div>
        );
    }
}
export default Home;

