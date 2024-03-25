import { render } from "react-dom";
import type { Settings } from "../garden-theme/createTheme";
import { createTheme, ThemeProviders } from "../garden-theme";
import type { NewRequestFormProps } from "./NewRequestForm";
import { NewRequestForm } from "./NewRequestForm";
import translationsManifest from "./translations/manifest.json";
import { addZendeskTranslations, getCldrLocale, initI18next } from "../i18n";

export async function renderNewRequestForm(
  settings: Settings,
  props: NewRequestFormProps,
  container: HTMLElement
) {
  const { hcLocale } = props;

  const locale = getCldrLocale(hcLocale);
  initI18next(locale);
  await addZendeskTranslations(locale, translationsManifest);

  render(
    <ThemeProviders theme={createTheme(settings)}>
      <NewRequestForm {...props} />
    </ThemeProviders>,
    container
  );
}
