import zass from "./zass.mjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import { defineConfig } from "rollup";

export default defineConfig([
  {
    input: "src/index.js",
    output: {
      file: "script.js",
      format: "iife",
    },
    plugins: [zass()],
    watch: {
      clearScreen: false,
    },
  },
  {
    input: ["src/modules/NewRequestForm.jsx", "src/modules/shared.jsx"],
    output: {
      dir: "assets",
      format: "es",
      manualChunks: (id) => {
        if (id.includes("node_modules")) {
          return "vendor";
        }
      },
      chunkFileNames: "[name].js",
    },
    plugins: [
      nodeResolve({
        extensions: [".js", "jsx"],
      }),
      babel({
        babelHelpers: "bundled",
        presets: ["@babel/preset-react"],
        extensions: [".js", ".jsx"],
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
  },
]);
