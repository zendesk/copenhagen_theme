import { cleanup, screen } from "@testing-library/react";
import { renderFlashNotifications } from "./renderFlashNotifications";
import { emitNotify, resetNotifyBus } from "../shared/notifications/notifyBus";
import type { Settings } from "../shared";
import type { Content } from "@zendeskgarden/react-notifications/dist/typings/elements/toaster/useToast";

afterEach(() => {
  cleanup();
  document.body.innerHTML = "";
  resetNotifyBus();
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
    const contentFn: Content = () => <div data-testid={testId} />;
    emitNotify(contentFn);

    expect(await screen.findByTestId(testId)).toBeInTheDocument();
  });
});
