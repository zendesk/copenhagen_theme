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
      replaceVendorImport(),
    ],
    watch: {
      clearScreen: false,
    },
  },
]);

/*
TODO: Find a better way to do this

This is required to make import maps works on production.

All node deps are bundled in the assets/vendor.js file, and normally rollup
writes `import {...} from "./vendor.js"`.

We want to use import maps to remap "./vendor.js" to the `vendor.js` theme asset,
but for some reasons in this case the browser is trying to load a local script instead
of following the import map.

Instead if we change `./vendor.js` to `vendor` it works and the browser load the vendor.js asset.
 */
function replaceVendorImport() {
  return {
    name: "rollup-plugin-replace-vendor-import",
    renderChunk(code) {
      return code.replace(`from './vendor.js'`, `from 'vendor'`);
    },
  };
}
