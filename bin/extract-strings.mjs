/* eslint-env node */
/**
 * This script is used for the internal Zendesk translation system, and it creates or updates the source YAML file for translations,
 * extracting the strings from the source code.
 *
 * It searches for i18next calls (`{t("my-key", "My value")}`) and it adds the strings to the specified YAML file
 * (if not already present) with empty title and screenshot.
 * ```yaml
 *   - translation:
 *       key: "my-key"
 *       title: ""
 *       screenshot: ""
 *       value: "My value"
 * ```
 *
 * If a string present in the source YAML file is not found in the source code, it will be marked as obsolete
 *
 * If the value in the YAML file differs from the value in the source code, a warning will be printed in the console,
 * since the script cannot know which one is correct and cannot write back in the source code files. This can happen for
 * example after a "reverse string sweep", and can be eventually fixed manually.
 *
 * The script uses the i18next-parser library for extracting the strings and it adds a custom transformer for creating
 * the file in the required YAML format.
 */
// Usage:   node bin/extract-strings.mjs [PACKAGE_NAME] [SOURCE_FILES_GLOB] [OUTPUT_PATH]
// Example: node bin/extract-strings.mjs new-request-form 'src/modules/new-request-form/**/*.{ts,tsx}' src/modules/new-request-form/translations
import vfs from "vinyl-fs";
import Vinyl from "vinyl";
import { transform as I18NextTransform } from "i18next-parser";
import { Transform } from "node:stream";
import { existsSync, readFileSync } from "node:fs";
import { load, dump } from "js-yaml";
import { resolve } from "node:path";

const PACKAGE_NAME = process.argv[2];
const INPUT_GLOB = `${process.cwd()}/${process.argv[3]}`;
const OUTPUT_DIR = resolve(process.cwd(), process.argv[4]);

const OUTPUT_YML_FILE_NAME = "en-us.yml";

const OUTPUT_BANNER = `#
# This file is used for the internal Zendesk translation system, and it is generated from the extract-strings.mjs script.
# It contains the English strings to be translated, which are used for generating the JSON files containing the translation strings
# for each language.
#
# If you are building your own theme, you can remove this file and just load the translation JSON files, or provide
# your translations with a different method.
#
`;

/** @type {import("i18next-parser").UserConfig} */
const config = {
  // Our translation system requires that we add ".zero", ".one", ".other" keys for plurals
  // i18next-parser extracts plural keys based on the target locale, so we are passing a
  // locale that need exactly the ".zero", ".one", ".other" keys, even if we are extracting English strings
  locales: ["lv"],
  keySeparator: false,
  namespaceSeparator: false,
  pluralSeparator: ".",
  // This path is used only as a Virtual FS path by i18next-parser, and it doesn't get written on the FS
  output: "locales/en.json",
};

class SourceYmlTransform extends Transform {
  #defaultContent = {
    title: "",
    packages: [PACKAGE_NAME],
    parts: [],
  };

  #counters = {
    added: 0,
    obsolete: 0,
    mismatch: 0,
  };

  constructor() {
    super({ objectMode: true });
  }

  _transform(file, encoding, done) {
    try {
      const strings = JSON.parse(file.contents.toString(encoding));
      const outputContent = this.#getSourceYmlContent();

      // Mark removed keys as obsolete
      for (const { translation } of outputContent.parts) {
        if (!(translation.key in strings) && !translation.obsolete) {
          translation.obsolete = this.#getObsoleteDate();
          this.#counters.obsolete++;
        }
      }

      // Add new keys to the source YAML or log mismatched value
      for (const [key, value] of Object.entries(strings)) {
        const existingPart = outputContent.parts.find(
          (part) => part.translation.key === key
        );

        if (existingPart === undefined) {
          outputContent.parts.push({
            translation: {
              key,
              title: "",
              screenshot: "",
              value,
            },
          });
          this.#counters.added++;
        } else if (value !== existingPart.translation.value) {
          console.warn(
            `\nFound a mismatch value for the key "${key}".\n\tSource code value: ${value}\n\tTranslation file value: ${existingPart.translation.value}`
          );
          this.#counters.mismatch++;
        }
      }

      const virtualFile = new Vinyl({
        path: OUTPUT_YML_FILE_NAME,
        contents: Buffer.from(
          OUTPUT_BANNER +
            "\n" +
            dump(outputContent, { quotingType: `"`, forceQuotes: true })
        ),
      });
      this.push(virtualFile);

      console.log(`String extraction completed!
      Added strings: ${this.#counters.added}
      Removed strings (marked as obsolete): ${this.#counters.obsolete}
      Strings with mismatched value: ${this.#counters.mismatch}`);

      done();
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }

  #getSourceYmlContent() {
    const outputPath = resolve(OUTPUT_DIR, OUTPUT_YML_FILE_NAME);
    if (existsSync(outputPath)) {
      return load(readFileSync(outputPath, "utf-8"));
    }

    return this.#defaultContent;
  }

  #getObsoleteDate() {
    const today = new Date();
    const obsolete = new Date(today.setMonth(today.getMonth() + 3));
    return obsolete.toISOString().split("T")[0];
  }
}

vfs
  .src([INPUT_GLOB])
  .pipe(new I18NextTransform(config))
  .pipe(new SourceYmlTransform())
  .pipe(vfs.dest(OUTPUT_DIR));
