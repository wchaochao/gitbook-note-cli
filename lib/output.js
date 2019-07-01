/**
 * @file 输出工具函数
 */
const chalk = require('chalk')
const logSymbols = require('log-symbols')

/**
 * @description 输出成功日志
 * @param {string} text - 文本
 */
function success (text) {
  console.log(logSymbols.success, chalk.green(text))
}

/**
 * @description 输出错误日志
 * @param {string} text - 文本
 */
function fail (text) {
  console.error(logSymbols.error, chalk.red(`Error: ${text}`))
}

/**
 * @description 输出错误日志，并包含帮助
 * @param {object} payload - 传入的参数
 * @param {string} payload.text - 文本
 * @param {Command} payload.program - Command对象
 * @param {function} [payload.callback] - 帮助的回调
 */
function failWithHelp ({text, program, callback}) {
  fail(text)
  console.log()
  program.help(callback)
}

module.exports = {
  success,
  fail,
  failWithHelp
}
