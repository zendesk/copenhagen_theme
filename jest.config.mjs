const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  preset: "rollup-jest",
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
};

export default config;
