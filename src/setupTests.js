module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleNameMapper: {
    // CSS imports won't crash tests
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    // image imports won't crash tests
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/src/test/__mocks__/fileMock.js"
  }
};
