import localeMapping from "./locale-mapping.json";

/**
 * Help Center supports some non standard locale variants, as documented here:
 * https://support.zendesk.com/hc/en-us/articles/4408821324826-Zendesk-language-support-by-product#h_01EYXD488X3XK23TG9VPG0W6KS
 *
 * This function returns a standard Unicode CLDR locale for an Help Center locale. The returned
 * locale can be used for loading translations and using the Intl API in the browser.
 *
 * The mapping between the locales is performed using a JSON file generated from a script
 *
 * @param hcLocale Help Center locale
 * @returns CLDR Locale
 */
export function getCldrLocale(hcLocale: string): string {
  return (localeMapping as Record<string, string>)[hcLocale] ?? hcLocale;
}
