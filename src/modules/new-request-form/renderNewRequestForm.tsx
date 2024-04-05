import { render } from "react-dom";
import type { Settings } from "../garden-theme/createTheme";
import { createTheme, ThemeProviders } from "../garden-theme";
import type { NewRequestFormProps } from "./NewRequestForm";
import { NewRequestForm } from "./NewRequestForm";
import translationsManifest from "./translations/manifest.json";
import { addZendeskTranslations, initI18next } from "../i18n";

export async function renderNewRequestForm(
  settings: Settings,
  props: NewRequestFormProps,
  container: HTMLElement
) {
  const { baseLocale } = props;

  initI18next(baseLocale);
  await addZendeskTranslations(baseLocale, translationsManifest);

  render(
    <ThemeProviders theme={createTheme(settings)}>
      <NewRequestForm {...props} />
    </ThemeProviders>,
    container
  );
}
