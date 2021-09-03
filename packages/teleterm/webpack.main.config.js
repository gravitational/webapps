const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const resolvepath = require('@gravitational/build/webpack/resolvepath');
const createConfig = require('@gravitational/build/webpack/webpack.base');
const baseCfg = createConfig();

var cfg = {
  entry: {
    main: './src/main.ts',
    preload: './src/preload.ts',
  },

  output: {
    path: resolvepath('build/app/dist/main'),
    filename: '[name].js',
  },

  resolve: {
    ...baseCfg.resolve,
    alias: {
      teleterm: path.join(__dirname, './src'),
    },
  },

  devtool: false,

  target: 'electron-main',

  optimization: {
    minimize: false,
  },

  module: {
    noParse: baseCfg.noParse,
    strictExportPresence: true,
    rules: [baseCfg.rules.jsx({ withHot: false })],
  },

  plugins: [new CleanWebpackPlugin()],

  /**
   * Disables webpack processing of __dirname and __filename.
   * If you run the bundle in node.js it falls back to these values of node.js.
   * https://github.com/webpack/webpack/issues/2010
   */
  node: {
    __dirname: false,
    __filename: false,
  },
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    process.env.BABEL_ENV = 'development';
    process.env.NODE_ENV = 'development';
    cfg.mode = 'development';
  }

  if (argv.mode === 'production') {
    process.env.BABEL_ENV = 'production';
    process.env.NODE_ENV = 'production';
    cfg.mode = 'production';
  }

  return cfg;
};
