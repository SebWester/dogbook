export default {
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/styleMock.js",
  },
  testEnvironment: "jsdom", // Här sätter du rätt testmiljö
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
