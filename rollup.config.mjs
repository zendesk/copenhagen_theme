import zass from "./zass.mjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import { defineConfig } from "rollup";

export default defineConfig({
  input: { script: "src/index.js" },
  output: {
    dir: ".",
    format: "es",
    manualChunks: (id) => {
      if (id.includes("node_modules")) {
        return "vendor";
      }
    },
    chunkFileNames: "assets/[name].js",
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
});
