const { spawn, execSync } = require('child_process');
const path = require('path');
const defaultCfg = require('@gravitational/build/webpack/webpack.dev.config');
const { extend, createHtmlPlugin } = require('./webpack.renderer.extend');
const cfg = extend(defaultCfg);
const configFactory = require('@gravitational/build/webpack/webpack.base');

cfg.devServer = {
  hot: true,
  static: {
    publicPath: '/',
    directory: path.join(__dirname, 'build/app/dist/renderer'),
    serveIndex: false,
  },
  allowedHosts: 'auto',
  server: {
    type: 'https',
  },
  onBeforeSetupMiddleware() {
    spawn('yarn', ['start-main'], {
      shell: true,
      env: process.env,
      stdio: 'inherit',
    }).on('error', spawnError => console.error(spawnError));
  },
};

cfg.output.publicPath = '';
cfg.plugins = [configFactory.plugins.reactRefresh(), createHtmlPlugin()];

module.exports = cfg;
