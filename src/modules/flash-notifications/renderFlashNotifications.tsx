import { render } from "react-dom";
import {
  ThemeProviders,
  createTheme,
  FLASH_NOTIFICATIONS_KEY,
  initI18next,
  loadTranslations,
} from "../shared";
import type { Settings, ToastNotification } from "../shared";
import { FlashNotifications } from "./FlashNotifications";

export async function renderFlashNotifications(
  settings: Settings,
  baseLocale: string
) {
  const flashNotifications = window.sessionStorage.getItem(
    FLASH_NOTIFICATIONS_KEY
  );

  if (flashNotifications === null) {
    return;
  }

  initI18next(baseLocale);
  await loadTranslations(baseLocale, [
    () => import(`../shared/translations/locales/${baseLocale}.json`),
  ]);

  window.sessionStorage.removeItem(FLASH_NOTIFICATIONS_KEY);

  try {
    const parsedNotifications = JSON.parse(
      flashNotifications
    ) as ToastNotification[];

    const container = document.createElement("div");
    document.body.appendChild(container);

    render(
      <ThemeProviders theme={createTheme(settings)}>
        <FlashNotifications notifications={parsedNotifications} />
      </ThemeProviders>,
      container
    );
  } catch (e) {
    console.error("Cannot render flash notifications", e);
  }
}
