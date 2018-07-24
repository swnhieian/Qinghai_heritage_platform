import React, { Component } from 'react';
import './dist/style.css'
import {Container, Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import {Link} from 'react-router-dom';
import queryString from 'query-string'
class SearchResults extends Component {
    constructor(props) {
        super(props);
        let paras = queryString.parse(props.location.search);
        this.keyword = paras.word;
        this.currentPage = paras.page || 1;
        this.reaults = [];
    }

    getData() {
        console.log(this.keyword);
        this.totalNum = 50;
        this.totalPage = this.totalNum / 10;
        this.results = [
            {
                id: '河湟皮影',
                name: '河湟皮影',
                thumbnail: '/img/example.jpg',
                content: '皮影戏又名“灯影戏”、“皮影子”，是中国民间融戏剧、文学、音乐、美术为一体的一种古老而奇特的戏曲艺术。一块白布就是舞台，尺把长的小人在幕后被演员操作得得心应手，当灯光穿过皮影，白布另一侧便显现出色彩明艳、栩栩如生的人物、花鸟、楼宇等各种动态人物和静态事物，人物动作娴熟、花鸟形象逼真,素有“银灯映照千员将，一箱容下百万兵”的美称。'
            },
            {
                id: '河湟皮影',
                name: '河湟皮影',
                thumbnail: '/img/example.jpg',
                content: '影戏又名“灯影戏影戏又名“灯影戏影戏又名“灯影戏影戏又名“灯影戏影戏又名“灯影戏影戏又名“灯影戏影戏又名“灯影戏影戏又名“灯影戏皮影戏又名“灯影戏”、“皮影子”，是中国民间融戏剧、文学、音乐、美术为一体的一种古老而奇特的戏曲艺术。一块白布就是舞台，尺把长的小人在幕后被演员操作得得心应手，当灯光穿过皮影，白布另一侧便显现出色彩明艳、栩栩如生的人物、花鸟、楼宇等各种动态人物和静态事物，人物动作娴熟、花鸟形象逼真,素有“银灯映照千员将，一箱容下百万兵”的美称。'
            },
            {
                id: '河湟皮影',
                name: '河湟皮影',
                thumbnail: '/img/example.jpg',
                content: '皮影戏又名“灯影戏”、“皮影子”，是中国民间融戏剧、文学、音乐、美术为一体的一种古老而奇特的戏曲艺术。一块白布就是舞台，尺把长的小人在幕后被演员操作得得心应手，当灯光穿过皮影，白布另一侧便显现出色彩明艳、栩栩如生的人物、花鸟、楼宇等各种动态人物和静态事物，人物动作娴熟、花鸟形象逼真,素有“银灯映照千员将，一箱容下百万兵”的美称。'
            },
            {
                id: '河湟皮影',
                name: '河湟皮影',
                thumbnail: '/img/example.jpg',
                content: '皮影戏又名“灯影戏”、“皮影子”，是中国民间融戏剧、文学、音乐、美术为一体的一种古老而奇特的戏曲艺术。一块白布就是舞台，尺把长的小人在幕后被演员操作得得心应手，当灯光穿过皮影，白布另一侧便显现出色彩明艳、栩栩如生的人物、花鸟、楼宇等各种动态人物和静态事物，人物动作娴熟、花鸟形象逼真,素有“银灯映照千员将，一箱容下百万兵”的美称。'
            }
 
        ]
    }
  makeUrl(page) {
      return '/search?word=' + this.keyword + '&page=' + page;
  }
  render() {
        this.getData();
        this.result = this.results.map((item) => {
            return (
                <div className="search-result media" key={item.id}>
                    <Link to={'/detail/'+item.id}>
                        <img src={item.thumbnail} className="search-result-img align-self-center" />
                    </Link>
                    <div className="media-body">
                        <Link to={'/detail/'+item.id}>
                            <h5>{item.name}</h5>
                        </Link>
                      {(item.content.length>150)?(item.content.substring(0, 147)+'...'):item.content}
                    </div>
                </div>
            )
        });
        let pages = [...Array(this.totalPage)].map((x,i)=> {
            return (
                <PaginationItem active={((i+1) == this.currentPage)}>
                  <PaginationLink href={this.makeUrl(i+1)}>
                    {i+1}
                  </PaginationLink>
                </PaginationItem>

            )
        })
        console.log(pages);
        console.log(this.currentPage);
        return (
            <Container>
              <div className="search-overview">
                共找到关于<b>{this.keyword}</b>的结果{this.totalNum}条，共{this.totalPage}页
              </div>
              <div className="search-result-list">
                {this.result}
              </div>
              <div className="search-result-pagination">
              <Pagination listClassName="justify-content-center">
                <PaginationItem disabled={this.currentPage == 1}>
                <PaginationLink previous href={this.makeUrl(1)} />
                </PaginationItem>
                {pages}
                <PaginationItem disabled={this.currentPage == this.totalPage}>
                <PaginationLink next href={this.makeUrl(this.totalPage)} />
                </PaginationItem>
            </Pagination>
              </div>
            </Container>
        );
  }
}

export default SearchResults;
