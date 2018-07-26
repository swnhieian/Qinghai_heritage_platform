import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './dist/style.css';
import InfiniteScroll from 'react-infinite-scroller';
import {Card, CardImg, CardBody, CardTitle} from 'reactstrap';
import {Link} from 'react-router-dom';

const Tile = (props) => (
    <div className="tile">
      <Link to={"/detail/" + props.title}>
        <Card>
          <CardImg top width="100%" src={props.src} alt="Card image cap" />
          <CardBody>
            <CardTitle>{props.title}</CardTitle>
          </CardBody>
        </Card>
      </Link>
    </div>
);

function createUniqueArray(inputArr, sorterKey) {
    var dict = {};
    var uniqueArr = [];
    for (let item of inputArr)
        dict[item[sorterKey]] = item;
    for (let key in dict)
        uniqueArr.push(dict[key]);
    return uniqueArr;
};

class Discovery extends Component {
    constructor(props) {
        super(props);
        this.perPage = 15;
        this.state = {
            images: [],
            hasMore: true
        };
    }

    fetchNextImages(page) {
        console.log("fetchNextImages", page);
        fetch(`/api/images?page=${page}&perPage=${this.perPage}`).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    this.setState({
                        images: createUniqueArray(
                            this.state.images.concat(data.images), 'src'),
                        hasMore: (data.images.length === this.perPage && page <= 20)
                    });
                });
            } else {
                response.json().then(error => {
                    console.log("Failed to get /api/images: " + error.message);
                });
            }
        }).catch(error => {
            console.log("Failed to get /api/images: ", error);
        });;
    }

    render() {
        const images = this.state.images.map(image => (
            <Tile src={image.src} title={image.title} key={image.src}/>
        ));
        return (
            <InfiniteScroll pageStart={0}
                            loadMore={this.fetchNextImages.bind(this)}
                            hasMore={this.state.hasMore}
                            threshold={500}>
              <div className="container">
				<div className="masonry-container">
				  <Masonry brakePoints={[350, 500, 750]}>
                    {images}
				  </Masonry>
				</div>
			  </div>
            </InfiniteScroll>
        );
    }
}

class Masonry extends React.Component{
	constructor(props){
		super(props);
		this.state = {columns: 4};
		this.onResize = this.onResize.bind(this);
	}
	componentDidMount(){
		this.onResize();
		window.addEventListener('resize', this.onResize);
	}
	
	getColumns(w){
		return this.props.brakePoints.reduceRight( (p, c, i) => {
			return c < w ? p : i;
		}, this.props.brakePoints.length) + 1;
	}
	
	onResize(){
        const columns = this.refs.Masonry?this.getColumns(this.refs.Masonry.offsetWidth):this.state.columns;
		if(columns !== this.state.columns){
			this.setState({columns: columns});	
		}
	}
	
	mapChildren(){
		let col = [];
		const numC = this.state.columns;
		for(let i = 0; i < numC; i++){
			col.push([]);
		}
		return this.props.children.reduce((p,c,i) => {
			p[i%numC].push(c);
			return p;
		}, col);
	}
	
	render(){
        console.log("render");
		return (
			<div className="masonry" ref="Masonry">
			  {this.mapChildren().map((col, ci) => {
				  return (
					  <div className="column" key={ci} >
						{col.map((child, i) => {
							return (<div key={i}>{child}</div>);
						})}
					  </div>
				  );
			  })}
			</div>
		);
	}
}

export default Discovery;
