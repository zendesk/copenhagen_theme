import { createTranslationLoader } from "../shared/i18n/createTranslationLoader";

export const ticketFieldsTranslations = createTranslationLoader(
  "ticket-fields",
  (locale) => import(`./translations/locales/${locale}.json`)
);

export * from "./fields";
export { RequestFormField } from "./RequestFormField";
