import { render } from "react-dom";
import {
  ThemeProviders,
  createTheme,
  initI18next,
  loadTranslations,
} from "../shared";
import type { Settings } from "../shared";
import { GlobalNotificationsRoot } from "../shared/notifications/GlobalNotificationsRoot";

/**
 * Note: Historically named "flash notifications" after Rails flash messages.
 * This function now renders all notifications, not only flash ones.
 * The name is kept for backward compatibility with document_head.hbs.
 */

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
        <GlobalNotificationsRoot />
      </ThemeProviders>,
      container
    );
  } catch (e) {
    console.error("Cannot render flash notifications", e);
  }
}
