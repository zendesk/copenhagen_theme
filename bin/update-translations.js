#!/usr/bin/env node

const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

const ZSAP_BASE = `https://static.zdassets.com/translations`;
const SUPPORTED_LOCALES = [
  'ar',
  'bg',
  'cs',
  'da',
  'de',
  'el',
  'en-US',
  'en-ca',
  'en-gb',
  'es',
  'es-419',
  'es-es',
  'fi',
  'fr',
  'fr-ca',
  'he',
  'hi',
  'hu',
  'id',
  'it',
  'ja',
  'ko',
  'nl',
  'no',
  'pl',
  'pt',
  'pt-br',
  'ro',
  'ru',
  'sv',
  'th',
  'tr',
  'uk',
  'vi',
  'zh-cn',
  'zh-tw'
]

const translationDefinitions = yaml.load(fs.readFileSync('translations.yml', 'utf8')).parts;
const obsoleteKeys = translationDefinitions
  .filter(part => part.translation.obsolete)
  .reduce((acc, part) => acc.concat(part.translation.key), []);

(async function() {
  const resp = await fetch(`${ZSAP_BASE}/help_center_copenhagen_theme/manifest.json`);
  const manifest_json = await resp.json();

  for (const targetLocale of SUPPORTED_LOCALES) {
    const locale = manifest_json.json.find(entry => entry.name === targetLocale)

    console.log(`Downloading ${locale.name}...`);

    const resp = await fetch(`${ZSAP_BASE}${locale.path}`);
    const translations = await resp.json();

    const formattedTranslations = Object.entries(translations.translations).reduce((accumulator, [key, value]) => {
      if (obsoleteKeys.includes(key)) return accumulator;

      accumulator[key.replace(/.+\./, '')] = value;
      return accumulator;
    }, {});

    fs.writeFileSync(path.join('translations', `${locale.name}.json`), JSON.stringify(formattedTranslations, null, 2) + '\n', 'utf8');
  }
})();
