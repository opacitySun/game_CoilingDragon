var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    ejs = require('ejs'),
    expressSession = require('express-session'),
    redisStore = require('connect-redis')(expressSession),
    partials = require('express-partials'),
    nodexcn = require('nodexcn'),
    ueditor = require("ueditor");

var routes = require('./routes/index'),
    users = require('./routes/users');

var routesController = require('./server/controller/routesController'),
    toolsController = require('./server/controller/toolsController');

var app = express();

// view engine setup
app.set('views', __dirname + '/views');
app.engine('.html',ejs.__express);
app.set('view engine', 'html');
app.use(partials());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({
  cookie: {maxAge:1000 * 60 * 30}, //半小时后session和相应的cookie失效过期
  resave: false, //是指每次请求都重新设置session cookie
  saveUninitialized: false, //是指无论有没有session cookie，每次请求都设置个session cookie，默认给个标示为connect.sid
  secret: 'sunMusic '+toolsController.GetRandomString(10)
}));
app.use(express.static(path.join(__dirname, 'public')));

//操作ueditor的图片上传功能
app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function(req, res, next) {
  // ueditor 客户发起上传图片请求
  if(req.query.action === 'uploadimage'){
    // 这里你可以获得上传图片的信息
    var foo = req.ueditor;
    console.log(foo.filename); // exp.png
    console.log(foo.encoding); // 7bit
    console.log(foo.mimetype); // image/png
    // 下面填写你要把图片保存到的路径 （ 以 path.join(__dirname, 'public') 作为根路径）
    var img_url = '/files/';
    res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
  }
  //客户端发起图片列表请求
  else if (req.query.action === 'listimage'){
    var dir_url = '/files/'; // 要展示给客户端的文件夹路径
    res.ue_list(dir_url) // 客户端会列出 dir_url 目录下的所有图片
  }
  // 客户端发起其它请求
  else {
    res.setHeader('Content-Type', 'application/json');
    // 这里填写 ueditor.config.json 这个文件的路径
    res.redirect('/ueditor/ueditor.config.json');
}}));

//将express与控制器相关联来达到路由的目的
routesController(app);

app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200); /*让options请求快速返回*/
  }
  else {
    next();
  }
});

app.use(function(req,res,next){
  if (!req.session.username) {
    if(req.url == "/login"){
      next(); //如果请求的地址是登录则通过，进行下一个请求
    }else{
      res.redirect('/login');
    }
  }else if(req.session.username) {
    next();
  }
}, routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
