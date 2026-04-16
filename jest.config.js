module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(ts|js|mjs)$': ['ts-jest', { tsconfig: 'tsconfig.spec.json', useESM: true }]
  },
  transformIgnorePatterns: ['node_modules/(?!(\\@angular|rxjs|@brisanet|zone\.js)/)'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['ts', 'js', 'mjs'],
  testMatch: ['<rootDir>/src/**/*.spec.ts']
};
