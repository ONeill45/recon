module.exports = {
  collectCoverage: true,
  rootDir: '..',
  collectCoverageFrom: ['src/**/*.{ts,js,tsx}'],
  coverageDirectory: 'test/coverage',
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
}
