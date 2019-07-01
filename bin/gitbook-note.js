#!/usr/bin/env node
const program = require('commander')
const output = require('../lib/output')

program.version('1.0.0')
  .usage('<command> <project-name>')
  .command('init', 'init gitbook note')
  .parse(process.argv)

let command = program.args[0]
if (['init'].includes(command)) {
  console.log(`execute ${command} command`)
} else {
  output.failWithHelp({
    text: 'invalid command.',
    program
  })
}
