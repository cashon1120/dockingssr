### 安装
npm install 

### 开发环境运行
npm run dev

### 打包(服务器上操作)
npm run build

### 生产环境(服务器上操作)
npm run prd

### 修改流程
首先, 确实不应该在服务器上进行打包操作, 但因也水平有限, 暂时没能解决, 所以按下面的开发流程走, 哈哈!   
1: 先在本地开发环境调试好后, 上传代码到服务器(目录是: /www/wwwroot/dockingtech.ssr);
2: 进入服务器目录(/www/wwwroot/dockingtech.ssr);  
3: 运行 pm2 stop all, 这个命令会停掉服务, 网站暂时打不开;  
4: 运行 npm run build;   
5: 运行 npm run prd;   
6: 打开网站看正常不;  

### 主要文件目录
├── components       公用组件, 如头部, 底部   
├── config.js        接口地址和端口配置   
├── language         语言配置   
├── pages            页面, 像修改百度代码之类的在 _document.js 里操作   
├── public           图片和一些公共文件   
├── style.scss       样式文件   
└── utils            工具   

