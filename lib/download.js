/**
 * @file 下载模板到临时文件夹
 */
const download = require('download-git-repo')
const ora = require('ora')
const path = require('path')

module.exports = function (target) {
  target = path.join(target || '.', '.download-temp')
  return new Promise((resolve, reject) => {
    let url = 'github:wchaochao/gitbook-note-template#master'
    const spinner = ora(`download template: ${url}`)
    spinner.start()
    download(url, target, {
      clone: true
    }, err => {
      if (err) {
        spinner.fail()
        reject(err)
      } else {
        spinner.succeed()
        resolve(target)
      }
    })
  })
}
