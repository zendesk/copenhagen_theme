/**
 * This script generates the src/modules/i18n/locale-mapping.json file from the JSON file containing all the Guide Locales.
 * 
 * Usage: node bin/create-locale-mapping.mjs
 */
import { resolve } from "node:path";
import { writeFileSync } from "node:fs";
import guideLocales from "./guide_available_locales.json" assert { type: "json" };

const OUTPUT_PATH = resolve(
  process.cwd(),
  "src/modules/i18n/locale-mapping.json",
);

const result = {};

guideLocales.forEach(({ locale: { identifier, parent_identifier } }) => {
  if (parent_identifier !== null) {
    result[identifier] = parent_identifier;
  }
});

writeFileSync(OUTPUT_PATH, JSON.stringify(result) + "\n", "utf-8");
