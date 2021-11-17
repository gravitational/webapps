const defaultCfg = require('@gravitational/build/webpack/webpack.dev.config');
const extend = require('./webpack.extend');

module.exports = extend(defaultCfg);
