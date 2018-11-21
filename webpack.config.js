var path = require('path') // eslint-disable-line
var webpack = require('webpack') // eslint-disable-line
var HappyPack = require('happypack') // eslint-disable-line
var ROOT_PATH = path.resolve(__dirname) // eslint-disable-line
var APP_PATH = path.resolve(ROOT_PATH, 'app') // eslint-disable-line
var BUILD_PATH = path.resolve(ROOT_PATH, 'build') // eslint-disable-line
var NODE_MODULES_PATH = path.resolve(ROOT_PATH, 'node_modules') // eslint-disable-line
var HtmlWebpackPlugin = require('html-webpack-plugin') // eslint-disable-line
var CleanWebpackPlugin = require('clean-webpack-plugin') // eslint-disable-line
var CompressionPlugin = require("compression-webpack-plugin") // eslint-disable-line
var ExtractTextPlugin = require('extract-text-webpack-plugin') // eslint-disable-line
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') // eslint-disable-line
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // eslint-disable-line

var cache = true // eslint-disable-line
var devServer = {} // eslint-disable-line
var devtool = false // eslint-disable-line
var entry = {} // eslint-disable-line
var output = {} // eslint-disable-line
var plugins = [] // eslint-disable-line

/* 如果当前环境是生产环境，就配置一些特定的插件，优化生产环境下的代码 */
if (process.env.NODE_ENV === 'production') {
  entry = {
    app: [
      /* 加入 IE 系列不支持的 Promise.prototype.finally 方法 */
      'core-js/modules/es7.promise.finally',
      path.resolve(APP_PATH, 'index.js'),
    ],
  }
  output = {
    path: BUILD_PATH,
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].chunk.js',
    publicPath: '/build/',
  }
  cache = false
  devtool = 'source-map'
  /* webpack 源代码中对 devServer 的默认值就是空对象而不是 undefined */
  devServer = {}
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
      compress: {
        /* 在 UglifyJs 删除没有用到的代码时不输出警告 */
        warnings: false,
        // 删除所有的 `console` 语句，还可以兼容 ie 浏览器
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
    /* 暂时将该插件注释，其与代码分割功能有点冲突 */
    new webpack.optimize.AggressiveMergingPlugin(),
    /* 允许错误不打断程序的执行，这在生产环境中很重要 */
    new webpack.NoEmitOnErrorsPlugin(),
    /* 引入 DLL 文件 */
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.resolve(BUILD_PATH, 'proDll', 'vendor.pro.manifest.json'),
    }),
    /* 将 CSS 代码单独抽离出来 */
    new ExtractTextPlugin({
      allChunks: true,
      filename: 'css/styles.[contentHash].css',
    }),
    /* 与 extract-text-webpack-plugin 协同工作，压缩 CSS 代码 */
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        },
      },
    }),
    /* 通过多线程的方式快速编译代码 */
    new HappyPack({
      id: 'js',
      threads: 2,
      loaders: ['babel-loader'],
    }),
    /* 每次编译生产环境代码时先将之前的文件删除掉 */
    new CleanWebpackPlugin([
      'build/build/',
      'build/js/app.*.js',
      'build/js/app.*.js.gz',
      'build/js/app.*.js.map',
      'build/js/loading.*.js',
      'build/js/loading.*.js.map',
      'build/js/*.chunk.js',
      'build/js/*.chunk.js.gz',
      'build/js/*.chunk.js.map',
      'build/css/styles.*.css',
      'build/css/styles.*.css.gz',
      'build/css/styles.*.css.map',
      'build/images/*.*',
      'build/medias/*.*',
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
      template: path.resolve(BUILD_PATH, 'index.pro.ejs'),
      filename: path.resolve(BUILD_PATH, 'index.html'),
      inject: false,
      title: '头条号',
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
  entry = {
    app: [
      'react-hot-loader/patch',
      path.resolve(APP_PATH, 'index.js'),
    ],
  }
  output = {
    /* 处于开发环境下时，所有编译生成的文件都会直接存放在内存中，路径为 /，因此无所谓的输出 */
    /* 路径 */
    path: ROOT_PATH,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
  }
  cache = true
  /* 源代码与编译后代码的匹配模式 */
  /* 前者的第一次编译速度快于后者，但后者生成的 sourceMap 能够直接定位到源代码 */
  /* 而前者只能定位到编译后的代码 */
  // devtool = 'cheap-eval-source-map'
  devtool = 'cheap-module-eval-source-map'
  devServer = {
    /* 统一设置请求的头部信息 */
    // headers: { 'X-Custom-Header': 'yes' },
    /* 设置为 true 后所有的 404 响应都将跳转到 index.html */
    historyApiFallback: true,
    host: '0.0.0.0',
    // host: '192.168.3.241',
    noInfo: false,
    port: 9000,
    /* 请求代理 */
    proxy: {
      '/api/': {
        target: 'https://qingmooc.mamasousuo.com',
        changeOrigin: true,
        secure: true,
        pathRewrite: {
          '^/api/': '/api/',
        },
      },
    },
    publicPath: '/',
  }
  plugins = [
    /* 可以在编译时期创建全局变量 */
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    /* 在组件热加载的时候显示更新的组件名而不是原本的组件 ID */
    new webpack.NamedModulesPlugin(),
    /* 引入 DLL 文件 */
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.resolve(BUILD_PATH, 'devDll', 'vendor.dev.manifest.json'),
    }),
    /* 开启作用域提升功能 */
    /* 在开发环境中开启这个功能，我自己感觉会导致与 react-hot-loader 有冲突，总是会发生一些 */
    /* 问题，所以现在只在生产环境中开启这个功能 */
    // new webpack.optimize.ModuleConcatenationPlugin(),
    /* 加入通过模板自动生成 HTML 文件功能 */
    new HtmlWebpackPlugin({
      template: path.resolve(BUILD_PATH, 'index.dev.ejs'),
      filename: path.resolve(ROOT_PATH, 'index.html'),
      inject: false,
      title: '头条号',
      minify: false,
    }),
    /* 打包 moment 本地化语言文件时，仅打包汉语的文件 */
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
    /* 以可视化的方式查看当前项目中引用的各个模块的大小 */
    // new BundleAnalyzerPlugin(),
  ]
}

module.exports = {
  context: __dirname,
  /* 入口文件 */
  entry,
  /* 出口文件 */
  output,
  /* 设置缓存是否开启，当前设置是在开发环境下缓存开启 */
  cache,
  /* 源代码与编译后代码的匹配模式 */
  devtool,
  /* 开发工具 */
  devServer,
  /* 插件 */
  plugins,
  /* 针对不同的文件类型配置不同的 loader，并设置对应的配置项 */
  module: {
    loaders: [
      /* 暂时先把 Eslint 关掉，这玩意太蛋疼了 */
      // {
      //   enforce: 'pre',
      //   test: /\.(js|jsx)$/i,
      //   loaders: ['eslint-loader'],
      //   exclude: NODE_MODULES_PATH,
      // },
      {
        test: /\.(js|jsx)$/i,
        loaders: (process.env.NODE_ENV === 'production' ? ['happypack/loader?id=js'] : ['babel-loader?cacheDirectory']), // eslint-disable-line
        exclude: NODE_MODULES_PATH,
      }, {
        test: /\.css$/i,
        /* 如果是项目文件中的 CSS 或者 SCSS 代码，则将其单独打包为一个样式文件，在页面的最开始引入 */
        loaders: (process.env.NODE_ENV === 'production' ? (
          ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader?importLoaders=1',
              'postcss-loader',
            ],
          })
        ) : (
          [
            'style-loader',
            'css-loader?importLoaders=1',
            'postcss-loader',
          ]
        )),
        include: [
          APP_PATH,
          NODE_MODULES_PATH,
        ],
      }, {
        test: /\.scss$/i,
        /* 如果是项目文件中的 CSS 或者 SCSS 代码，则将其单独打包为一个样式文件，在页面的最开始引入 */
        loaders: (process.env.NODE_ENV === 'production' ? (
          ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader?camelCase&modules&sourceMap&importLoaders=2&localIdentName=[local]-[hash:base64:5]',
              'postcss-loader',
              'sass-loader',
            ],
          })
        ) : (
          [
            'style-loader',
            'css-loader?camelCase&modules&sourceMap&importLoaders=2&localIdentName=[path][local]-[hash:base64:5]',
            'postcss-loader',
            'sass-loader',
          ]
        )),
        include: [
          APP_PATH,
          NODE_MODULES_PATH,
        ],
      }, {
        test: /\.(html)$/i,
        loader: 'file-loader?name=html/[hash].[ext]',
        exclude: NODE_MODULES_PATH,
      }, {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        loader: 'url-loader?limit=4096&name=images/[hash].[ext]',
        exclude: NODE_MODULES_PATH,
      }, {
        test: /\.(ttf|woff|woff2)$/i,
        loader: 'url-loader?limit=4096&name=fonts/[hash].[ext]',
        exclude: NODE_MODULES_PATH,
      }, {
        test: /\.(mp4|ogg|mp3)$/i,
        loader: 'file-loader?name=medias/[hash].[ext]',
        exclude: NODE_MODULES_PATH,
      },
    ],
  },
  resolve: {
    /* 可能用到的文件扩展名 */
    extensions: ['.js', '.scss', '.jsx', '.css', '.svg', 'png', 'jpg', 'html'],
    /* 文件路径别名，方便在写代码时对模块的引用 */
    alias: {
      /* 本地文件夹路径别名 */
      app: APP_PATH,
      components: path.resolve(APP_PATH, 'components'),
      containers: path.resolve(APP_PATH, 'containers'),
      reducers: path.resolve(APP_PATH, 'reducers'),
      images: path.resolve(APP_PATH, 'images'),
      utils: path.resolve(APP_PATH, 'utils'),
      /* 工具包的别名 */
      /* 引用 lodash 时改成默认引用 lodash-es，防止出现整体引入的情况出现 */
      lodash: 'lodash-es',
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
