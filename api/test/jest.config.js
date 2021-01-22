module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,js}'],
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js', 'ts', 'json'],
  testMatch: ['**/test/?(*.)(spec|test).ts'],
  transform: {
    '.(ts)': 'ts-jest',
  },
  types: ['jest'],
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  verbose: true,
};
