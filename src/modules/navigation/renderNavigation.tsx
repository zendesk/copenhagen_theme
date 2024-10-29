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

export async function renderNewRequestForm(
  settings: Settings,
  props: NavigationProps,
  container: HTMLElement
) {
  render(
    <ThemeProviders theme={createTheme(settings)}>
      <Navigation {...props} />
    </ThemeProviders>,
    container
  );
}
