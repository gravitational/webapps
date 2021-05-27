const path = require('path');
const createConfig = require('@gravitational/build/webpack/webpack.base');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const baseCfg = createConfig();

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist/telelogin'),
    filename: 'login.js',
    library: 'teleport',
  },
  resolve: baseCfg.resolve,
  module: {
    noParse: baseCfg.noParse,
    strictExportPresence: true,
    rules: [baseCfg.rules.jsx(), baseCfg.rules.images, baseCfg.rules.css()],
  },
  optimization: {
    minimize: true,
  },

  plugins: [new CleanWebpackPlugin()],
};
