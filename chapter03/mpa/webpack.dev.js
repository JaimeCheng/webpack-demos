'use strict'

const glob = require('glob')
const path = require('path')
// const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const setMPA = () => {
  const entry = {}
  const htmlWebpackPlugins = []

  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))

  Object.keys(entryFiles).map(index => {
    const entryFile = entryFiles[index]
    const match = entryFile.match(/src\/(.*)\/index\.js/)
    const pageName = match && match[1]

    entry[pageName] = entryFile
    htmlWebpackPlugins.push(new HtmlWebpackPlugin({
      template: path.join(__dirname, `src/${pageName}/index.html`),
      filename: `${pageName}.html`,
      chunks: [pageName],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: false,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    }))
  })

  return {
    entry,
    htmlWebpackPlugins
  }
}

const { entry, htmlWebpackPlugins } = setMPA()

module.exports = {
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      {
        test: /\.css$/, use: [{
          loader: 'style-loader',
          options: {
            injectType: 'singletonStyleTag' // 所有css合成一个style标签
          }
        }, 'css-loader', 'postcss-loader'] },
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader'] },
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
  watch: false,
  watchOptions: {
    ignored: /node_modules/, // 默认为空，支持正则匹配
    aggregateTimeout: 300, // 默认300ms，监听到变化后等300ms再执行
    poll: 1000 // Check for changes every second 查询间隔时间 1000ms
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(), // 可以不用加，hot:true后会自动引用
    // new HtmlWebpackPlugin({
    //   template: path.join(__dirname, 'src/index/index.html'),
    //   filename: 'index.html',
    //   chunks: ['index'],
    //   inject: true
    // }),
    // new HtmlWebpackPlugin({
    //   template: path.join(__dirname, 'src/search/index.html'),
    //   filename: 'search.html',
    //   chunks: ['search'], // 和entry的key对应
    //   inject: true
    // })
  ].concat(htmlWebpackPlugins),
  devServer: {
    contentBase: './dist',
    hot: true
  }
}