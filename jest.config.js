const config = require('@gravitational/build/jest/config');

process.env.TZ = 'PST';

module.exports = {
  ...config,
  collectCoverageFrom: [
    // comment out until shared directory is finished testing
    // '**/packages/design/src/**/*.jsx',
    '**/packages/shared/components/**/*.jsx',
  ],
  coverageReporters: ['text-summary', 'lcov'],
};
