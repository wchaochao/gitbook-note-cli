/**
 * @file inquirer封装
 */
const inquirer = require('inquirer')
const output = require('./output')

/**
 * @description 问题配置
 */
const inqueryConfig = {
  buildInCurrent: {
    name: 'buildInCurrent',
    message: 'The current directory is empty, and the directory name is same to project name.' +
    'Do you want to create a new project directly in the current directory?',
    type: 'confirm',
    default: true
  },
  projectName (name) {
    return {
      name: 'projectName',
      message: 'project name',
      default: name
    }
  },
  projectDescription (name) {
    return {
      name: 'projectDescription',
      message: 'project description',
      default: `A project named ${name}`
    }
  }
}

/**
 * @description 命令交互
 * @param {Array} questions - 问题
 * @returns {Promise<object>} - 答案Promise
 */
async function inquery (questions) {
  let arr = []
  questions.forEach(question => {
    let item
    if (typeof question === 'string') {
      item = inqueryConfig[question]
    }
    if (Object.prototype.toString.call(question) === '[object Object]') {
      item = inqueryConfig[question.name](question.meta)
    }
    if (item) {
      arr.push(item)
    } else {
      output.fail(`inqueryConfig response to ${question.name || question} does not exist`)
    }
  })
  return inquirer.prompt(arr)
}

module.exports = inquery
