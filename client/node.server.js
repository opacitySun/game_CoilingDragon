var express = require('express');
var history = require('connect-history-api-fallback');

// 创建一个express实例
var app = express();
app.use(express.static('webapp'));

//设置html5模式中间件配置
var historyMiddleware = history({
    rewrites: [
        { from: /^\/abc$/, to: '/'}
    ]
});
app.use(historyMiddleware);

// 监听5113端口，开启服务器
app.listen(5113, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:5113');
});