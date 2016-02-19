var exec = require('child_process').exec;
var pipesStore = require('../pipes');

module.exports = {
  definition: 'install <package>',
  action: function(package) {
    process.chdir('.pipeline');
    console.log('Installing package... ' + package);
    exec('npm install ' + package); // TODO: handle output
    pipesStore.add(package);
  }
};