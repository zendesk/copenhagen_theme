import zass from "./zass.mjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";

export default {
  input: "src/index.js",
  output: {
    file: "script.js",
    format: "iife",
  },
  plugins: [
    zass(),
    nodeResolve({
      extensions: [".js", "jsx"],
    }),
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-react"],
      extensions: [".js"],
    }),
    commonjs(),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": '"production"',
    }),
  ],
  watch: {
    clearScreen: false,
  },
};
