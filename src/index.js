#!/usr/bin/env node

var program = require('commander');
var version = require('../package.json').version;
var commands = require('./commands');

var baseProgram = program.version(version);
applyCommands(baseProgram, commands);

// TODO: improve this
baseProgram
  .command('*')
  .action(function(command) {
    console.log('unknown command ' + command); // TODO: improve logging
  });

baseProgram.parse(process.argv);

function applyCommands(program, commands) {
  commands.forEach(function (command) {
    program
      .command(command.definition)
      .action(command.action);
  });
}