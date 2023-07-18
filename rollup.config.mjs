import zass from "./zass.mjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
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
    input: {
      newRequestForm: "src/modules/newRequestForm/index.tsx",
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
const mappedAssets = {
  "./vendor.js": "vendor",
  "./shared.js": "shared",
};

function replaceVendorImport() {
  return {
    name: "rollup-plugin-replace-vendor-import",
    renderChunk(code) {
      let res = code;
      for (const [key, value] of Object.entries(mappedAssets)) {
        res = res.replaceAll(`from '${key}'`, `from '${value}'`);
      }
      return res;
    },
  };
}
