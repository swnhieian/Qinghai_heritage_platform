import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './dist/style.css'
import InfiniteScroll from 'react-infinite-scroller';
import {Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText} from 'reactstrap';
import {Link} from 'react-router-dom';
const masonryOptions = {
    transitionDuration: 0
};
const imagesLoadedOptions = {
    background: '.masonry-bg'
};
const createUniqueArray = function (inputArray, sorter) {
    var arrResult = {};
    var nonDuplicatedArray = [];
    var i, n;

    for (i = 0, n = inputArray.length; i < n; i++) {
        var item = inputArray[i];

        if (sorter) {
            arrResult[item[sorter]] = item;
        } else {
            arrResult[item] = item;
        }
    }

    i = 0;

    for (var item in arrResult) {
        nonDuplicatedArray[i++] = arrResult[item];
    }

    return nonDuplicatedArray;
};
class Discovery extends Component {
  constructor(props) {
    super(props);
    this.perPage = 10;
    this.state = {
        page: 0,
        images: [],
        hasMore: true
    };  
    this.fakeimages = [
        {guid: '0', src: '/img/example.jpg', id: '湟源陈醋', name:'湟源陈醋'},
        {guid: '1', src: 'https://assets.entrepreneur.com/content/3x2/2000/20180723151919-GettyImages-707451763.jpeg', id: '湟源陈醋', name:'湟源陈醋'},
        {guid: '2', src: '/img/example.jpg', id: '湟源陈醋', name:'湟源陈醋'},
        {guid: '3', src: '/img/example2.jpg', id: '湟源陈醋', name:'湟源陈醋'},
        {guid: '4', src: '/img/example.jpg', id: '湟源陈醋', name:'湟源陈醋'},
        {guid: '5', src: '/img/example.jpg', id: '湟源陈醋', name:'湟源陈醋'},
        {guid: '6', src: 'https://assets.entrepreneur.com/content/3x2/2000/20180723151919-GettyImages-707451763.jpeg', id: '湟源陈醋', name:'湟源陈醋'},
        {guid: '7', src: '/img/example2.jpg', id: '湟源陈醋', name:'湟源陈醋'},
        {guid: '8', src: '/img/example2.jpg', id: '湟源陈醋', name:'湟源陈醋'},
        {guid: '9', src: 'https://assets.entrepreneur.com/content/3x2/2000/20180723151919-GettyImages-707451763.jpeg', id: '湟源陈醋', name:'湟源陈醋'}
    ];
    this.fetchNextImages = this.fetchNextImages.bind(this);
    this.includeLoadedImages = this.includeLoadedImages.bind(this);
    this.includeLoadedImages(0, this.fakeimages);
  }
  fetchNextImages(page, perPage, callback) {
    /*this.props.api.entries.get({
        page: page,
        perPage: perPage,
        category: this.props.category
    }, callback); */
    callback(null, this.fakeimages.map((item)=>{
        let ret = {...item};
        ret.guid = page+ "-" + item.guid;
        return ret;
    }));
  }
  includeLoadedImages(page, images) {
      console.log('include loaded images');
      console.log(images);
    this.setState({
        page: page + 1,
        images: createUniqueArray(this.state.images.concat(images), 'guid'),
        hasMore: (images.length == this.perPage && page <= 20)
    });
  }
  loadMoreImages(page) {    
    this.fetchNextImages(page, this.perPage, (function (err, images) {
        if (err) return console.log(err);
        this.includeLoadedImages(page, images);
    }).bind(this));
  }
  getImagesToRender() {
    return this.state.images.map((image)=> {
        return (
          <Tile item={image} />
    
        );
    });
  }
  getLoaderElement() {
    return null;
  }
  render() {
    return (
            
                       <InfiniteScroll 
                            ref='masonryContainer'
                            loader={this.getLoaderElement()}
                            pageStart={0}
                            loadMore={this.loadMoreImages.bind(this)}
                            hasMore={this.state.hasMore}
                            threshold={1000}
                        >
                        {/* <Container>
                <Row className="d-flex align-items-start flex-wrap">
                            {this.getImagesToRender()}
                            </Row>
            </Container> */}


            <div className="container">
				<div className="masonry-container">
					
					<Masonry brakePoints={[250, 500, 750]}>
                    {this.getImagesToRender()}
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
		this.state = {columns: 1};
		this.onResize = this.onResize.bind(this);
	}
	componentDidMount(){
		this.onResize();
		window.addEventListener('resize', this.onResize)	
	}
	
	getColumns(w){
		return this.props.brakePoints.reduceRight( (p, c, i) => {
			return c < w ? p : i;
		}, this.props.brakePoints.length) + 1;
	}
	
	onResize(){
		const columns = this.getColumns(this.refs.Masonry.offsetWidth);
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
		return (
			<div className="masonry" ref="Masonry">
				{this.mapChildren().map((col, ci) => {
					return (
						<div className="column" key={ci} >
							{col.map((child, i) => {
								return <div key={i} >{child}</div>
							})}
						</div>
					)
				})}
			</div>
		)
	}
}
const Tile = ({item}) => {
    return (
      <div className="tile">
        <Link to={"/detail/" + item.id}>
          <Card>
          <CardImg top width="100%" src={item.src} alt="Card image cap" />
            <CardBody>
            <CardTitle>{item.name}</CardTitle>
            {/* <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText> */}
            </CardBody>
          </Card>
        </Link>
      </div>
    );
  };
export default Discovery;