var fse = require('fs-extra') // eslint-disable-line
var glob = require('glob') // eslint-disable-line
var path = require('path') // eslint-disable-line
var hasha = require('hasha') // eslint-disable-line
var shell = require('shelljs') // eslint-disable-line
var ROOT_PATH = path.resolve(__dirname) // eslint-disable-line
var packageJson = require('./package.json') // eslint-disable-line
var BUILD_PATH = path.resolve(ROOT_PATH, 'build') // eslint-disable-line

function updateHTML(reg, filePath) {
  try {
    fse.writeFileSync('./build/index.html', fse.readFileSync('./build/index.html', { encoding: 'utf8' }).replace(reg, filePath), { encoding: 'utf8' })
  } catch (error) {
    throw error
  }
}

/* 执行相应脚本逻辑 */
(new Promise((res, rej) => {
  /* 将 Lib 文件夹下的所有文件按照类型分别复制到 build 下对应的文件夹中 */
  glob('./lib/*/*.*', (error1, files) => {
    if (error1) {
      rej(error1)
    } else {
      files.forEach((file) => {
        try {
          /* 读取文件并计算其 MD5 值 */
          const contentHash = hasha.fromFileSync(file, { algorithm: 'md5' })
          /* 将文件的 MD5 值作为文件名的一部分 */
          const filePath = file.replace(/\.\/lib\//i, './build/').replace(/(\.\w+)$/i, `.${contentHash}$1`)

          /* 更新 HTML 文件中对应的文件引用方式 */
          if (file.endsWith('/js/loading.js')) {
            updateHTML(/{{ loading.js }}/i, filePath.slice(1)) // 使用 slice 的原因是去掉开头的 . 符号
          } else if (file.endsWith('/images/logo.png')) {
            updateHTML(/{{ logo.png }}/i, filePath.slice(1)) // 使用 slice 的原因是去掉开头的 . 符号
          }

          /* 复制文件到 build 文件夹下 */
          fse.copySync(file, filePath)
        } catch (error2) {
          rej(error2)
        }
      })
      res()
    }
  })
})).then(() => new Promise((res, rej) => {
  /* 确保删除 build/build 文件夹 */
  fse.removeSync('./build/build')

  glob('./build/**/*', (error1, files) => {
    if (error1) {
      rej(error1)
    } else {
      /* 将除了 HTML 文件和 HTML 模板之外的其他文件复制到 build/build 文件夹下 */
      files.forEach((file) => {
        if (
          file !== './build/index.html' &&
          file !== './build/index.ejs'
        ) {
          const filePath = path.join(BUILD_PATH, file)
          try {
            fse.copySync(file, filePath)
          } catch (error2) {
            rej(error2)
          }
        }
      })
      res()
    }
  })
})).then(() => new Promise((res, rej) => {
  /* 提示复制成功信息 */
  shell.echo('成功复制所有文件到 build 文件夹下.')

  /* 执行提交更新与推送操作 */
  if (!shell.which('git')) {
    rej(new Error('您当前的运行环境中缺少 Git'))
  } else if (!shell.exec(`git add . && git commit -m '发布 ${packageJson.version} 版本' && git tag '${packageJson.version}'`).code) {
    if (!shell.exec('git push --tag origin').code) {
      shell.echo('成功发布版本')
      res()
    } else {
      rej(new Error('推送版本失败'))
    }
  } else {
    rej(new Error('提交改动文件失败'))
  }
})).catch((error) => {
  throw error
})
