#!/usr/bin/env node

const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

const LOCALE_ENDPOINT = `https://support.zendesk.com/api/v2/locales`;

const translationDefinitions = yaml.safeLoad(fs.readFileSync('translations.yml', 'utf8')).parts;
const obsoleteKeys = translationDefinitions
  .filter(part => part.translation.obsolete)
  .reduce((acc, part) => acc.concat(part.translation.key), []);

(async function() {
  const resp = await fetch(`${LOCALE_ENDPOINT}/default`);
  const locales = await resp.json();
  const localeIds = locales.locales.map(locale => locale.locale);

  for (const localeId of localeIds) {
    console.log(`Downloading ${localeId}...`);

    const resp = await fetch(`${LOCALE_ENDPOINT}/${localeId}.json?include=translations&packages=help_center_copenhagen_theme`);
    const translations = await resp.json();

    const formattedTranslations = Object.entries(translations.locale.translations).reduce((accumulator, [key, value]) => {
      if (obsoleteKeys.includes(key)) return accumulator;

      accumulator[key.replace(/.+\./, '')] = value;
      return accumulator;
    }, {});

    fs.writeFileSync(path.join('translations', `${localeId}.json`), JSON.stringify(formattedTranslations, null, 2) + '\n', 'utf8');
  }
})();
