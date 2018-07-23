import React, { Component } from 'react';
import './dist/style.css';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import {Grid, Row, Col} from 'react-bootstrap';
import GotoTop from './GotoTop';


class Detail extends Component {

    render() {
        const images = [
            {
              original: '/img/1.jpg',
              thumbnail: '/img/1.jpg',
            },
            {
              original: '/img/2.jpg',
              thumbnail: '/img/2.jpg'
            },
            {
              original: '/img/3.jpg',
              thumbnail: '/img/3.jpg'
            }
          ]
        const details = {
            'title': '河湟皮影',
            'gallery': images,
            'content': [
                {
                    'type': 'text',
                    'content': '皮影戏又名“灯影戏”、“皮影子”，是中国民间融戏剧、文学、音乐、美术为一体的一种古老而奇特的戏曲艺术。一块白布就是舞台，尺把长的小人在幕后被演员操作得得心应手，当灯光穿过皮影，白布另一侧便显现出色彩明艳、栩栩如生的人物、花鸟、楼宇等各种动态人物和静态事物，人物动作娴熟、花鸟形象逼真,素有“银灯映照千员将，一箱容下百万兵”的美称。'
                },
                {
                    'type': 'text',
                    'content': '河湟皮影戏的流行区域主要分布在西宁、大通、湟中、平安、互助、乐都、化隆、贵德及湟源、民和、循化等县市。'
                },
                {
                    'type': 'image',
                    'src': '/img/example.jpg',
                    'caption': '某某某在做某某'
                },
                {
                    'type': 'text',
                    'content': '河湟皮影戏演出剧目以《五子魁》、《红罗传》、《康熙征北》、《女状元》等一些传统剧目为主，也有《十唱感谢共产党》、《卖牛记》等新编现代戏，还有男女分腔演唱的《二堂舍子》。'
                },
                {
                    'type': 'text',
                    'content': '2008年“河湟皮影戏”列入第二批国家级非物质文化遗产保护名录，2011年入选联合国教科文组织“人类非物质文化遗产代表作名录”。'
                }
            ]
        };
        const content = details.content.map((item) => {
            switch (item.type) {
                case 'text':
                    return (<p className='detail-text'>{item.content}</p>);
                case 'image':
                    return (<div className='detail-media'>
                                <img src={item.src} />
                                <div className='detail-media-caption'>{item.caption}</div>
                            </div>)
                default:
                    return (<div></div>)
            }
        });
        return (
       <div>
          <Grid>
              <Row>
                  <Col>
                    <h1 className='detail-title'>{details.title}</h1>
                    <div class='detail-gallery'>
                     <ImageGallery className='detail-gallery' lazyLoad items={details.gallery} />
                    </div> 
                    <div className='detail-content'>
                        {content}
                    </div>
                  </Col>
              </Row>
          </Grid> 
          <GotoTop />
      </div>)
    }
}
export default Detail;
      
