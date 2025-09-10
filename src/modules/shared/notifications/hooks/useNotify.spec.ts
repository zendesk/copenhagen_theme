import { renderHook, act } from "@testing-library/react-hooks";
import { render, screen } from "@testing-library/react";
import { useNotify } from "./useNotify";
import { subscribeNotify } from "../notifyBus";
import type { INotificationProps } from "@zendeskgarden/react-notifications";

describe("useNotify", () => {
  it("emits Content built from JSON payload", () => {
    const fn = jest.fn();
    const unsub = subscribeNotify(fn);

    const { result } = renderHook(() => useNotify());
    const notify = result.current;

    const payload = {
      title: "Notify Title",
      message: "Notify Message",
      type: "success" as INotificationProps["type"],
    };

    act(() => {
      notify(payload);
    });

    expect(fn).toHaveBeenCalledTimes(1);
    const contentFn = fn.mock.calls[0][0];
    render(contentFn({ close: jest.fn() }));

    expect(screen.getByText(payload.title)).toBeInTheDocument();
    expect(screen.getByText(payload.message)).toBeInTheDocument();

    unsub();
  });
});
