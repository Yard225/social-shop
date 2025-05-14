module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    // '^.+\\.tsx?$': ['babel-jest', { configFile: './babel.config.js' }]
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/?(*.)+(test).ts'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '^@org/shared-infra$': '<rootDir>/../../packages/shared-infra/src',
    '^@org/shared-kernel$': '<rootDir>/../../packages/shared-kernel/src',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testTimeout: 10000,
  detectOpenHandles: true,
  forceExit: true
};