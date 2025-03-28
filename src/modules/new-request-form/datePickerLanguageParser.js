// maps our help center official parent/baseLocales to date-fns locales for the purpose
// of allowing manually entered dates to be entered into the datepicker and validated in different locales
// by checking their date fns matches the date-fns format expectation

// available date-fns locales: https://github.com/date-fns/date-fns/tree/main/src/locale

// Official zendesk languages so far not supported by date-fns (format fallback to en-us):
// fil (Filipino)
// persian - have used Iran Persian farsi (fa-IR) instead which is available
// no - instead of norwegian official we use the available Norwegian Bokmal
// en-gb is not one of our baseLocales - so I've used en-150 which is the closest match for "European English"

import { isValid, isBefore, parse, parseISO } from "date-fns";

export const supportedLanguages = {
  ar: () => import("date-fns/locale/ar"),
  bg: () => import("date-fns/locale/bg"),
  cs: () => import("date-fns/locale/cs"),
  da: () => import("date-fns/locale/da"),
  de: () => import("date-fns/locale/de"),
  el: () => import("date-fns/locale/el"),
  "en-150": () => import("date-fns/locale/en-GB"),
  "en-us": () => import("date-fns/locale/en-US"),
  es: () => import("date-fns/locale/es"),
  fa: () => import("date-fns/locale/fa-IR"),
  fi: () => import("date-fns/locale/fi"),
  fr: () => import("date-fns/locale/fr"),
  he: () => import("date-fns/locale/he"),
  hi: () => import("date-fns/locale/hi"),
  hu: () => import("date-fns/locale/hu"),
  id: () => import("date-fns/locale/id"),
  it: () => import("date-fns/locale/it"),
  ja: () => import("date-fns/locale/ja"),
  ko: () => import("date-fns/locale/ko"),
  ms: () => import("date-fns/locale/ms"),
  nl: () => import("date-fns/locale/nl"),
  nn: () => import("date-fns/locale/nn"),
  no: () => import("date-fns/locale/nb"),
  pl: () => import("date-fns/locale/pl"),
  pt: () => import("date-fns/locale/pt"),
  ro: () => import("date-fns/locale/ro"),
  ru: () => import("date-fns/locale/ru"),
  sv: () => import("date-fns/locale/sv"),
  tr: () => import("date-fns/locale/tr"),
  vi: () => import("date-fns/locale/vi"),
  "zh-cn": () => import("date-fns/locale/zh-CN"),
  "zh-tw": () => import("date-fns/locale/zh-TW"),
};

const fallbackLanguages = {
  nb: "no",
  "en-001": "en-150",
  "en-ca": "en-us",
  "en-gb": "en-150",
  "es-419": "es",
  "es-es": "es",
  "fr-ca": "fr",
  "pt-br": "pt",
};

const defaultLocale = "en-us";

export const localeToLoad = (locale) => {
  locale = fallbackLanguages[locale] || locale;
  const availableLocales = Object.keys(supportedLanguages);

  if (availableLocales.includes(locale)) {
    return locale;
  }

  return defaultLocale;
};

export const parseAndValidateDate = (value, locale) => {
  const MINIMUM_DATE = new Date(1001, 0, 0);

  const validDateFormat = (date) =>
    isValid(date) && !isBefore(date, MINIMUM_DATE);

  const parsedShortFormat = parse(value, "P", new Date(), {
    locale: locale,
  });

  if (validDateFormat(parsedShortFormat)) {
    return parsedShortFormat;
  }

  const parsedISOvalue = parseISO(value);
  if (validDateFormat(parsedISOvalue)) {
    return parsedISOvalue;
  }

  const parsedMidFormat = parse(value, "PP", new Date(), {
    locale: locale,
  });

  if (validDateFormat(parsedMidFormat)) {
    return parsedMidFormat;
  }

  const parsedLongFormat = parse(value, "PPP", new Date(), {
    locale: locale,
  });

  if (validDateFormat(parsedLongFormat)) {
    return parsedLongFormat;
  }

  return new Date(NaN);
};

export async function getLocale(localeCode) {
  const validLocale = localeToLoad(localeCode);
  const locale = await supportedLanguages[validLocale]();

  return locale[localeCode] || locale.default;
}
