const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  preset: "rollup-jest",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
};

export default config;
