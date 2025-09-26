import { render, screen } from "@testing-library/react";
import { ToastProvider } from "@zendeskgarden/react-notifications";
import { GlobalNotifications } from "./GlobalNotifications";
import type { ToastNotification } from "./ToastNotification";
import { emitNotify } from "./notifyBus";

describe("GlobalNotifications", () => {
  it("renders a toast when a notification is emitted", () => {
    render(
      <ToastProvider>
        <GlobalNotifications />
      </ToastProvider>
    );

    const payload: ToastNotification = {
      title: "Notify Title",
      message: "Notify Message",
      type: "success",
    };

    emitNotify(payload);

    expect(screen.getByText("Notify Title")).toBeInTheDocument();
    expect(screen.getByText("Notify Message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });
});
