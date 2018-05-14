var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 引入基本配置
var config = require('./webpack.config');
var devPort = 5112;
var devDomain = 'www.sunbowei.com'

config.devtool = 'eval-source-map'; //生成Source Maps,这里选择eval-source-map
config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        favicon: path.resolve(__dirname, 'public/favicon.ico'),
        template: path.resolve(__dirname, 'public/index.html')
    })
);
config.devServer = {
    contentBase: config.output.path,
    publicPath: config.output.publicPath,
    hot: true,
    inline: true
};
config.entry.app.unshift('webpack-dev-server/client?http://'+devDomain+':'+devPort+'/','webpack/hot/dev-server');
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    contentBase: config.output.path,
    publicPath: config.output.publicPath,
    hot: true,
    inline: true, //默认为true, 意思是，在打包时会注入一段代码到最后的js文件中，用来监视页面的改动而自动刷新页面,当为false时，网页自动刷新的模式是iframe，也就是将模板页放在一个frame中
    // compress:true, //压缩
    // host: '123.57.50.14',
    //关闭检测授权host
    disableHostCheck: true,
    historyApiFallback: true, //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    proxy: {
        '*': 'http://'+devDomain+':'+devPort
    }
});
server.listen(devPort);