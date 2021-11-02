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
  disableHostCheck: true,
  serveIndex: false,
  https: true,
  inline: true,
  before() {
    const childProcess = spawn(
      'yarn',
      ['start-main'], // ['start-electron', '--inspect-brk=5858  --remote-debugging-port=9223'],
      {
        detached: true, // detaching the process will allow restarting electron without terminating the dev server
        shell: true,
        env: process.env,
        stdio: 'inherit',
      }
    ).on('error', spawnError => console.error(spawnError));
    childProcess.unref();
  },
};

cfg.output.publicPath = '/';
cfg.plugins = [new webpack.HotModuleReplacementPlugin(), createHtmlPlugin()];

module.exports = cfg;
