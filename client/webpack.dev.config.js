var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
// 引入基本配置
var config = require('./webpack.config');

config.plugins.push(
    new CleanWebpackPlugin(['webapp']),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"dev"'
        }
    }),
    // 压缩代码
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: true
        }
    }),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        favicon: path.resolve(__dirname, 'public/favicon.ico'),
        template: path.resolve(__dirname, 'public/index.html'),
        inject: true,
        hash: true,
        cache: false,
        showErrors: true,
        minify:{    //压缩HTML文件
            removeComments:false,    //移除HTML中的注释
            collapseWhitespace:false    //删除空白符与换行符
        }
    })
);

module.exports = config;