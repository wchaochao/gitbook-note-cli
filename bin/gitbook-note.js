#!/usr/bin/env node
const program = require('commander')

program.version('1.0.0')
  .usage('<command> <project-name>')
  .command('init', 'init gitbook note')
  .parse(process.argv)
