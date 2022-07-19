const config = require('@gravitational/build/jest/config');

process.env.TZ = 'UTC';

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  ...config,
  globals: {
    electron: {},
  },
  transformIgnorePatterns: [
    '!node_modules/native-file-system-adapter/src/\\.[jt]s?$',
  ],
  collectCoverageFrom: [
    // comment out until shared directory is finished testing
    // '**/packages/design/src/**/*.jsx',
    '**/packages/shared/components/**/*.jsx',
  ],
  coverageReporters: ['text-summary', 'lcov'],
};
