import { cleanup, screen, act } from "@testing-library/react";
import { renderFlashNotifications } from "./renderFlashNotifications";
import { emitNotify } from "../shared/notifications/notifyBus";
import type { Settings, ToastNotification } from "../shared";

afterEach(() => {
  cleanup();
  document.body.innerHTML = "";
});

const settings: Settings = {
  background_color: "#ffffff",
  text_color: "#000000",
  brand_color: "#0000ff",
  brand_text_color: "#ffffff",
  link_color: "#0000ff",
  hover_link_color: "#0000aa",
  visited_link_color: "#800080",
};
const baseLocale = "en-us";

describe("renderFlashNotifications", () => {
  it("creates a container div and mounts provider", async () => {
    await renderFlashNotifications(settings, baseLocale);

    const container: HTMLDivElement | null = document.body.querySelector("div");
    expect(container).not.toBeNull();
  });

  it("renders toast when emitNotify is called after initialization", async () => {
    await renderFlashNotifications(settings, baseLocale);

    const testId = "toast-test";
    const notification: ToastNotification = {
      type: "success",
      title: "Test",
      message: <div data-testid={testId} />,
    };

    act(() => {
      emitNotify(notification);
    });
    expect(await screen.findByTestId(testId)).toBeInTheDocument();
  });
});
