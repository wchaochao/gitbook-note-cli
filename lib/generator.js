/**
 * @file 编译模板
 */
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const ora = require('ora')
const rm = require('rimraf').sync

module.exports = function (metadata = {}, src, dest = '.') {
  if (!src) {
    return Promise.reject(new Error(`invalid src: ${src}`))
  }

  return new Promise((resolve, reject) => {
    const spinner = ora(`build template from ${src} to ${dest}`)
    Metalsmith(process.cmd())
      .metadata(metadata)
      .clean(false)
      .source(src)
      .destination(dest)
      .use((files, metalsmith, done) => {
        const meta = metalsmith.metadata()
        Object.keys(files).forEach(fileName => {
          const t = files[fileName].contents.toString()
          files[fileName].contents = new Buffer(Handlebars.compile(t)(meta))
        })
        done()
      }).build(err => {
        rm(src)
        if (err) {
          spinner.fail()
          reject(err)
        } else {
          spinner.succeed()
          resolve()
        }
      })
  })
}
