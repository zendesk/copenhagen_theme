/* eslint-env node */

const PASCAL_CASE = "*([A-Z]*([a-z0-9]))";
const CAMEL_CASE = "+([a-z])*([a-z0-9])*([A-Z]*([a-z0-9]))";

module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  env: {
    browser: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "check-file", "@shopify"],
  root: true,
  settings: {
    "import/resolver": {
      typescript: true,
      node: true,
    },
    react: {
      version: "detect",
    },
  },
  ignorePatterns: ["assets/**"],
  rules: {
    "@typescript-eslint/consistent-type-imports": "error",
    "check-file/folder-naming-convention": [
      "error",
      { "src/**/": "KEBAB_CASE" },
    ],
    "check-file/filename-naming-convention": [
      "error",
      {
        "src/**/*.{js,ts,tsx}": `@(${CAMEL_CASE}|${PASCAL_CASE})`,
      },
      {
        ignoreMiddleExtensions: true,
      },
    ],
    "@shopify/jsx-no-hardcoded-content": [
      "warn",
      {
        checkProps: ["title", "aria-label"],
        modules: {
          "@zendeskgarden/react-tooltips": {
            Tooltip: { checkProps: ["content"] },
          },
          "react-i18next": {
            Trans: { allowStrings: true },
          },
        },
      },
    ],
  },
};
