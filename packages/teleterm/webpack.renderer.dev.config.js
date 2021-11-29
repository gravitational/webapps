const { spawn, execSync } = require('child_process');
const path = require('path');
const webpack = require('webpack');
const defaultCfg = require('@gravitational/build/webpack/webpack.dev.config');
const { extend, createHtmlPlugin } = require('./webpack.renderer.extend');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const resolvepath = require('@gravitational/build/webpack/resolvepath');
const cfg = extend(defaultCfg);

cfg.devServer = {
  hot: true,
  publicPath: '/',
  contentBase: path.join(__dirname, 'build/app/dist/renderer'),
  disableHostCheck: true,
  serveIndex: false,
  https: true,
  inline: true,

  before(args) {
    spawn('yarn', ['start-main'], {
      shell: true,
      env: process.env,
      stdio: 'inherit',
    }).on('error', spawnError => console.error(spawnError));
  },
};

cfg.output.publicPath = '';
cfg.plugins = [new webpack.HotModuleReplacementPlugin(), createHtmlPlugin()];

module.exports = cfg;
