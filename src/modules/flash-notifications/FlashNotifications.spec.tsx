import { render, screen } from "@testing-library/react";
import { GlobalNotificationsProvider } from "../shared/notifications/GlobalNotificationsProvider";
import { FLASH_NOTIFICATIONS_KEY } from "../shared";
import type { ToastNotification } from "../shared";

describe("FlashNotifications (via GlobalNotificationsProvider)", () => {
  beforeEach(() => {
    sessionStorage.clear();
    jest.restoreAllMocks();
  });

  it("reads flash notifications from sessionStorage and displays them", async () => {
    const payloads: ToastNotification[] = [
      { title: "Hello", message: "World", type: "success" },
      { title: "Second", message: "Message", type: "info" },
    ];
    sessionStorage.setItem(FLASH_NOTIFICATIONS_KEY, JSON.stringify(payloads));

    render(<GlobalNotificationsProvider />);
    expect(await screen.findByText("Hello")).toBeInTheDocument();
    expect(await screen.findByText("Second")).toBeInTheDocument();
    expect(await screen.findByText("Message")).toBeInTheDocument();
    expect(sessionStorage.getItem(FLASH_NOTIFICATIONS_KEY)).toBeNull();
  });

  it("logs an error if sessionStorage contains invalid JSON", () => {
    sessionStorage.setItem(FLASH_NOTIFICATIONS_KEY, "INVALID");

    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    render(<GlobalNotificationsProvider />);

    expect(spy).toHaveBeenCalledWith(
      "Cannot parse flash notifications",
      expect.any(SyntaxError)
    );
  });

  it("does nothing if no flash notifications are in sessionStorage", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    render(<GlobalNotificationsProvider />);

    expect(spy).not.toHaveBeenCalled();
  });
});
