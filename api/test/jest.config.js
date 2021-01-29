module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  rootDir: '..',
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/database/migrations/**/*.{ts,js}',
  ],
  coverageDirectory: 'test/coverage',
  moduleFileExtensions: ['js', 'ts', 'json'],
  testMatch: ['**/test/*/**?(*.)(spec|test).ts'],
  transform: {
    '.(ts)': 'ts-jest',
  },
  verbose: true,
}
