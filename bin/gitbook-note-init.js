#!/usr/bin/env node
const program = require('commander')
const glob = require('glob')
const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const logSymbols = require('log-symbols')
const download = require('./lib/download')
const generator = require('./lib/generator.js')

program.usage('<project-name>').parse(process.argv)

let projectName = program.args[0]
if (!projectName) {
  program.help()
  return
}

const list = glob.sync('*')
let rootName = path.basename(process.cwd())
let next = undefined
if (list.length) {
  let isExist = list.some(name => {
    const fileName = path.resolve(process.cwd(), path.join('.', name))
    const isDir = fs.statSync(fileName).isDirectory()
    return name === projectName && isDir
  })
  if (isExist) {
    console.log(`${projectName} existed`)
    return
  }
  next = Promise.resolve({
    name: projectName,
    root: projectName
  })
} else if (rootName === projectName) {
  next = inquirer.prompt([
    {
      name: 'buildInCurrent',
      message: 'The current directory is empty, and the directory name is same to project name.' +
      'Do you want to create a new project directly in the current directory?',
      type: 'confirm',
      default: true
    }
  ]).then(answer => {
    return Promise.resolve({
      name: projectName,
      root: answer.buildInCurrent ? '.' : projectName
    })
  })
} else {
  next = Promise.resolve({
    name: projectName,
    root: projectName
  })
}

next && go()

function go (project) {
  next.then(project => {
    if (project.root !== '.') {
      fs.mkdir(project.root)
    }
    return inquirer.prompt([
      {
        name: 'projectName',
        message: 'project name',
        default: project.name
      },
      {
        name: 'projectDescription',
        message: 'project description',
        default: `A project named ${project.name}`
      }
    ])
  }).then(answer => {
    return download(project.root).then(target => {
      return {
        ...project,
        downloadTemp: target,
        metadata: {
          ...answer
        }
      }
    })
  }).then(context => {
    return generator(context.metadata, context.downloadTemp, context.root).then(() => context)
  }).then(context => {
    console.log(logSymbols.success, chalk.green('create successfully.'))
    console.log()
    console.log(chalk.green(`cd ${context.root}\nmake install\nmake build`))
  }).catch(err => {
    console.error(logSymbols.error, chalk.red(`error: ${err.message}`))
  })
}
