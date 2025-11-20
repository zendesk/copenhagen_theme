const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  preset: "rollup-jest",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  setupFiles: ["<rootDir>/jest.i18n.setup.ts"],
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
};

export default config;
