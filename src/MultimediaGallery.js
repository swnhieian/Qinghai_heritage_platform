import React, { Component } from 'react';

import ImageGallery from 'react-image-gallery';

class MultimediaGallery extends Component {

    constructor() {
        super();
        this.state = {
            showVideo: {},
        };
        this._renderVideo = this._renderVideo.bind(this);
        this._onSlide = this._onSlide.bind(this);
    }

    _toggleShowVideo(url) {
        console.log("toggle");
        let showVideo = this.state.showVideo;
        showVideo[url] = !Boolean(this.state.showVideo[url]);
        this.setState({
            showVideo: showVideo
        });
    }

    _onSlide(index) {
        this._resetVideo();
    }

    _resetVideo() {
        this.setState({showVideo: {}});
    }

    _renderVideo(item) {
        return (
            <div>
              {
                  this.state.showVideo[item.embedUrl] ? (
                      <div className="video-wrapper">
                        <a onClick={this._toggleShowVideo.bind(this, item.embedUrl)}>
                        </a>
                        <iframe title="video-player"
                                width={item.video_width || 640}
                                height={item.video_height || 480}
                                src={item.embedUrl}
                                frameBorder="0" allowFullScreen/>
                      </div>
                  ) : (
                      <a onClick={this._toggleShowVideo.bind(this, item.embedUrl)}>
                        <div className="play-button"/>
                        <img src={item.original} alt={item.original}/>
                      </a>
                  )
              }
            </div>
        );
    }
    render() {
        const items = this.props.items.map(item => {
            item.thumbnail = item.original;
            if (item.type && item.type === "video") {
                item.renderItem = this._renderVideo;
            }
            return item;
        });
        return (
            <ImageGallery
              items={items}
              onSlide={this._onSlide}
              lazyLoad={false}
              showIndex={true}
              thumbnailPosition="top"
              showPlayButton={false} />
        );
    }
}

export default MultimediaGallery;
