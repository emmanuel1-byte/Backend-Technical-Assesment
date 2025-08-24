module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/src/test/unit/**/*.spec.ts"], // only TS unit tests
  moduleFileExtensions: ["ts", "js", "json", "node"],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
};
