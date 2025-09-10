import { useEffect } from "react";
import { render } from "@testing-library/react";
import { emitNotify } from "../notifyBus";
import { ToastProvider, useToast } from "@zendeskgarden/react-notifications";
import type {
  Content,
  IToastOptions,
} from "@zendeskgarden/react-notifications/dist/typings/elements/toaster/useToast";
import { GlobalNotifications } from "../GlobalNotifications";

describe("useGlobalNotify (via GlobalNotifications)", () => {
  it("subscribes to bus and calls addToast from ToastProvider", () => {
    let captured: Content | null = null;

    function CaptureToasts() {
      const { addToast } = useToast();

      useEffect(() => {
        const intercept = (
          content: Content,
          options?: Partial<IToastOptions>
        ) => {
          captured = content;
          return addToast(content, options);
        };
        emitNotify(() => <div data-testid="toast-from-bus" />);
        intercept(() => <div data-testid="toast-from-bus" />);
      }, [addToast]);

      return <GlobalNotifications />;
    }

    render(
      <ToastProvider>
        <CaptureToasts />
      </ToastProvider>
    );

    expect(captured).not.toBeNull();
    const el = captured!({ close: jest.fn() });
    expect(el.props["data-testid"]).toBe("toast-from-bus");
  });
});
