import zass from "./zass.mjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import replace from "@rollup/plugin-replace";
import { generateImportMap } from "./generate-import-map.mjs";
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
    context: "this",
    input: {
      "new-request-form": "src/modules/new-request-form/index.tsx",
      shared: "src/modules/shared.tsx",
    },
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
        extensions: [".js"],
      }),
      commonjs(),
      typescript(),
      replace({
        preventAssignment: true,
        "process.env.NODE_ENV": '"production"',
      }),
      generateImportMap(),
    ],
    watch: {
      clearScreen: false,
    },
  },
]);
