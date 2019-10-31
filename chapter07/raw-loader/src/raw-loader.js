const loaderUtils = require('loader-utils');
const path = require('path');
const fs = require('fs');

module.exports = function (source) {
  const  { name } = loaderUtils.getOptions(this);
  console.log('name:', name);

  const json = JSON.stringify(source)
    .replace('foo', 'jaime-')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

  // throw new Error('Error'); // sync loader 异常处理 方法1
  // this.callback(new Error('Error'), json); // sync loader 异常处理 方法2
  
  // return `export default ${ json }`; // sync loader 返回值 方式1
  // this.callback(null, json, 1, 3); // sync loader 返回值 方式2 可返回多个值

  // async
  const callback = this.async();
  fs.readFile(path.join(__dirname, './async.txt'), 'utf-8', (err, data) => {
    if (err) {
      callback(err, '');
    }
    callback(null, data);
  })
}