'use strict'

const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    index: './src/index.js',
    search: './src/search.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      // { test: /\.(png|jpg|gif|jpeg)$/, use: 'file-loader' },
      { test: /\.(png|jpg|gif|jpeg)$/, use: [{
        loader: 'url-loader',
        options: {
          limit: 10240
        } // 小于10k的直接转换成base64，urk-loader基于filr-loader
      }] }
    ]
  },
  mode: 'development',
  watch: true,
  watchOptions: {
    ignored: /node_modules/, // 默认为空，支持正则匹配
    aggregateTimeout: 300, // 默认300ms，监听到变化后等300ms再执行
    poll: 1000 // Check for changes every second 查询间隔时间 1000ms
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin() // 可以不用加，hot:true后会自动引用
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
}