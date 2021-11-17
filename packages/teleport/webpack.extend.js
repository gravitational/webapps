const path = require('path');

module.exports = function extend(cfg) {
  // Finds the index of the HtmlWebpackPlugin in the plugins array
  const htmlPluginIdx = cfg.plugins.findIndex(obj => !!obj?.options?.template);
  cfg.plugins[htmlPluginIdx].options.favicon = path.join(
    __dirname,
    '/src/favicon.ico'
  );
  return cfg;
};
