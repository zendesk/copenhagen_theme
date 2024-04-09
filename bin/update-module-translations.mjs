/**
 * This script is used for downloading the latest Zendesk official translation files for a module in the `src/module` folder.
 * 
 * Usage: node bin/update-module-translations.mjs [PACKAGE_NAME] [OUTPUT_PATH]
 * Example: node bin/update-module-translations.mjs new-request-form src/modules/new-request-form/translations/locales
 */
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const PACKAGE_NAME = process.argv[2];
const OUTPUT_PATH = resolve(process.cwd(), process.argv[3]);

const BASE_URL = `https://static.zdassets.com/translations`;

async function writeLocaleFile({ path, name }) {
  const response = await fetch(`${BASE_URL}${path}`);
  const data = await response.json();
  const outputPath = resolve(OUTPUT_PATH, `${name.toLocaleLowerCase()}.json`);
  await writeFile(outputPath, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

console.log(`Downloading translations for ${PACKAGE_NAME}...`);

const manifestResponse = await fetch(
  `${BASE_URL}/${PACKAGE_NAME}/manifest.json`
);

const { json } = await manifestResponse.json();

await Promise.all(json.map(writeLocaleFile));

console.log(`Downloaded ${json.length} files.`);
