import { render } from "react-dom";
import type { Settings } from "../garden-theme/createTheme";
import { createTheme, ThemeProviders } from "../garden-theme";
import type { NewRequestFormProps } from "./NewRequestForm";
import { NewRequestForm } from "./NewRequestForm";
import { addZendeskTranslations, initI18next } from "../i18n";

export async function renderNewRequestForm(
  settings: Settings,
  props: NewRequestFormProps,
  container: HTMLElement
) {
  const { baseLocale } = props;

  initI18next(baseLocale);
  await addZendeskTranslations(
    baseLocale,
    () => import(`./translations/locales/${baseLocale}.json`)
  );

  render(
    <ThemeProviders theme={createTheme(settings)}>
      <NewRequestForm {...props} />
    </ThemeProviders>,
    container
  );
}
