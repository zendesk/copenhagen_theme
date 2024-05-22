import i18next from "i18next";

export async function loadTranslations(
  locale: string,
  dynamicImport: () => Promise<{ default: Record<string, string> }>
) {
  try {
    const { default: translations } = await dynamicImport();
    i18next.addResourceBundle(locale, "translation", translations);
  } catch (e) {
    console.error(`Cannot load translations for ${locale}`);
  }
}
