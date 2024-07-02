import { render } from "react-dom";
import {
  ThemeProviders,
  createTheme,
  FLASH_NOTIFICATIONS_KEY,
} from "../shared";
import type { Settings, ToastNotification } from "../shared";
import { FlashNotifications } from "./FlashNotifications";

export function renderFlashNotifications(
  settings: Settings,
  closeLabel: string
) {
  const flashNotifications = window.sessionStorage.getItem(
    FLASH_NOTIFICATIONS_KEY
  );

  if (flashNotifications === null) {
    return;
  }

  window.sessionStorage.removeItem(FLASH_NOTIFICATIONS_KEY);

  try {
    const parsedNotifications = JSON.parse(
      flashNotifications
    ) as ToastNotification[];

    const container = document.createElement("div");
    document.body.appendChild(container);

    render(
      <ThemeProviders theme={createTheme(settings)}>
        <FlashNotifications
          notifications={parsedNotifications}
          closeLabel={closeLabel}
        />
      </ThemeProviders>,
      container
    );
  } catch (e) {
    console.error("Cannot render flash notifications", e);
  }
}
