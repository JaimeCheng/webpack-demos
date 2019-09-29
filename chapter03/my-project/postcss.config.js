module.exports = {
  'plugins': {
    // to edit target browsers: use "browserslist" field in package.json
    'autoprefixer': {},
    'postcss-px2rem-exclude': {
      'remUnit': 75,
      'exclude': 'search.less' // ignore
    }
  }
}