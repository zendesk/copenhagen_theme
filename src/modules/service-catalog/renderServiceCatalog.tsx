import { render } from "react-dom";

import { ServiceCatalog } from "./ServiceCatalog";
import { createTheme, ThemeProviders } from "../shared";
import type { Settings } from "../shared";

export async function renderServiceCatalog(
  container: HTMLElement,
  settings: Settings
) {
  render(
    <ThemeProviders theme={createTheme(settings)}>
      <ServiceCatalog />
    </ThemeProviders>,
    container
  );
}
