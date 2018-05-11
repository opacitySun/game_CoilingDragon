var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 引入基本配置
var config = require('./webpack.config');
var devPort = 5112;

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
    inline: true,
    disableHostCheck: true
};
config.entry.app.unshift('webpack-dev-server/client?http://localhost:'+devPort+'/','webpack/hot/dev-server');
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    contentBase: config.output.path,
    publicPath: config.output.publicPath,
    hot: true,
    inline: true,
    disableHostCheck: true,
    headers:{
        'Access-Control-Allow-Origin': '*'
    }
});
server.listen(5112);