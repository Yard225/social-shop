/** @type {import('jest').Config} */
module.exports = {
  // point de départ = racine du dépôt
  rootDir: '.',

  // où se trouvent réellement tes tests
  roots: ['<rootDir>/packages', '<rootDir>/services'],

  collectCoverage: false,
  preset: 'ts-jest',
  testEnvironment: 'node',

  // .spec.ts ou .test.ts mais exclut int|e2e si tu veux
  testMatch: ['**/tests/**/*.spec.ts', '**/tests/**/*.test.ts'],

  coverageDirectory: '<rootDir>/coverage',
  coverageProvider: 'v8',
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],

  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
        isolatedModules: true,
        diagnostics: {
          ignoreCodes: [151001],
        },
      },
    ],
  },

  // alias vers notre mono-repo
  moduleNameMapper: {
    '^@org/(.*)$': '<rootDir>/packages/$1/src',
  },
};
