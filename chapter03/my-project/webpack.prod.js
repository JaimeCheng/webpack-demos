'use strict'

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default

module.exports = {
  entry: {
    index: './src/index.js',
    search: './src/search.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js'
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      {
        test: /\.css$/, use: [{
          loader: 'style-loader',
          options: {
            injectType: 'styleTag' // 这个和MiniCssExtractPlugin冲突作用 css-loader 将css转换成commonjs对象，然后css代码就在js里面了。style-loader的作用是在js执行时，动态的创建style标签，然后将 css-loader 转换的样式插入到这个style标签里去的。
            // injectType: 'singletonStyleTag' // https://www.npmjs.com/package/style-loader
          }
        },
        'css-loader', 'postcss-loader'] },
      {
        test: /\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', {
        loader: 'postcss-loader',
        // options: {
        //   plugins: () => [
        //     require('autoprefixer')({
        //       // overrideBrowserslist: ['last 2 version', '>1%', 'ios 7'] // 或在package.json设置 ‘browserslist’
        //     }) 
        //   ]
        // } // 或者直接根目录写postcss.config.js
      }] },
      // { test: /\.(png|jpg|gif|jpeg)$/, use: 'file-loader' },
      { test: /\.(png|jpg|gif|jpeg)$/, use: [{
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: '[name]_[hash:8].[ext]'
        } // 小于10k的直接转换成base64，urk-loader基于filr-loader
      }] }
    ]
  },
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      filename: 'index.html',
      chunks: ['index'],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: false,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/search.html'),
      filename: 'search.html',
      chunks: ['search'],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: false,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    }),
    new CleanWebpackPlugin(),
    // new HTMLInlineCSSWebpackPlugin() // 和style-loader同作用内联css，区别在于打包后直接就把css插入到了<head><style></head>
  ]
}