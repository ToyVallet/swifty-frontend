/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: './',
  transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: ['<rootDir>/packages/**/*.{ts,tsx}'],
  testPathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/dist'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  projects: [
    {
      displayName: '[shared-lib] 공통 라이브러리 테스트',
      testEnvironment: 'node',
      transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
      testMatch: [
        '<rootDir>/packages/shared-lib/**/__tests__/**/*.(spec|test).{ts,tsx}',
      ],
    },
  ],
};
