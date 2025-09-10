import { render } from "react-dom";
import {
  ThemeProviders,
  createTheme,
  initI18next,
  loadTranslations,
} from "../shared";
import type { Settings } from "../shared";
import { GlobalNotificationsProvider } from "../shared/notifications/GlobalNotificationsProvider";

export async function renderFlashNotifications(
  settings: Settings,
  baseLocale: string
) {
  initI18next(baseLocale);
  await loadTranslations(baseLocale, [
    () => import(`../shared/translations/locales/${baseLocale}.json`),
  ]);

  try {
    const container = document.createElement("div");
    document.body.appendChild(container);
    render(
      <ThemeProviders theme={createTheme(settings)}>
        <GlobalNotificationsProvider />
      </ThemeProviders>,
      container
    );
  } catch (e) {
    console.error("Cannot render flash notifications", e);
  }
}
