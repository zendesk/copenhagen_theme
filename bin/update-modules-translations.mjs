/* eslint-env node */
/**
 * This script is used for downloading the latest Zendesk official translation files for the modules in the `src/module` folder.
 *
 */
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

/**
 *  Maps each folder in the `src/modules` directory with its package name on the translation system
 */
const MODULES = {
  "new-request-form": "new-request-form",
};

const BASE_URL = `https://static.zdassets.com/translations`;

async function writeLocaleFile(name, filePath, outputDir) {
  const response = await fetch(`${BASE_URL}${filePath}`);
  const { translations } = await response.json();
  const outputPath = resolve(outputDir, `${name.toLocaleLowerCase()}.json`);
  await writeFile(
    outputPath,
    JSON.stringify(translations, null, 2) + "\n",
    "utf-8"
  );
}

async function fetchModuleTranslations(moduleName, packageName) {
  try {
    const manifestResponse = await fetch(
      `${BASE_URL}/${packageName}/manifest.json`
    );
    console.log(`Downloading translations for ${moduleName}...`);

    const outputDir = resolve(
      process.cwd(),
      `src/modules/${moduleName}/translations/locales`
    );

    const { json } = await manifestResponse.json();

    await Promise.all(
      json.map(({ name, path }) => writeLocaleFile(name, path, outputDir))
    );

    console.log(`Downloaded ${json.length} files.`);
  } catch (e) {
    console.log(`Error downloading translations for ${moduleName}: ${e}`);
  }
}

for (const [moduleName, packageName] of Object.entries(MODULES)) {
  await fetchModuleTranslations(moduleName, packageName);
}
