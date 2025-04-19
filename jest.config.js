/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    transform: {
      '^.+\\.(t|j)s$': '@swc/jest', // Gunakan @swc/jest untuk file .ts dan .js
    },
    testEnvironment: 'node',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts)$',
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    rootDir: '.',
    roots: ['<rootDir>/src', '<rootDir>/src/test'], 
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.ts',
      '!src/**/*.test.ts',
      '!src/index.ts',
      '!src/config/**',
      '!src/schemas/**',
      '!src/entities/**',
      '!src/routes/**',
      '!src/middleware/**',
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['json', 'lcov', 'text', 'clover'],

  };