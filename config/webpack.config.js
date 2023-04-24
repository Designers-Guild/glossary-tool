'use strict';

const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const PATHS = require('./paths');

// Merge webpack configuration files
const config = (env, argv) =>
  merge(common, {
    entry: {
      style: PATHS.src + '/style.css',
      script: PATHS.src + '/script.js',
      main : PATHS.src + '/main.js'
    },
    devtool: argv.mode === 'production' ? false : 'source-map',
  });

module.exports = config;
