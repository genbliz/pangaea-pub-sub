const path = require("path");

module.exports = {
  roots: ["<rootDir>"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$",
  moduleFileExtensions: ["ts", "js", "json", "node"],
  collectCoverage: true,
  clearMocks: true,
  coverageDirectory: path.resolve(`${__dirname}/coverage`),
  verbose: true,
  testEnvironment: "node",
  coveragePathIgnorePatterns: [
    //
    "/node_modules/",
    "/dist/",
  ],
};
