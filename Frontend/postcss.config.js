var plugins = [  // eslint-disable-line
  require('autoprefixer')({  // eslint-disable-line
    browsers: [
      'last 4 years',
    ],
  }),
  /* 先把 Stylelint 关掉，因为提示的警告太多了……有时间再慢慢修改 */
  // require('stylelint')(),  // eslint-disable-line
]

/* 已经使用 optimize-css-assets-webpack-plugin 进行 CSS 代码的压缩工作 */
// if (process.env.NODE_ENV === 'production') {
//   plugins.push(
//     require('cssnano')({  // eslint-disable-line
//       preset: 'default',
//     })  // eslint-disable-line
//   )
// }

module.exports = {
  plugins: plugins,  // eslint-disable-line
}
