const eslintConfig = require('@gravitational/build/.eslintrc');

eslintConfig.ignorePatterns = ['**/tshd/**/*_pb.js'];

module.exports = eslintConfig;
