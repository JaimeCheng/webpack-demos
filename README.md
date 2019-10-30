## 基础篇

### 核心概念
- **Entry** 
- **Output**
- **Loaders**
- **Plugins**
- **Mode**

### 资源解析
- **ES6等**
- **CSS**
- **Less / Sass**
- **Image等** 

### 文件监听
- **watch** 

### 热更新
- **webpack-dev-server** 
- **webpack-dev-middleware**

### 文件指纹
- **Hash**
- **ChunkHash**
- **ContentHash** 

### 代码压缩
- **HTML**
- **JS**
- **CSS**

### 静态资源内联
- **HTML**
- **JS**
- **CSS**

### 多页面打包通用方案
- **glob**

### 提取公共资源
- 基础库
- 公共脚本

### Tree-Shaking
- **webpack4 prod 默认开启**

### scope hoisting
- **webpack4 prod 默认开启**

### 代码分割
- **动态 import**

### 代码规范
- **ESLint**

### 打包组件/基础库

### 打包SSR

### 构建优化
- **命令行显示**
- **异常和中断处理**


## 进阶篇

### 可维护的 webpack 构建配置包设计
- **功能模块**
- **目录结构**
- **ESLint规范**
- **测试**
- **持续集成**

### 构建速度和体积分析
- **速度分析**
- **体积分析**

### 构建速度和体积优化策略
- **高版本**
- **多进程/多实例**
- **预编译资源模块**
- **缓存**
- **缩小构建目标**
- **Scope Hoisting**
- **tree shaking：css/js**
- **图片压缩**
- **动态 Polyfill**


## 原理篇

### 启动过程
- **入口文件**
- **cli**
- **yargs**
- **args**

### Tapable
- **hooks**
- **compiler**

### 流程
[![](https://s2.ax1x.com/2019/10/30/K4Kie1.md.png)](https://imgchr.com/i/K4Kie1)

### 模块化：增强代码可读性和维护性
- **ES module**: `import largeNumber from 'large-number'; largeNumber.add('999', '1');`
- **CommonJS**: `const largeNumber = require('large-number'); largeNumber.add('999', '1');`
- **AMD**: `require(['large-number'], function (large-number) { largeNumber.add('999', '1'); });`

### AST
- **抽象语法树(Abstract Syntax Tree)**
- **[demo](https://esprima.org/demo/parse.html)**

### 打包模块机制
- **打包出来的是一个 IIFE (匿名闭包)**
- **modules 是一个数组，每一项是一个模块初始化函数**
- **__webpack_require 用来加载模块，返回 module.exports**
- **通过 WEBPACK_REQUIRE_METHOD(0) 启动程序**