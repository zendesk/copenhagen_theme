import i18next from "i18next";

interface TranslationFile {
  locale: string;
  rtl: boolean;
  translations: Record<string, string>;
  updated_at: string;
}

export async function addZendeskTranslations(
  locale: string,
  dynamicImport: () => Promise<TranslationFile>
) {
  try {
    const file = await dynamicImport();
    i18next.addResourceBundle(locale, "translation", file.translations);
  } catch (e) {
    console.error(`Cannot load translations for ${locale}`);
  }
}
