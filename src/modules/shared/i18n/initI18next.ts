import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { customMarkupPlugin } from "./customMarkupPlugin";

export function initI18next(locale: string) {
  i18next
    .use(initReactI18next)
    .use(customMarkupPlugin)
    .init({
      resources: {
        [`${locale}`]: {},
      },
      lng: locale,
      lowerCaseLng: true,
      interpolation: {
        escapeValue: false,
      },
      keySeparator: false,
      pluralSeparator: ".",
    });
}
