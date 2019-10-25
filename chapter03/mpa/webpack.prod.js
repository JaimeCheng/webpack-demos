'use strict'

const glob = require('glob')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

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
    new CleanWebpackPlugin(),
    // new HTMLInlineCSSWebpackPlugin() // 和style-loader同作用内联css，区别在于打包后直接就把css插入到了<head><style></head>
  ].concat(htmlWebpackPlugins, new HtmlWebpackExternalsPlugin({
    externals: [
      {
        module: 'react',
        entry: 'https://11.url.cn/now/lib/15.1.0/react-with-addons.min.js',
        global: 'React',
      },
      {
        module: 'react-dom',
        entry: 'https://11.url.cn/now/lib/15.1.0/react-dom.min.js',
        global: 'ReactDOM',
      }
    ]
  })) // htmlWebpackPlugins要在HtmlWebpackExternalsPlugin之前
}