module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,js,tsx}'],
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
}
