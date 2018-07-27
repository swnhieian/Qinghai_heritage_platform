import React, { Component } from 'react';
import './dist/style.css';
import ReactEcharts from 'echarts-for-react';  // or var ReactEcharts = require('echarts-for-react');
import { withRouter } from 'react-router-dom';
import echarts from 'echarts';
require('echarts/map/js/province/qinghai.js');


var levelColorMap = {
    '1': 'rgba(241, 109, 115, .8)',
    '2': 'rgba(255, 235, 59, .7)',
    '3': 'rgba(147, 235, 248, 1)'
};
var cityMap = {
    '西宁市': '630100',
    '海北藏族自治州': '632200',
    '海南藏族自治州': '632500',
    '黄南藏族自治州': '632300',
    '果洛藏族自治州': '632600',
    '玉树藏族自治州': '632700',
    '海西蒙古族藏族自治州': '632800',
    '海东市': '630200'
};
var opt = {
    bgColor: '#154e90', // 画布背景色
    goDown: true,
    mapName: '青海',    // 地图名        	
    activeArea: [],
    callback: function (name, option, instance) {
        // console.log(name, option, instance);
    }
};


class Location extends Component {

    onChartClick(params, b) {
        if (params.componentType === 'series') {
            this.props.history.push('/detail/' + params.data[3]);
        }
        if (opt.goDown && params.name !== this.name[this.idx]) {
            if (cityMap[params.name]) {
                if (this.state.self == null) {
                    this.setState({
                        self: this.echarts_react.getEchartsInstance()
                    });
                }
                var url = cityMap[params.name];
                fetch('../map/' + url + '.json')
                    .then((res) => (res.json()))
                    .then((data) => {
                        echarts.registerMap(params.name, data);
                        this.resetOption(this.state.self, this.getOption(), params.name);
                    }, (e) => { console.log(e); });
            }
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        fetch("/api/locations").then(response => {
            if (response.ok) {
                response.json().then(data => {
                    opt.data = data.locations.map(loc => {
                        return [
                            loc.location[0], loc.location[1],
                            loc.title, loc.title, loc.city
                        ];
                    });
                    this.getOption().series[0].data = opt.data;
                    this.echarts_react.getEchartsInstance().setOption(this.getOption());
                });
            } else {
                response.json().then(error => {
                    console.log("Failed to get /api/locations: " + error.message);
                });
            }
        }).catch(error => {
            console.log("Failed to get /api/items: ", error);
        });
    }

    resetOption(i, o, n) {
        var breadcrumb = this.createBreadcrumb(n, this);
        var j = this.name.indexOf(n);
        var l = o.graphic.length;
        if (j < 0) {
            o.graphic.push(breadcrumb);
            o.graphic[0].children[0].shape.x2 = 80 + n.length * 20;
            o.graphic[0].children[1].shape.x2 = 80 + n.length * 20;
            if (o.graphic.length > 2) {
                o.series[0].data = opt.data.filter(x => (
                    n === '青海' ? true : (x[4] === n)));
            };
            this.name.push(n);
            this.idx++;
        } else {
            o.graphic.splice(j + 2, l);
            if (o.graphic.length <= 2) {
                o.graphic[0].children[0].shape.x2 = 60;
                o.graphic[0].children[1].shape.x2 = 60;
                o.series[0].data = opt.data;//this.handleEvents.initSeriesData(opt.data);
            };
            o.series[0].data = opt.data.filter(x => (
                n === '青海' ? true : (x[4] === n)));
            this.name.splice(j + 1, l);
            this.idx = j;
            this.pos.leftCur -= this.pos.leftPlus * (l - j - 1);
        };
        o.geo.map = n;
        o.geo.zoom = 0.4;
        i.clear();
        i.setOption(o);
        this.zoomAnimation();
        opt.callback(n, o, i);
    }

    createBreadcrumb(name, _self) {
        var breadcrumb = {
            type: 'group',
            id: name,
            left: _self.pos.leftCur + _self.pos.leftPlus,
            top: _self.pos.top + 3,
            children: [{
                type: 'polyline',
                left: -90,
                top: -5,
                shape: {
                    points: _self.line
                },
                style: {
                    stroke: '#fff',
                    key: name
                    // lineWidth: 2,
                },
                onclick: function () {
                    var name = this.style.key;
                    _self.resetOption(_self.state.self, _self.getOption(), name);
                }
            }, {
                type: 'text',
                left: -68,
                top: 'middle',
                style: {
                    text: name,
                    textAlign: 'center',
                    fill: _self.style.textColor,
                    font: _self.style.font
                },
                onclick: function () {
                    var name = this.style.text;
                    _self.resetOption(_self.state.self, _self.getOption(), name);
                }
            }]
        };
        _self.pos.leftCur += _self.pos.leftPlus;
        return breadcrumb;
    }

    zoomAnimation() {
        var count = null;
        var zoom = function (per) {
            if (!count) count = per;
            count = count + per;
            // console.log(per,count);
            this.state.self.setOption({
                geo: {
                    zoom: count
                }
            });
            if (count < 1) window.requestAnimationFrame(function () {
                zoom(0.2);
            });
        }.bind(this);
        window.requestAnimationFrame(function () {
            zoom(0.2);
        });
    }

    constructor(props) {
        super(props);
        //const url = 'http://api.map.baidu.com/geocoder/v2/?output=json&ak=GLQND1fp5f5VGoGdWuvyFsfoE9rGfPQI&address=';
        this.getOption = this.getOption.bind(this);
        this.onChartClick = this.onChartClick.bind(this);
        this.resetOption = this.resetOption.bind(this);
        this.onEvents = {
            'click': this.onChartClick
        };
        this.state = {
            self: null
        };
        this.zoomAnimation = this.zoomAnimation.bind(this);
        this.option = null;
        this.name = [opt.mapName];
        this.idx = 0;
        this.pos = {
            leftPlus: 115,
            leftCur: 150,
            left: 198,
            top: 50
        };
        this.line = [[0, 0], [8, 4], [0, 8]];
        // style
        this.style = {
            font: '18px "Microsoft YaHei", sans-serif',
            textColor: '#eee',
            lineColor: 'rgba(147, 235, 248, .8)'
        };
    }

    getOption() {
        if (this.option == null) {
            var _self = this;
            this.option = {
                backgroundColor: opt.bgColor,
                title: {
                    text: '青海省非物质文化遗产分布图',
                    padding: 40,
                    textStyle: {
                        color: '#fff'
                    },
                    left: 'center'
                },
                tooltip: {
                    formatter: (para) => (para.value[2])
                },
                graphic: [{
                    type: 'group',
                    left: _self.pos.left,
                    top: _self.pos.top - 4,
                    children: [{
                        type: 'line',
                        left: 0,
                        top: -15,
                        shape: {
                            x1: 0,
                            y1: 0,
                            x2: 60,
                            y2: 0
                        },
                        style: {
                            stroke: _self.style.lineColor,
                        }
                    }, {
                        type: 'line',
                        left: 0,
                        top: 15,
                        shape: {
                            x1: 0,
                            y1: 0,
                            x2: 60,
                            y2: 0
                        },
                        style: {
                            stroke: _self.style.lineColor,
                        }
                    }]
                }, {
                    id: _self.name[_self.idx],
                    type: 'group',
                    left: _self.pos.left + 2,
                    top: _self.pos.top,
                    children: [{
                        type: 'polyline',
                        left: 90,
                        top: -12,
                        shape: {
                            points: _self.line
                        },
                        style: {
                            stroke: 'transparent',
                            key: _self.name[0]
                        },
                        onclick: function () {
                            var name = this.style.key;
                            _self.resetOption(_self.state.self, _self.getOption(), name);
                        }
                    }, {
                        type: 'text',
                        left: 0,
                        top: 'middle',
                        style: {
                            text: _self.name[0] === '青海' ? '青海省' : _self.name[0],
                            textAlign: 'center',
                            fill: _self.style.textColor,
                            font: _self.style.font
                        },
                        onclick: function () {
                            _self.resetOption(_self.state.self, _self.getOption(), '青海');
                        }
                    }]
                }],
                geo: {
                    map: opt.mapName,
                    // roam: true,
                    zoom: 1,
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        emphasis: {
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: 'rgba(147, 235, 248, 1)',
                            borderWidth: 1,
                            areaColor: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 0.8,
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            },
                            shadowColor: 'rgba(128, 217, 248, 1)',
                            // shadowColor: 'rgba(255, 255, 255, 1)',
                            shadowOffsetX: -2,
                            shadowOffsetY: 2,
                            shadowBlur: 10
                        },
                        emphasis: {
                            areaColor: '#389BB7',
                            borderWidth: 0
                        }
                    },
                    regions: opt.activeArea.map(function (item) {
                        if (typeof item !== 'string') {
                            return {
                                name: item.name,
                                itemStyle: {
                                    normal: {
                                        areaColor: item.areaColor || '#389BB7'
                                    }
                                },
                                label: {
                                    normal: {
                                        show: item.showLabel,
                                        textStyle: {
                                            color: '#fff'
                                        }
                                    }
                                }
                            };
                        } else {
                            return {
                                name: item,
                                itemStyle: {
                                    normal: {
                                        borderColor: '#91e6ff',
                                        areaColor: '#389BB7'
                                    }
                                }
                            };
                        }
                    })
                },
                series: [
                    {
                        name: '遗产',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        // symbol: 'diamond',
                        showEffectOn: 'render',
                        rippleEffect: {
                            period: 15,
                            scale: 6,
                            brushType: 'fill'
                        },
                        symbolSize: 8,
                        hoverAnimation: true,
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    return levelColorMap['1'];
                                },
                                shadowBlur: 5,
                                shadowColor: '#333'
                            }
                        },
                        data: opt.data,
                    }
                ],
            };
        }
        return this.option;


    };
    render() {
        return (
            <div>
                <ReactEcharts ref={(e) => { this.echarts_react = e; }}
                    style={{ height: '100vh', width: '100%' }}
                    option={this.getOption()}
                    onEvents={this.onEvents}
                    notMerge={true}
                    lazyUpdate={true}
                    theme={"theme_name"}
                />
            </div>
        );
    }
}
export default withRouter(Location);

