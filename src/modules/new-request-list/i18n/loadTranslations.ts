import i18next from "i18next";

export async function loadTranslations(
  locale: string,
  dynamicImports: (() => Promise<{
    default: { locale?: { translations?: Record<string, unknown> } };
  }>)[]
) {
  try {
    const translationsArray = await Promise.all(
      dynamicImports.map((importFunc) => importFunc())
    );

    translationsArray.forEach(({ default: localeData }) => {
      const translations = localeData.locale?.translations || {};
      i18next.addResourceBundle(locale, "translation", translations);
    });
  } catch (e) {
    console.error(`Cannot load translations for ${locale}`, e);
  }
}
