### 本地调试

```
npm test
```

### 生成生产环境代码

```
npm run build
```

### 设置环境变量
本项目使用了config包，它可以自动读取config文件夹下的与NODE_ENV相同名json文件来加载设置，比如NODE_ENV为dev时，就加载dev.json。

### 获取环境变量
在使用环境变量a时就使用以下语句
```
import { a } from 'config';
```

### 静态资源获取
静态资源存储在static_source文件夹下，可以通过文件路径访问文件
如通过
```
localhost:3000/picture/zhizi.jpeg
```
来访问picture文件夹下的zhizi.jpeg

### Redis数据库连接
通过bluebird遍历Redis包的接口，并克隆出支持promise的接口，来使接口支持koa2，调用redis函数的形式为,即在API名称后加Async
```
redisClient.hmsetAsync();
```

### 部署
```
1 /etc/nginx/sites-available  修改这下面的文件配置；软连接到/etc/nginx/sites-enabled
2 nginx -s reload
3 项目目录 /app-data/www 
4 找不到git命令，用source  /etc/profile
5 git branch
6 sudo git pull
7 运行 npm run build 将工程编译;
8 将 src 文件夹下的 config 文件复制到 pro 文件夹下;
9 将 node_modules 下的app文件夹删除，如果存在的话
10 alias pm2='/usr/local/src/node/node-v6.9.5-linux-x64/lib/node_modules/pm2/bin/pm2'
11 运行 sudo pm2 start pm2.config.json 
```