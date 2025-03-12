/* eslint-env node */
/**
 * This script is used for downloading the latest Zendesk official translation files for the modules in the `src/module` folder.
 *
 */
import { writeFile, readFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { glob } from "glob";
import { load } from "js-yaml";
import { parseArgs } from "node:util";

const BASE_URL = `https://static.zdassets.com/translations`;

const { values: args } = parseArgs({
  options: {
    module: {
      type: "string",
    },
  },
});

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

    await mkdir(outputDir, { recursive: true });

    const { json } = await manifestResponse.json();

    await Promise.all(
      json.map(({ name, path }) => writeLocaleFile(name, path, outputDir))
    );

    console.log(`Downloaded ${json.length} files.`);
  } catch (e) {
    console.log(`Error downloading translations for ${moduleName}: ${e}`);
  }
}

// search for `src/modules/**/translations/en-us.yml` files, read it contents and return a map of module names and package names
async function getModules() {
  const result = {};
  const sourceFilesGlob = args.module
    ? `src/modules/${args.module}/translations/en-us.yml`
    : "src/modules/**/translations/en-us.yml";
  const files = await glob(sourceFilesGlob);

  for (const file of files) {
    const content = await readFile(file);
    const parsedContent = load(content);
    const moduleName = file.split("/")[2];
    result[moduleName] = parsedContent.packages[0];
  }

  return result;
}

const modules = await getModules();

for (const [moduleName, packageName] of Object.entries(modules)) {
  await fetchModuleTranslations(moduleName, packageName);
}
