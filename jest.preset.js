const nxPreset = require('@nx/jest/preset').default;
module.exports = {
  ...require('nx/jest/preset').default,
  testMatch: [
    '<rootDir>/**/**/tests/**/*.(spec|test).[tj]s',
    '<rootDir>/**/**/src/**/*.(spec|test).[tj]s',
  ],
};
