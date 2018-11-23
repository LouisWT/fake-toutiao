var path = require('path') // eslint-disable-line
var webpack = require('webpack') // eslint-disable-line
var ROOT_PATH = path.resolve(__dirname) // eslint-disable-line
var APP_PATH = path.resolve(ROOT_PATH, 'app') // eslint-disable-line
var BUILD_PATH = path.resolve(ROOT_PATH, 'build') // eslint-disable-line
var NODE_MODULES_PATH = path.resolve(ROOT_PATH, 'node_modules') // eslint-disable-line
var HtmlWebpackPlugin = require('html-webpack-plugin') // eslint-disable-line
var CleanWebpackPlugin = require('clean-webpack-plugin') // eslint-disable-line
var CompressionPlugin = require("compression-webpack-plugin") // eslint-disable-line
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // eslint-disable-line

var cache = true // eslint-disable-line
var output = undefined // eslint-disable-line
var devtool = false // eslint-disable-line
var plugins = undefined // eslint-disable-line

if (process.env.NODE_ENV === 'production') {
  output = {
    path: path.resolve(BUILD_PATH, 'proDll'),
    filename: '[name].[chunkhash].pro.dll.js',
    library: '[name]_library',
    publicPath: '/build/proDll/',
  }
  cache = false
  devtool = 'source-map'
  plugins = [
    /* 可以在编译时期创建全局变量 */
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    /* 压缩 JS 文件， */
    new webpack.optimize.UglifyJsPlugin({
      /* 最紧凑的输出 */
      beautify: false,
      /* 删除所有的注释 */
      comments: false,
      /* 已经压缩过的文件不再次进行压缩 */
      exclude: /\.min\.js$/,
      /* 其他压缩选项 */
      compress: {
        /* 消除产生警告的代码，此类代码多来自于引用的模块内部 */
        warnings: false,
        // 删除所有的 console 语句，还可以兼容 IE 浏览器
        drop_console: true,
        /* 内嵌定义了但是只用到一次的变量 */
        collapse_vars: true,
        /* 提取出出现多次但是没有定义成变量去引用的静态值 */
        reduce_vars: true,
      },
      /* 去除注释 */
      output: {
        comments: false
      },
      /* 编译生产环境代码时生成 sourceMap 以便在生产环境下能够快速定位问题 */
      sourceMap: true
    }),
    /* 尽量合并代码 */
    new webpack.optimize.AggressiveMergingPlugin(),
    /* 允许错误不打断程序的执行，这在生产环境中很重要 */
    new webpack.NoEmitOnErrorsPlugin(),
    /* 打包公共代码库为一个 DLL 文件 */
    new webpack.DllPlugin({
      path: path.resolve(BUILD_PATH, 'proDll/[name].pro.manifest.json'),
      name: '[name]_library',
      context: __dirname,
    }),
    /* 每次编译生产环境代码时先将之前的文件删除掉 */
    new CleanWebpackPlugin([
      'build/proDll/vendor.*.pro.dll.js',
      'build/proDll/vendor.*.pro.dll.js.gz',
      'build/proDll/vendor.*.pro.dll.js.map',
      'build/proDll/vendor.pro.manifest.json',
    ], {
      /* 将删除操作产生的信息打印到控制台上 */
      verbose: true,
      /* 如果设置为 true，则仅仅显示符合删除条件的文件列表，也就是说哪些文件将要被删除，但 */
      /* 实际上不会执行删除操作 */
      dry: false,
    }),
    /* 开启作用域提升功能 */
    new webpack.optimize.ModuleConcatenationPlugin(),
    /* 加入通过模板自动生成 HTML 文件功能 */
    new HtmlWebpackPlugin({
      template: path.resolve(APP_PATH, 'utils/apptemplate.pro.ejs'),
      filename: path.resolve(BUILD_PATH, 'index.pro.ejs'),
      inject: false,
      title: '伪头条',
      minify: false,
    }),
    /* 打包 moment 本地化语言文件时，仅打包汉语的文件 */
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
    /* 生成对应文件的 GZIP 压缩文件 */
    new CompressionPlugin({
      algorithm: 'gzip',
      asset: '[path].gz[query]',
      test: /\.js$|\.css$/,
      threshold: 10240,
    }),
    /* 以可视化的方式查看当前项目中引用的各个模块的大小 */
    // new BundleAnalyzerPlugin(),
  ]
} else {
  output = {
    path: path.resolve(BUILD_PATH, 'devDll'),
    filename: '[name].[chunkhash].dev.dll.js',
    library: '[name]_library',
    publicPath: '/build/devDll/',
  }
  cache = true
  devtool = 'cheap-module-eval-source-map'
  plugins = [
    /* 可以在编译时期创建全局变量 */
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    /* 打包公共代码库为一个 DLL 文件 */
    new webpack.DllPlugin({
      path: path.resolve(BUILD_PATH, 'devDll/[name].dev.manifest.json'),
      name: '[name]_library',
      context: __dirname,
    }),
    /* 每次编译生产环境代码时先将之前的文件删除掉 */
    new CleanWebpackPlugin([
      'build/devDll/vendor.*.dev.dll.js',
      'build/devDll/vendor.*.dev.dll.js.gz',
      'build/devDll/vendor.*.dev.dll.js.map',
      'build/devDll/vendor.dev.manifest.json',
    ], {
      /* 将删除操作产生的信息打印到控制台上 */
      verbose: true,
      /* 如果设置为 true，则仅仅显示符合删除条件的文件列表，也就是说哪些文件将要被删除，但 */
      /* 实际上不会执行删除操作 */
      dry: false,
    }),
    /* 开启作用域提升功能 */
    /* 在开发环境中开启这个功能，我自己感觉会导致与 react-hot-loader 有冲突，总是会发生一些 */
    /* 问题，所以现在只在生产环境中开启这个功能 */
    // new webpack.optimize.ModuleConcatenationPlugin(),
    /* 加入通过模板自动生成 HTML 文件功能 */
    new HtmlWebpackPlugin({
      template: path.resolve(APP_PATH, 'utils/apptemplate.dev.ejs'),
      filename: path.resolve(BUILD_PATH, 'index.dev.ejs'),
      inject: false,
      title: '伪头条',
      minify: false,
    }),
    /* 打包 moment 本地化语言文件时，仅打包汉语的文件 */
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
    /* 禁止打包匹配文件 */
    new webpack.IgnorePlugin(/^\.\/cjs\/react\.production\.min\.js$/, /react$/),
    new webpack.IgnorePlugin(/^\.\/cjs\/react-dom\.production\.min\.js$/, /react-dom$/),
    /* 生成对应文件的 GZIP 压缩文件 */
    new CompressionPlugin({
      algorithm: 'gzip',
      asset: '[path].gz[query]',
      test: /\.js$|\.css$/,
      threshold: 10240,
    }),
    /* 以可视化的方式查看当前项目中引用的各个模块的大小 */
    // new BundleAnalyzerPlugin(),
  ]
}

const vendors = [
  'axios',
  'copy-to-clipboard',
  /* 没有全部引用，因此只在开发环境下才放到 DLL 文件中 */
  /* immutable 没有使用 ES6 编写，每次使用只能将整个工具库全部引用进来 */
  'immutable',
  /* 不需要将 jquery 整个打包到 DLL 文件中 */
  // 'jquery',
  /* lodash-es 可以通过 lodash-webpack-plugin 这款插件实现精确引用，防止将整个 lodash-es */
  /* 全部打包到最后的文件中 */
  // 'lodash-es',
  'material-ui',
  'md5',
  // 'mockjs',
  'moment',
  'normalizr',
  'pubsub-js',
  'qrcode',
  'react',
  /* 实现拖拽效果的两个库，在目前的项目中可以暂时不使用 */
  // 'react-dnd',
  // 'react-dnd-html5-backend',
  'react-dom',
  'react-dropzone',
  /* 莫名其妙地，将这两个包添加到 DLL 中热替换就失败了 */
  // 'react-hot-loader',
  'react-image-crop',
  'react-immutable-proptypes',
  'react-imported-component',
  'react-redux',
  // 'react-router-dom',
  // 'react-transition-group-v2',
  'reduce-reducers',
  'redux',
  'redux-actions',
  /* 必须要引用对应的 immutable 类型代码，因为应用中使用的就是 redux-form 提供的 immutable */
  /* 接口 */
  'redux-form/immutable',
  /* 没有全部引用，因此只在开发环境下才放到 DLL 文件中 */
  'redux-immutable',
  'redux-persist-immutable',
  'redux-promise',
  'regenerator-runtime',
  /* 没有全部引用，因此只在开发环境下才放到 DLL 文件中 */
  'reselect',
  'viewerjs',

]

/* 在代码中没有全部引用的工具库全部按需引用，只在开发环境下将其放入 DLL 文件中 */
if (process.env.NODE_ENV !== 'production') {
  vendors.push('jquery')
  vendors.push('mockjs')
  vendors.push('prop-types')
  vendors.push('redux-logger')
}

module.exports = {
  context: __dirname,
  entry: {
    vendor: vendors,
  },
  output,
  devtool,
  plugins,
  resolve: {
    alias: {
      /* 很蛋疼的事，moment 已经通过 ES6 重写，但是却使用了一个 webpack 暂时不支持的动态 */
      /* 引用，导致每次编译的时候都会产生动态引用的警告，只好继续使用 ES5 版本 */
      moment: path.resolve(NODE_MODULES_PATH, 'moment', 'moment'),
    },
    /* 设置工具库解析的优先级 */
    mainFields: ['browser', 'module', 'main'],
    /* 直接写明 node_modules 的全路径，简化路径查找过程 */
    modules: [NODE_MODULES_PATH],
  },
}
