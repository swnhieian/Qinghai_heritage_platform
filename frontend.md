# 网站前端架构

## 简介
本项目前端代码所使用的框架为[reactjs](https://reactjs.org/),基础代码通过[create react app](https://github.com/facebook/create-react-app)生成。样式代码使用[Sass](https://sass-lang.com/)预处理器（scss格式）编译生成css文件。

## 目录结构
项目中相关的文件夹及文件功能概述如下：
```
.
├── package-lock.json    npm生成文件，包含了安装的nodejs包的信息
├── package.json    npm生成文件，包含了安装的nodejs包的信息
├── dist    脚本根据scss自动生成的css文件
├── public    公共资源文件
│   ├── favicon.ico    网站收藏夹图标（小）
│   ├── img    图片文件夹
│   ├── index.html    基础html文件
│   ├── manifest.json    元信息
│   ├── map    青海省地图文件
└── src
    ├── *.js    各页面的js文件，包含生成页面html的代码和部分逻辑控制代码
    ├── base
    │   ├── _*.scss    各模块的scss代码
    ├── index.js
    ├── index.scss
    └── style.scss    引入base中的各scss最后生成css文件
```

## 文件功能说明

### src/index.js
整体页面的入口，在index.html中id为root的div中渲染`App`组件，是Reactjs使用时固定的内容，无需修改。
### src/App.js
定义了App组件，是所有页面的基本结构：上面一个顶层菜单栏（`TopBar`组件），中间页面部分（`page-content`类型的div）根据url的不同替换不同的内容（使用`react-router`组件），下面是Footer部分。

React-router中使用switch功能根据url的不同进入不同的页面：
+ / 主页
+ /catalog 资源库页面
+ /detail/:title 资源详情页面，title表示了资源名称（id）
+ /search 搜索结果页面，会将搜索的词以?word=xxx的形式传递
+ /discovery 发现页面，会取资源中的图片并以无限滚动的瀑布流的v形式展现出来
+ /location 地图页面，将所有资源的位置以坐标点的形式可视化展示在青海省地图上
+ /about 3D页面，用于展示stl格式的模型

### src/TopBar.js
定义了顶部菜单栏各功能的链接及搜索框的处理，如修改App.js中内容的url，需要同步修改此处链接的url。
### src/Home.js
定义了主页组件的内容，从上至下依次包含：
+ 一个图片轮播组件： 定义在src/CarouselSlides.js文件中，从json_db/configs.json中读取图片配置
+ 10大类文化遗产的快捷入口： 如果ip改变需要修改链接的url
+ 唐卡图像数字博物馆的入口： 如果ip改变需要修改链接的url
+ 联系我们部分内容：可根据实际情况调整或修改内容与样式
### src/Catalog.js
定义了资源库组件的内容。该页面左侧边栏为十大类资源的分类（`Sidebar`组件），右面为各分类下的资源列表（`ContentPane`组件），点击时的滚动以及滚动监听由`react-scroll`插件实现。

分类的获取以及资源内容的获取均由数据库中得到，通过loadData函数调用后端提供的api提到。
### src/Detail.js
资源详情页组件的实现，通过loadData函数调用后端api获取资源数据，通过循环方式依次展示每一项。
页面中的图片gallery定义在src/MultimediaGallery.js中，使用了`react-image-gallery`组件，可以根据传入的图片、视频等数据展示。
### src/SearchResults.js
搜索结果页面组件的实现，该页面构造函数中通过本页面的url（/search?word=keyword）解析出键词keyword，然后调用后端api获取搜索结果，然后将搜索结果分页，并展示到页面上。
每一页的结果数可以在构造函数中`numPerPage`变量修改。
### src/Discovery.js
发现页面组件的实现，该页面获取了资源中所有的图片，并通过瀑布流+滚动无限lazyload的方式展示出来。
滚动lazyload功能通过插件`react-infinite-scroller`实现,每次通过fetchNextImages函数获取新的图片，以及更新是否存在更多的图片的状态。
瀑布流功能通过`Masnory`组件实现，该组件在页面尺寸变化时重新计算图片一共有几列，然后将所有图片按列数排列到每一列对应的数组里，然后将数组展开到对应的html元素。
### src/Location.js
定义了地图组件的内容，地图的绘制通过百度[echarts](http://echarts.baidu.com)实现，并通过echarts-for-react插件完成该地图在Reactjs中的整合。
该组件通过调用后端api获取各资源在地图上的经纬度坐标，并通过echarts中的'effectScatter'类型图画出来，具体配置项可参考官方[文档](http://echarts.baidu.com/option.html#title)。
### src/About.js
是一个单独的页面，该页面使用`react-stl-viewer`插件（内部实现使用了`three.js`及其对应的stl loader和orbit control）完成了stl格式的3D模型的展示与操控，模型的位置信息等可以在组件的属性里进行设置。该页面还提供了两个按钮控制模型的自动旋转与停止，每次点击后需要调用rerender函数刷新整个组件才可生效。
### src/404.js
404页面的实现，简单的信息展示。
