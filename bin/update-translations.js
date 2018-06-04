#!/usr/bin/env node

const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');

const LOCALE_ENDPOINT = `https://support.zendesk.com/api/v2/locales`;

(async function() {
  const resp = await fetch(`${LOCALE_ENDPOINT}/default`);
  const locales = await resp.json();
  const localeIds = locales.locales.map(locale => locale.locale);

  for (const localeId of localeIds) {
    console.log(`Downloading ${localeId}...`);

    const resp = await fetch(`${LOCALE_ENDPOINT}/${localeId}.json?include=translations&packages=help_center_copenhagen_theme`);
    const translations = await resp.json();

    const formatttedTranslations = Object.entries(translations.locale.translations).reduce((accumulator, [key, value]) => {
      accumulator[key.replace(/.+\./, '')] = value;
      return accumulator;
    }, {})

    fs.writeFileSync(path.join('translations', `${localeId}.json`), JSON.stringify(formatttedTranslations, null, 2) + '\n', 'utf8');
  }
})();
