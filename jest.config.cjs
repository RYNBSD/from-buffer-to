/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testPathIgnorePatterns: ["\\node_modules\\"],
  roots: ["<rootDir>__test__/"],
  testMatch: ["**/__test__/**/*.test.cjs"],
  testTimeout: 1000 * 60 * 5,
  transform: {
    "^.+\\.(js|cjs)$": "babel-jest",
  },
};

module.exports = config;
