var fs = require('fs');
var relative = require('require-relative');

module.exports = {
  add: function (pipe) {
    fs.appendFileSync('pipes', '\n' + pipe);
  },

  get: function () {
    return fs.readFileSync('pipes', 'utf8').split('\n');
  },

  configureAll: function (webpackConfig) {
    var pipes = this.get();

    pipes.forEach(function (pipe) {
      var pipeDefinition = relative(pipe, process.cwd());
      webpackConfig.resolve.extensions =
        webpackConfig.resolve.extensions.concat(pipeDefinition.extensions);
      webpackConfig.module.loaders.push(pipeDefinition.loader);
    });

    return webpackConfig;
  }
};