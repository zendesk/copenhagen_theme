import i18next from "i18next";

export async function loadTranslations(
  locale: string,
  dynamicImports: Array<() => Promise<{ default: Record<string, string> }>>
) {
  try {
    const translationsArray = await Promise.all(
      dynamicImports.map((importFunc) => importFunc())
    );

    translationsArray.forEach(({ default: translations }) => {
      i18next.addResourceBundle(locale, "translation", translations);
    });
  } catch (e) {
    console.error(`Cannot load translations for ${locale}`, e);
  }
}
