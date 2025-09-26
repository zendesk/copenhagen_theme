import { cleanup, screen } from "@testing-library/react";
import { renderFlashNotifications } from "./renderFlashNotifications";
import { emitNotify } from "../shared/notifications/notifyBus";
import type { Settings, ToastNotification } from "../shared";

afterEach(() => {
  cleanup();
  document.body.innerHTML = "";
});

describe("renderFlashNotifications", () => {
  it("creates a container div and mounts provider", async () => {
    const settings = {} as Settings;
    const baseLocale = "en";

    await renderFlashNotifications(settings, baseLocale);

    const container: HTMLDivElement | null = document.body.querySelector("div");
    expect(container).not.toBeNull();
  });

  it("renders toast when emitNotify is called after initialization", async () => {
    const settings = {} as Settings;
    const baseLocale = "en";

    await renderFlashNotifications(settings, baseLocale);

    const testId = "toast-test";
    const notification: ToastNotification = {
      type: "success",
      title: "Test",
      message: <div data-testid={testId} />,
    };

    emitNotify(notification);

    expect(await screen.findByTestId(testId)).toBeInTheDocument();
  });
});
