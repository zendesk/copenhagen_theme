const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  preset: "rollup-jest",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  transformIgnorePatterns: ["node_modules/(?!(react-merge-refs)/)"],
  setupFilesAfterEnv: ["@testing-library/jest-dom", "<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "\\.svg$": "<rootDir>/__mocks__/svg.mock.js",
  },
};

export default config;
