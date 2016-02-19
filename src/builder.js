var baseWebpackConfig = require('./base-webpack-config');
var pipeStore = require('./pipes');
var webpack = require('webpack');
var logger = require('./logger');
var path = require('path');

module.exports = {
  build () {
    return new Promise((resolve, reject) => {
      logger.debug('Starting build...');
      var webpackConfig = pipeStore.configureAll(baseWebpackConfig);
      logger.debug('Pipes configured.');

      webpackConfig.resolveLoader = {
        root: path.join(process.cwd(), 'node_modules')
      };

      logger.debug('Starting webpack...');
      webpack(webpackConfig, (err, comp) => {
        logger.debug('Build done.');
        if (comp.compilation.errors.length) { // TODO: better error handling
          reject(comp.compilation.errors);
        }
        else {
          resolve();
        }
      });
    });
  }
};