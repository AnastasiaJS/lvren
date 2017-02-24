var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require('express-session');//是否登录

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();


// 设置跨域访问，方便开发
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); //*代表可访问的地址，可以设置指定域名
  res.header('Access-Control-Allow-Methods:POST,GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));//放模板文件的目录
// 创建自己的模板引擎，HTML为文件后缀，ejs引擎
app.engine('.html',require('ejs').__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//网站logo======
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'jack', key: 'jack_key',cookie: {maxAge: 12000000 }}));//session有效时间20分钟


app.use('/', index);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  // render the error page
  res.status(err.status || 500);
  res.render('error',{error:err});//将相应的错误信息发送给错误页面
});

module.exports = app;
