'use strict'

const glob = require('glob')
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const TerserPlugin = require('terser-webpack-plugin')

const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

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
      chunks: ['vendors', pageName],
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

module.exports = smp.wrap({
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js'
  },
  module: {
    rules: [
      { 
        test: /\.js$/, 
        include: path.resolve('src'),
        use: [{
          loader: 'thread-loader',
          options: {
            worker: 3
          }
        },'babel-loader?cacheDirectory=true'] 
      },
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
  mode: 'production', // none：关闭tree-shaking prod默认开启
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, 'build/library'),
      manifest: require('./build/library/library.json')
    }),
    new HardSourceWebpackPlugin()
    // new BundleAnalyzerPlugin() // 体积分析
    // new HTMLInlineCSSWebpackPlugin() // 和style-loader同作用内联css，区别在于打包后直接就把css插入到了<head><style></head>
  ].concat(htmlWebpackPlugins), // htmlWebpackPlugins要在HtmlWebpackExternalsPlugin之前
  optimization: {
    // splitChunks: {
    //   cacheGroups: {
    //     commons: {
    //       test: /(react|react-dom)/,
    //       name: 'vendors',
    //       chunks: 'all'
    //     }
    //   }
    // }, // 只提取基础库
    splitChunks: { // 所有公共文件 基础库 公共脚本
      minSize: 0, // bytes
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2
        } 
      }
    }
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: true
      })
    ]
  },
  resolve: {
    alias: {
      'react': path.resolve(__dirname, './node_modules/react/umd/react.production.min.js'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom/umd/react-dom.production.min.js')
    },
    extensions: ['.js'],
    mainFields: ['main']
  },
  stats: 'errors-only'
})