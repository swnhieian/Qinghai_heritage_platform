import React, { Component } from 'react';
import './dist/style.css';
import {Container, Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import {Link} from 'react-router-dom';
import queryString from 'query-string';

const ResultItem = (props) => (
    <div className="search-result media" key={props.item.title}>
      <Link to={'/detail/'+props.item.title}>
        <img src={props.item.thumbnail} alt={props.item.thumbnail}
             className="search-result-img align-self-center" />
      </Link>
      <div className="media-body">
        <Link to={'/detail/'+props.item.title}>
          <h5>{props.item.title}</h5>
        </Link>
        {
            (props.item.contents[0].content.length>150)
                ? (props.item.contents[0].content.substring(0, 147)+'...')
                : props.item.contents[0].content
        }
      </div>
    </div>
);

function ResultList(props) {
    const resultItems = props.items.map(item => (
        <ResultItem item={item} key={item.title}/>
    ));
    return (
        <div className="search-result-list">
          {resultItems}
        </div>
    );
}

function ResultPagination(props) {
    const pages = [...Array(props.totalPage)].map((x, i) => (
        <PaginationItem active={((i+1) === props.currentPage)} key={i+1}>
          <PaginationLink href={props.makeUrl(i+1)}>
            {i+1}
          </PaginationLink>
        </PaginationItem>
    ));
    return (
        <div className="search-result-pagination">
          <Pagination listClassName="justify-content-center">
            <PaginationItem disabled={props.currentPage === 1}>
              <PaginationLink previous href={props.makeUrl(1)} />
            </PaginationItem>
            {pages}
            <PaginationItem disabled={props.currentPage === props.totalPage}>
              <PaginationLink next href={props.makeUrl(props.totalPage)} />
            </PaginationItem>
          </Pagination>
        </div>
    );
}

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.numPerPage = 10;
        let paras = queryString.parse(props.location.search);
        this.state = {
            keyword: paras.word, currentPage: paras.page || 1,
            results: [],
            totalNum: 0, totalPage: 1
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        fetch("/api/textsearch/" + this.state.keyword).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    console.log(data);
                    this.setState({
                        results: data.items,
                        totalNum: data.items.length, totalPage: Math.ceil(data.items.length / this.numPerPage)
                    });
                });
            } else {
                response.json().then(error => {
                    console.log("Failed to get /api/textsearch: " + error.message);
                });

            }
        }).catch(error => {
            console.log("Failed to get /api/textsearch: ", error);
        });
    }
    
  makeUrl(page) {
      return '/search?word=' + this.state.keyword + '&page=' + page;
  }

  render() {
        return (
            <Container>
              <div className="search-overview">
                共找到关于<b>{this.state.keyword}</b>的结果{this.state.totalNum}条，共{this.state.totalPage}页
              </div>
              <ResultList items={this.state.results}/>
              <ResultPagination totalPage={this.state.totalPage} currentPage={this.state.currentPage}
                                makeUrl={this.makeUrl.bind(this)}/>
            </Container>
        );
  }
}

export default SearchResults;
