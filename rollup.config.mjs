import zass from "./zass.mjs";

export default {
  input: "src/index.js",
  output: {
    file: "script.js",
    format: "iife",
  },
  plugins: [zass()],
  watch: {
    clearScreen: false,
  },
};
