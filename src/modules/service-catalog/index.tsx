import { render } from "react-dom";
import type { Settings } from "../shared";
import { createTheme, ThemeProviders } from "../shared";
import { ServiceCatalog } from "./ServiceCatalog";
import { ServiceCatalogTwo } from "./ServiceCatalogTwo";

export async function renderServiceCatalog(
  settings: Settings,
  container: HTMLElement
) {
  render(
    <ThemeProviders theme={createTheme(settings)}>
      <ServiceCatalog />
    </ThemeProviders>,
    container
  );
}

export async function renderServiceCatalogTwo(
  settings: Settings,
  container: HTMLElement
) {
  render(
    <ThemeProviders theme={createTheme(settings)}>
      <ServiceCatalogTwo />
    </ThemeProviders>,
    container
  );
}
