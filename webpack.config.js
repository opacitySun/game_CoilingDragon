// nodejs 中的path模块
var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var cssExtractor = new ExtractTextPlugin('styles/[name].[chunkhash].css');

var conf = require('./conf.json');

module.exports = {
    // 入口文件
    entry: {
        app: './src/index.js',
        main: './public/styles/main.css.js',
        commons: conf.commons
    },
    // 输出配置
    output: {
        // 输出路径是 myProject/webapp
        path: path.resolve(__dirname, 'webapp'),
        filename: '[name].[hash].js',
        chunkFilename: '[id].[chunkhash].js'
    },
    externals: {
        jquery: 'window.$'
    },
    plugins: [
        cssExtractor
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets:['es2015','react','latest']
                }
            },
            {
                test: /\.html$/,
                loaders: [
                    'html-loader'
                ]
            },
            // 加载图片
            {
                test: /\.(jpe?g|png(\*)?|gif)$/,
                loader: 'file-loader?name=images/[name].[ext]?[hash:7]'
            },
            {
                test: /\.scss$/,
                loader: cssExtractor.extract('style-loader', 'css-loader?sourceMap!sass-loader?sourceMap'),
                include: path.resolve(__dirname, 'public/styles')
            },
            {
                test: /\.css$/,
                loader: cssExtractor.extract('style-loader', 'css-loader'),
                include: path.resolve(__dirname, 'public/styles')
            },
            {
                test: /\.css$/,
                loaders: [
                    'file-loader?name=styles/[name].[ext]',
                    'extract-loader',
                    'css-loader'
                ],
                exclude: path.resolve(__dirname, 'public/styles')
            }, 
            {
                test: /\.css\.map$/,
                loader: 'file-loader?name=styles/[name].[ext]'
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            }, 
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loaders: [
                    'url-loader?mimetype=image/svg+xml',
                    'file-loader?name=fonts/[name].[ext]'
                ]
            }
        ]
    }
}