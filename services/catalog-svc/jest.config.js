module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    // '^.+\\.tsx?$': ['babel-jest', { configFile: './babel.config.js' }]
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '^@org/shared-kernel$': '<rootDir>/../../packages/shared-kernel/src',
    '^@org/shared-infra$': '<rootDir>/../../packages/shared-infra/src',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
