#!/usr/bin/env node
const program = require('commander')
const glob = require('glob')
const path = require('path')
const fs = require('fs')
const output = require('../lib/output')
const inquery = require('../lib/inquery')
const download = require('../lib/download')
const generator = require('../lib/generator.js')

program.usage('<project-name>').parse(process.argv)

let projectName = program.args[0]
let rootName = path.basename(process.cwd())
let next = undefined

if (!projectName) {
  next = Promise.resolve({
    name: rootName,
    root: '.'
  })
} else {
  const list = glob.sync('*')
  if (list.length) {
    let isExist = list.some(name => {
      const fileName = path.resolve(name)
      const isDir = fs.statSync(fileName).isDirectory()
      return name === projectName && isDir
    })
    if (isExist) {
      output.fail(`${projectName} existed`)
      return
    }
  } else if (rootName === projectName) {
    next = inquery(['buildInCurrent']).then(answer => {
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
}

go(next)

async function go (next) {
  try {
    let project = await next
    console.log(`gitbook init in ${project.root === '.' ? 'current' : project.name} directory`)
    let answer = await inquery([
      {
        name: 'projectName',
        meta: project.name
      },
      {
        name: 'projectDescription',
        meta: project.name
      }
    ])
    let downloadTemp = await download(project.root)
    await generator(answer, downloadTemp, project.root)
    output.success('create successfully.')
  } catch (err) {
    output.fail(err.message)
  }
}
