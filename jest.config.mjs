const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  preset: "rollup-jest",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  transformIgnorePatterns: ["node_modules/(?!(react-merge-refs)/)"],
  setupFilesAfterEnv: ["@testing-library/jest-dom", "<rootDir>/jest.setup.js"],
};

export default config;
