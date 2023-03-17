import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import svgr from "@svgr/rollup";
import zass from "./zass.mjs";

export default {
  input: "src/index.js",
  output: {
    file: "script.js",
    format: "iife",
  },
  plugins: [
    zass(),
    nodeResolve({
      extensions: [".js"],
    }),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    svgr(),
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-react"],
    }),
    commonjs(),
  ],
};
