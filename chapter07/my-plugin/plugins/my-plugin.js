module.exports = class MyPlugin {
  constructor (options) {
    this.options = options;
  }

  apply (compiler) {
    console.log('My Plugin is executed!');
    console.log('My Plugin options: ', this.options);
  }
}