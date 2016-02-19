var builder = require('../builder');
var exec = require('child_process').exec;

module.exports = {
  definition: 'run',
  action: () => {
    process.chdir('.pipeline');

    builder.build()
      .then(() => {
        var child = exec('node dist/bundle.js');
        child.stdout.pipe(process.stdout);
        child.stderr.pipe(process.stderr);
      });
  }
};