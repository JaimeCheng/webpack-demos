const { runLoaders } = require('loader-runner');
const path = require('path');
const fs = require('fs');

runLoaders({
  resource: path.join(__dirname, './src/demo.txt'),
  loaders: [
    path.join(__dirname, './src/raw-loader.js')
  ],
  context: {
    minimize: true
  },
  readResource: fs.readFile.bind(fs)
}, (err, res) => {
  err ? console.log(err) : console.log(res);
})