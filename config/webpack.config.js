'use strict';

const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const PATHS = require('./paths');

// Merge webpack configuration files
const config = (env, argv) =>
  merge(common, {
    entry: {
      script: PATHS.src + '/script.js',
      main : PATHS.src + '/main.js',
      popup : PATHS.src + '/popup.js'
    },
    devtool: argv.mode === 'production' ? false : 'source-map',
  });

module.exports = config;
