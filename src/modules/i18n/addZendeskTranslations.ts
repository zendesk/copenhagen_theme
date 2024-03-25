import i18next from "i18next";

interface TranslationsManifest {
  baseUrl: string;
  files: Record<string, string>;
}

async function loadTranslations(
  locale: string,
  manifest: TranslationsManifest
) {
  try {
    const BASE_URL = manifest.baseUrl;
    const fileUrl = manifest.files[locale];

    if (fileUrl === undefined) {
      return {};
    }

    const content = await (await fetch(`${BASE_URL}${fileUrl}`)).json();
    return content.translations;
  } catch (e) {
    console.error("Error fetching translations", e);
    return {};
  }
}

/**
 * This function adds the translations published on the Zendesk CDN to i18next,
 * taking the CLDR locale and a manifest as input.
 *
 * If you want to load your own translations you can use a different setup following the i18next
 * documentation.
 *
 * @param locale The CLDR locale
 * @param manifest A manifest object containing the translations file URL for each CLDR locale.
 */
export async function addZendeskTranslations(
  locale: string,
  manifest: TranslationsManifest
) {
  const translations = await loadTranslations(locale, manifest);
  i18next.addResourceBundle(locale, "translation", translations);
}
