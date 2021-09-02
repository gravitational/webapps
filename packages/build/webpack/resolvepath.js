const fs = require('fs');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

function resolvePath(relativePath) {
  const appDirectory = fs.realpathSync(process.cwd());
  return path.resolve(appDirectory, relativePath);
}

module.exports = resolvePath;
