import { createTranslationLoader } from "./i18n/createTranslationLoader";

export const sharedTranslations = createTranslationLoader(
  "shared",
  (locale) => import(`./translations/locales/${locale}.json`)
);

export * from "./notifications";
export * from "./i18n";
export * from "./garden-theme";
export * from "./error-boundary";
