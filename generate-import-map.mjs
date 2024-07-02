import path from "path";
import fs from "fs";

/**
 * When assets are deployed to Theming Center, their file name is changed and this
 * breaks the rollup bundles, where bundled files are referencing each other with
 * relative paths (e.g. file a.js has an `import something from "./b.js"`)
 *
 * This plugin solves the issue by creating an importmap to be used in the browser,
 * specifically:
 * - it replaces relative imports with bare imports (`import something from "./b.js"`
 *   is replaced with `import something from "b"`)
 * - it creates an importmap that maps each bare import to the asset file, using the
 *   Curlybars asset helper. This import map is then injected into the document_head.hbs
 *   template and used by the browser to resolve the bare imports.
 *
 * Note: you need to have an importmap in the document_head that gets replaced
 * after each build. The first time you can just put an empty importmap:
 * <script type="importmap"></script>
 * @returns {import("rollup").Plugin}
 */
export function generateImportMap() {
  return {
    name: "rollup-plugin-generate-import-map",
    writeBundle({ dir }, bundle) {
      const outputAssets = Object.values(bundle);
      const importMap = { imports: {} };

      for (const { name, fileName } of outputAssets) {
        replaceImports(fileName, outputAssets, dir);
        importMap.imports[name] = `{{asset '${fileName}'}}`;
      }

      injectImportMap(importMap);
    },
  };
}

/**
 * Replace relative imports with bare imports
 * @param {string} fileName Name of the current output asset
 * @param {import("rollup").OutputAsset} outputAssets Array of all output assets generated during the build
 * @param {string} outputPath Path of the output directory
 */
function replaceImports(fileName, outputAssets, outputPath) {
  const filePath = path.resolve(outputPath, fileName);
  let content = fs.readFileSync(filePath, "utf-8");

  for (const { name, fileName } of outputAssets) {
    // Takes into account both single and double quotes
    const regex = new RegExp(`(['"])./${fileName}\\1`, "g");
    content = content.replaceAll(regex, `$1${name}$1`);
  }

  fs.writeFileSync(filePath, content, "utf-8");
}

/**
 * Injects the importmap in the document_head.hbs template, replacing the existing one
 * @param {object} importMap
 */
function injectImportMap(importMap) {
  const headTemplatePath = path.resolve("templates", "document_head.hbs");
  const content = fs.readFileSync(headTemplatePath, "utf-8");
  const importMapStart = content.indexOf(`<script type="importmap">`);
  const importMapEnd = content.indexOf(`</script>`, importMapStart);

  if (importMapStart === -1 || importMapEnd === -1) {
    throw new Error(
      `Cannot inject importmap in templates/document_head.hbs. Please provide an empty importmap like <script type="importmap"></script>`
    );
  }

  const existingImportMap = content.substring(
    importMapStart,
    importMapEnd + `</script>`.length
  );

  const newImportMap = `<script type="importmap">
${JSON.stringify(importMap, null, 2)}
</script>`;

  const newContent = content.replace(existingImportMap, newImportMap);

  fs.writeFileSync(headTemplatePath, newContent, "utf-8");
}
