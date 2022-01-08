module.exports = {
  clearMocks: true,
  moduleFileExtensions: ["js", "ts"],
  setupFiles: ["dotenv/config"],
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  testRunner: "jest-circus/runner",
  testTimeout: 30000,
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  verbose: false,
};
