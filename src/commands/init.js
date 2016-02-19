var fs = require('fs');

var CONFIGURATION_FOLDER = '.pipeline';

module.exports = {
  definition: 'init',
  action: function() {
    createConfigurationFolder();
    createWebpackConfiguration();
  }
};

function createConfigurationFolder() {
  fs.mkdirSync(CONFIGURATION_FOLDER);
}

function createWebpackConfiguration() {

}