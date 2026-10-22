import i18next from "i18next";
import type { TranslationLoader } from "./createTranslationLoader";

export async function loadTranslations(
  locale: string,
  baseLocale: string,
  loaders: readonly TranslationLoader[]
) {
  const requestedLocale = locale.toLowerCase();
  const fallbackLocale = baseLocale.toLowerCase();
  const localesToTry =
    requestedLocale === fallbackLocale
      ? [requestedLocale]
      : [requestedLocale, fallbackLocale];

  const translationsArray = await Promise.all(
    loaders.map(async (loader) => {
      let lastError: unknown;

      for (const candidateLocale of localesToTry) {
        try {
          return await loader.importLocale(candidateLocale);
        } catch (error) {
          lastError = error;
        }
      }

      console.error(
        `Cannot load translations for ${loader.name} (locale: ${locale}, base locale: ${baseLocale})`,
        lastError
      );
      return undefined;
    })
  );

  translationsArray.forEach((result) => {
    if (result) {
      i18next.addResourceBundle(baseLocale, "translation", result.default);
    }
  });
}
