import { render } from "react-dom";

import { ServiceCatalogItemPage } from "./ServiceCatalogItemPage";

import type { ServiceCatalogItemPageProps } from "./ServiceCatalogItemPage";
import { createTheme, ThemeProviders } from "../shared";
import type { Settings } from "../shared";

export async function renderServiceCatalogItem(
  container: HTMLElement,
  settings: Settings,
  props: ServiceCatalogItemPageProps
) {
  render(
    <ThemeProviders theme={createTheme(settings)}>
      <ServiceCatalogItemPage {...props} />
    </ThemeProviders>,
    container
  );
}
