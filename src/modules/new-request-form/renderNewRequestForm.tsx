import { render } from "react-dom";
import type { Settings } from "../shared";
import {
  createTheme,
  ThemeProviders,
  loadTranslations,
  initI18next,
} from "../shared";
import type { NewRequestFormProps } from "./NewRequestForm";
import { NewRequestForm } from "./NewRequestForm";

export async function renderNewRequestForm(
  settings: Settings,
  props: NewRequestFormProps,
  container: HTMLElement
) {
  const { baseLocale } = props;

  initI18next(baseLocale);
  await loadTranslations(baseLocale, [
    () => import(`./translations/locales/${baseLocale}.json`),
    () => import(`../ticket-fields/translations/locales/${baseLocale}.json`),
    () => import(`../shared/translations/locales/${baseLocale}.json`),
  ]);

  render(
    <ThemeProviders theme={createTheme(settings)}>
      <NewRequestForm {...props} />
    </ThemeProviders>,
    container
  );
}
