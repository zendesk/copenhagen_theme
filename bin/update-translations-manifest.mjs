/**
 * This script is used for the internal Zendesk translation system, and it creates a JSON manifest
 * that maps each locale to the URL of the JSON file containing the translations, published on the
 * Zendesk CDN.
 * 
 * Usage: node bin/update-translations-manifest.mjs [PACKAGE_NAME] [OUTPUT_PATH]
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const PROJECT_NAME = process.argv[2];
const OUTPUT_PATH = resolve(process.cwd(), process.argv[3], "manifest.json");

const BASE_URL = `https://static.zdassets.com/translations`;

const result = {
  baseUrl: BASE_URL,
  files: {},
};

const manifestResponse = await fetch(
  `${BASE_URL}/${PROJECT_NAME}/manifest.json`
);

if (manifestResponse.ok) {
  const { json } = await manifestResponse.json();

  json.forEach(({ name, path }) => {
    result.files[name.toLocaleLowerCase()] = path;
  });
}

writeFileSync(OUTPUT_PATH, JSON.stringify(result) + "\n", "utf-8");
