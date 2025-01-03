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
 * If a string present in the source YAML file is not found in the source code, it will be marked as obsolete if the
 * `--mark-obsolete` flag is passed.
 *
 * If the value in the YAML file differs from the value in the source code, a warning will be printed in the console,
 * since the script cannot know which one is correct and cannot write back in the source code files. This can happen for
 * example after a "reverse string sweep", and can be eventually fixed manually.
 *
 * The script uses the i18next-parser library for extracting the strings and it adds a custom transformer for creating
 * the file in the required YAML format.
 *
 * For usage instructions, run `node extract-strings.mjs --help`
 */
import vfs from "vinyl-fs";
import Vinyl from "vinyl";
import { transform as I18NextTransform } from "i18next-parser";
import { Transform } from "node:stream";
import { readFileSync } from "node:fs";
import { load, dump } from "js-yaml";
import { resolve } from "node:path";
import { glob } from "glob";
import { parseArgs } from "node:util";

const { values: args } = parseArgs({
  options: {
    "mark-obsolete": {
      type: "boolean",
    },
    module: {
      type: "string",
    },
    help: {
      type: "boolean",
    },
  },
});

if (args.help) {
  const helpMessage = `
  Usage: extract-strings.mjs [options]

  Options:
    --mark-obsolete   Mark removed strings as obsolete in the source YAML file
    --module          Extract strings only for the specified module. The module name should match the folder name in the src/modules folder
                      If not specified, the script will extract strings for all modules
    --help            Display this help message

  Examples:
    node extract-strings.mjs
    node extract-strings.mjs --mark-obsolete
    node extract-strings.mjs --module=ticket-fields
  `;

  console.log(helpMessage);
  process.exit(0);
}

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
  // Our translation system requires that we add all 6 forms (zero, one, two, few, many, other) keys for plurals
  // i18next-parser extracts plural keys based on the target locale, so we are passing a
  // locale that need exactly the 6 forms, even if we are extracting English strings
  locales: ["ar"],
  keySeparator: false,
  namespaceSeparator: false,
  pluralSeparator: ".",
  // This path is used only as a Virtual FS path by i18next-parser, and it doesn't get written on the FS
  output: "locales/en.json",
};

class SourceYmlTransform extends Transform {
  #parsedInitialContent;
  #outputDir;

  #counters = {
    added: 0,
    obsolete: 0,
    mismatch: 0,
  };

  constructor(outputDir) {
    super({ objectMode: true });

    this.#outputDir = outputDir;
    this.#parsedInitialContent = this.#getSourceYmlContent();
  }

  _transform(file, encoding, done) {
    try {
      const strings = JSON.parse(file.contents.toString(encoding));

      const outputContent = {
        ...this.#parsedInitialContent,
        parts: this.#parsedInitialContent.parts || [],
      };

      // Find obsolete keys
      for (const { translation } of outputContent.parts) {
        if (!(translation.key in strings) && !translation.obsolete) {
          this.#counters.obsolete++;

          if (args["mark-obsolete"]) {
            translation.obsolete = this.#getObsoleteDate();
          }
        }
      }

      // Add new keys to the source YAML or log mismatched value
      for (let [key, value] of Object.entries(strings)) {
        value = this.#fixPluralValue(key, value, strings);

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
      this.#printInfo();
      done();
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }

  #getSourceYmlContent() {
    const outputPath = resolve(this.#outputDir, OUTPUT_YML_FILE_NAME);
    return load(readFileSync(outputPath, "utf-8"));
  }

  #getObsoleteDate() {
    const today = new Date();
    const obsolete = new Date(today.setMonth(today.getMonth() + 3));
    return obsolete.toISOString().split("T")[0];
  }

  #printInfo() {
    const message = `Package ${this.#parsedInitialContent.packages[0]}
    Added strings: ${this.#counters.added}
    ${this.#getObsoleteInfoMessage()}
    Strings with mismatched value: ${this.#counters.mismatch}
    `;

    console.log(message);
  }

  #getObsoleteInfoMessage() {
    if (args["mark-obsolete"]) {
      return `Removed strings (marked as obsolete): ${this.#counters.obsolete}`;
    }

    let result = `Obsolete strings: ${this.#counters.obsolete}`;
    if (this.#counters.obsolete > 0) {
      result += " - Use --mark-obsolete to mark them as obsolete";
    }

    return result;
  }

  // if the key ends with .zero, .one, .two, .few, .many, .other and the value is empty
  // find the same key with the `.other` suffix in strings and return the value
  #fixPluralValue(key, value, strings) {
    if (key.endsWith(".zero") && value === "") {
      return strings[key.replace(".zero", ".other")] || "";
    }

    if (key.endsWith(".one") && value === "") {
      return strings[key.replace(".one", ".other")] || "";
    }

    if (key.endsWith(".two") && value === "") {
      return strings[key.replace(".two", ".other")] || "";
    }

    if (key.endsWith(".few") && value === "") {
      return strings[key.replace(".few", ".other")] || "";
    }

    if (key.endsWith(".many") && value === "") {
      return strings[key.replace(".many", ".other")] || "";
    }

    return value;
  }
}

const sourceFilesGlob = args.module
  ? `src/modules/${args.module}/translations/en-us.yml`
  : "src/modules/**/translations/en-us.yml";

const sourceFiles = await glob(sourceFilesGlob);
for (const sourceFile of sourceFiles) {
  const moduleName = sourceFile.split("/")[2];
  const inputGlob = `src/modules/${moduleName}/**/*.{ts,tsx}`;
  const outputDir = resolve(
    process.cwd(),
    `src/modules/${moduleName}/translations`
  );

  vfs
    .src([inputGlob])
    .pipe(new I18NextTransform(config))
    .pipe(new SourceYmlTransform(outputDir))
    .pipe(vfs.dest(outputDir));
}
