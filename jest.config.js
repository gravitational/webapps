const config = require('@gravitational/build/jest/config');
module.exports = {
  ...config,
  collectCoverageFrom: [
    // '**/packages/design/src/**/*.jsx',
    '**/packages/shared/components/**/*.jsx',
  ],
  coverageReporters: ['text-summary', 'lcov'],
};
