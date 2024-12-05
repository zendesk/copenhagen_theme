import { render } from "react-dom";

import { ServiceCatalogList } from "./ServiceCatalogList";
import {
  createTheme,
  ThemeProviders,
  initI18next,
  loadTranslations,
} from "../shared";
import type { Settings } from "../shared";

export async function renderServiceCatalogList(
  container: HTMLElement,
  settings: Settings,
  helpCenterPath: string,
  baseLocale: string
) {
  initI18next(baseLocale);
  await loadTranslations(baseLocale, [
    () => import(`./translations/locales/${baseLocale}.json`),
    //() => import(`./ticket-fields/translations/locales/${baseLocale}.json`),
  ]);

  render(
    <ThemeProviders theme={createTheme(settings)}>
      <ServiceCatalogList helpCenterPath={helpCenterPath} />
    </ThemeProviders>,
    container
  );
}
