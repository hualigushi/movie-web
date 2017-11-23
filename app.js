var express = require('express');//加载express模块
var path = require('path');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var morgan = require('morgan');//日志打印模块
var mongoose=require('mongoose');

var port =process.env.PORT || 3000;//设置端口，process获取全局变量和外围参数
var app = express();//获取实例并赋值给一个变量app

//连接数据库
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost/moviesdb',{useMongoClient: true});

//在pug里的路径里直接写/lib/bootstrap/dist/js/bootstrap.min.js等，
//node_modules文件夹中的bootstrap包里面的文件就会被映射，
// 因为 这个__dirname 已经是获取当前模块文件所在目录的完整绝对路径,
app.use("/lib",express.static(path.join(__dirname, 'node_modules')));
//自己写的样式存放位置
app.use(express.static(path.join(__dirname, 'public')));

app.set('views','./app/views/pages');//视图根目录
app.set('view engine','pug');//设置默认模板引擎
app.use(bodyParser.json());
//bodyparser的作用：它用于解析客户端请求的body中的内容,内部使用JSON编码处理,url编码处理以及对于文件的上传处理
app.use(bodyParser.urlencoded({ extended: true }));//将表单中的数据进行格式化
//session持久化
app.use(cookieSession({
    keys: ['imooc']
}));
//文件上传中间件
app.use(require('connect-multiparty')());

app.locals.moment=require('moment');//locals对象用于将数据传递至所渲染的模板中

//日志打印
var env = process.env.NODE_ENV;
if('development' === env){//开发环境
    app.set('showStackError',true);
    app.use(morgan(':method :url :status'));
    mongoose.set('debug',true);
}
require("./config/routes")(app);//引入路由文件，同时传入app

app.listen(port);//监听端口

console.log('immoc started on port:'+port);





