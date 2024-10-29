import { render } from "react-dom";
import type { Settings } from "../shared";
import {
  createTheme,
  ThemeProviders,
  loadTranslations,
  initI18next,
} from "../shared";
import Navigation from "./Navigation";
import type { Navigation as NavigationProps } from "./data-types";

export async function renderNavigation(
  settings: Settings,
  container: HTMLElement
) {
  render(
    <ThemeProviders theme={createTheme(settings)}>
      <Navigation />
    </ThemeProviders>,
    container
  );
}
