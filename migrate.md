# 关于唐卡博物馆网站的环境配置

## 概述
唐卡博物馆网站分成了以下三个工程项目，均放置在`~/Programs/`

- 主网站（web3dtest）为[Grails](https://grails.github.io/grails2-doc/2.5.0/guide/single.html#downloadingAndInstalling)项目
- 静态文件服务器（apache-tomcat）
- 算法后台（http_test），提供唐卡检索、草图绘制的后台支持

另外需要[`MySQL`](https://www.oracle.com/technetwork/database/mysql/index.html)数据库支持


## MySQL配置

安装`MySQL`的server和client，在此过程中设置root密码为`123456`

```
sudo apt install mysql-server mysql-client
```

在bash中连接`MySQL` Server，创建一个名为`feiyi_DB`的数据库，并加载`~/Programs/feiyi_db.sql`中的数据

```
mysql -u root -p
CREATE DATABASE feiyi_DB;
USE feiyi_DB;
SOURCE feiyi_db.sql
```

## 主网站（web3dtest）

### 配置运行环境：

1. 下载java（解压于 `~/Java/jdk1.8.0_181`）
2. 根据其使用的版本下载Grails（解压于 `~/Downloads/grails-2.5.0`）
3. 设置环境变量，在`~/.bashrc`中添加如下
   ```bash
   export JAVA_HOME=/home/vrlab/Java/jdk1.8.0_181
   export JRE_HOME=$JAVA_HOME/jre
   export CLASSPATH=.:$JAVA_HOME/lib:$JAVA_HOME/jre/lib:$CLASSPATH
   export GRAILS_HOME=/home/vrlab/Downloads/grails-2.5.0
   export PATH=$JAVA_HOME/bin:$JAVA_HOME/jre/bin:$GRAILS_HOME/bin:$PATH
   ```
4. ```source ~/.bashrc```

### 在项目根目录执行启动脚本

```bash
grails run-app
```

## 静态文件服务器（apache-tomcat）

### 配置运行环境
1. Java
2. 设置环境变量，在`~/.bashrc`中添加如下
   ```bash
   export CATALINA_BASE=/home/vrlab/Programs/apache-tomcat-7.0.82
   export CATALINA_HOME=/home/vrlab/Programs/apache-tomcat-7.0.82
   ```
3. ```source ~/.bashrc```

### 启动脚本

```bash
cd apache-tomcat-7.0.82/bin
./startup.sh
```
可能需要为某些脚本文件添加可执行权限```chmod +x ./bin/*.sh```


## 算法后台（http_test）

### 配置Python运行环境

1. 安装`conda`
2. 创建`conda`环境`tangkaR`
   ```bash
   conda create -n tangkaR python=3.5
   ```
3. 安装python包
   - django=1.11
   - mysqlclient=1.3
   - numpy
   - tensorflow=1.4
   - opencv

### 启动脚本

```
source activate tangkaR
python manage.py runserver 8000
```
或者
```
./startup.sh
```
