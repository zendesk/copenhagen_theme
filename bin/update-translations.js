const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');

(async function() {
  const resp = await fetch('https://support.zendesk.com/api/v2/locales/default');
  const locales = await resp.json();
  const localeIds = locales.locales.map(locale => locale.locale);

  for (const localeId of localeIds) {
    console.log(`Downloading ${localeId}...`);

    const resp = await fetch(
      `https://support.zendesk.com/api/v2/locales/${localeId}.json?include=translations&packages=help_center_copenhagen_theme`);
    const translations = await resp.json();

    const formatttedTranslations = Object.entries(translations.locale.translations).reduce((accumulator, [key, value]) => {
      accumulator[key.replace(/.+\./, '')] = value;
      return accumulator;
    }, {})

    fs.writeFileSync(path.join('translations', `${localeId}.json`), JSON.stringify(formatttedTranslations, null, 2) + '\n', 'utf8');
  }
})();
