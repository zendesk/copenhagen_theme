import zass from "./zass.mjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import replace from "@rollup/plugin-replace";
import svgr from "@svgr/rollup";
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
      svgr({
        svgo: true,
        svgoConfig: {
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  removeTitle: false,
                  convertPathData: false,
                  removeViewBox: false,
                },
              },
            },
          ],
        },
      }),
      generateImportMap(),
    ],
    watch: {
      clearScreen: false,
    },
  },
]);
