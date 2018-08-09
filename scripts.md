# 脚本说明

## 1. scripts/convert\_video\_codecs.js

#### 功能

将/public/img/中浏览器不支持的视频文件转码，满足以下条件之一的视频文件将被转码并替换：

* 扩展名不是mp4
* 视频编码不是H264
* 音频编码不是AAC
* 视频高度高于设定阈值（代码中设置为1080px）

#### 代码流程

1. 找到`/public/img/*/*/`下的所有`mp4/flv/mts`文件
2. 分析其编码等信息
3. 跳过无需转码的视频文件，对需要转码的视频文件进行转码
4. 转码中的文件会保存到`.tmp`的中间文件中。多个文件的转码是并行的，每完成10%会打印出进度信息
5. 转码完成后，原视频文件会被删除，生成的`.tmp`文件被重命名为原视频文件名

#### 注意事项

这个脚本需要依赖[ffprobe](https://ffmpeg.org/ffprobe.html)、[handbrake](https://handbrake.fr/)两个外部可执行程序，可如下安装:

- Linux(Ubuntu)：

  ```sh
  sudo apt install ffmpeg
  sudo apt install handbrake-cli
  ```

- Windows: 

1. Download ffprobe binary, declare its location in `.env`，
   e.g. write the following line in `.env`
   ```
   FFPROBE_BINARY="d:/Softwares/ffmpeg-20180723/bin/ffprobe.exe"
   ```
2. Download handbrake binary, place the binary under `node_modules/handbrake-js/.bin/`

#### 运行脚本

```sh
node scripts/convert_video_codecs.js
```



## 2. scripts/generate\_video\_thumbnails.js

#### 功能

生成`public/img/`中MP4视频文件的缩略图（默认为640x480大小），命名格式为：视频文件名+.thumbnail.jpg

#### 注意事项

该生成的缩略图用在Detail页面的图片Gallery中
代码中仅生成了MP4视频格式的缩略图，使用前请保证视频均已转码成MP4格式

#### 运行脚本

```sh
node scripts/generate_video_thumbnails.js
```




## 3. scripts/init.mongo.js

#### 功能

根据json文件，初始化数据库。在名为`qinghai_heritage`的DB中共生成三个collection：
1. items：其中的每个Document对应一个非遗JSON文件（`json_db/*/*.json`）， 对应网站中的一个Detail页面内容。
2. catalogs：指定首页上的十个类别和其对应的封面图路径。
3. configs：指定首页上的轮播图路径等。
数据库初始化中的各项操作均为异步，代码中使用`Promise`规范的`then`方法控制数据库操作流程。


#### 注意事项

1. 由于数据量很小，为了方便操作，允许每次增加或更改了json文件都重新初始化所有的数据库。
2. 可以使用[Native Mongo Shell](https://docs.mongodb.com/manual/mongo/)操作数据，也可以使用可视化的GUI（如[Mongo Compass](https://www.mongodb.com/products/compass)，已在台式机上安装）

#### 运行脚本

```sh
node scripts/init.mongo.js
```

## 4. 使用场景：增加一个非物质文化遗产项

1. 按照设计的json模板，写好该项的json文件，放置在`json_db`下相应的文件夹中
2. 将json文件中相关的图片和视频放置在指定的路径下
3. 运行`scripts/convert_video_codecs.js`，若新增加的视频需要转码，则会执行转码并覆盖原文件；已转码过的视频不会再进行转码。
4. 运行`scripts/generate_video_thumbnails.js`，生成视频缩略图；已生成过的缩略图不会再重新生成。
5. 运行`scripts/init.mongo.js`，初始化所有的数据库。也可用其他方式更改数据库。

