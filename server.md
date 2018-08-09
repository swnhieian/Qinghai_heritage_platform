# 服务器端代码

由[create-react-app](https://github.com/facebook/create-react-app)建立起的[React](https://github.com/facebook/react)开发框架自带了一个静态文件服务器（webpack-dev-server），随着`react-scripts start` 命令启动，运行在默认的3000端口。为了能够动态获取数据，需要建立一个API后端服务，为前端动态提供数据。

![servers-diagram](docs-images/server.jpg)

通过如下配置`package.json`，访问`/api/*`的url将定向至运行在3001端口的API代理服务器。

```json
  "proxy": {
    "/api/*": {
      "target": "http://localhost:3001/"
    }
  }
```

参考[create-react-app README](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#proxying-api-requests-in-development) 和 [using-create-react-app-with-a-server](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/)

该API服务器基于[Nodejs](https://nodejs.org/zh-cn/)，代码位于 `/server/server.js`，在整个网站设计中，其向下连接数据库，向上为前端提供Restful-API。共提供一下几个API：

- `/api/items` 返回所有item的列表
- `/api/catalogs`  返回所有catalogs的列表
- `/api/configs`  返回config的字典
- `/api/items/:title` 返回指定title的item，用于`Detail`页面
- `/api/catalog_groups` 返回按照category分组的item的title和thumbnail信息，用于`Catalog`页面
- `/api/locations` 返回item的地理位置信息，用于`Location`页面
- `/api/textsearch/:keyword` 返回按照指定keyword检索的item，用于`SearchResults`页面
- `/api/images?page=&perPage=` 返回所有图片的地址，按照给定参数分页，用于`Discovery`瀑布流页面。

### 前端获取数据

在前端js文件中往往有一个`loadData()`函数，会在恰当的时机使用`fetch()`方法异步调用上述代理服务器提供的API，使用`Promise`控制流程。

参考[create-react-app README]( https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#fetching-data-with-ajax-requests)
