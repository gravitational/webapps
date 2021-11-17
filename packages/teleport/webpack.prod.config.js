const defaultCfg = require('@gravitational/build/webpack/webpack.prod.config');
const extend = require('./webpack.extend');

module.exports = extend(defaultCfg);
