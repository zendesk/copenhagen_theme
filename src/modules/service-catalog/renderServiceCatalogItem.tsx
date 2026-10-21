import { render } from "react-dom";
import { createTranslationLoader } from "../shared/i18n/createTranslationLoader";
import { ticketFieldsTranslations } from "../ticket-fields";

import { ServiceCatalogItem } from "./components/service-catalog-item/ServiceCatalogItem";

import type { ServiceCatalogItemProps } from "./components/service-catalog-item/ServiceCatalogItem";
import {
  sharedTranslations,
  createTheme,
  ThemeProviders,
  initI18next,
  loadTranslations,
} from "../shared";
import type { Settings } from "../shared";
import { ErrorBoundary } from "../shared/error-boundary/ErrorBoundary";

export async function renderServiceCatalogItem(
  container: HTMLElement,
  settings: Settings,
  props: ServiceCatalogItemProps & { locale: string }
) {
  const { baseLocale, locale, helpCenterPath } = props;
  initI18next(baseLocale);
  await loadTranslations(locale, baseLocale, [
    createTranslationLoader(
      "service-catalog",
      (locale) => import(`./translations/locales/${locale}.json`)
    ),
    ticketFieldsTranslations,
    sharedTranslations,
  ]);
  render(
    <ThemeProviders theme={createTheme(settings)}>
      <ErrorBoundary helpCenterPath={helpCenterPath}>
        <ServiceCatalogItem {...props} />
      </ErrorBoundary>
    </ThemeProviders>,
    container
  );
}
