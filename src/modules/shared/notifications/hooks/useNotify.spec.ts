import { renderHook, act } from "@testing-library/react-hooks";
import { useNotify } from "./useNotify";
import {
  subscribeNotify,
  unsubscribeNotify,
  resetNotifyBus,
} from "../notifyBus";
import type { INotificationProps } from "@zendeskgarden/react-notifications";
import type { ToastNotification } from "../ToastNotification";

describe("useNotify", () => {
  beforeEach(() => {
    resetNotifyBus();
  });

  it("emits ToastNotification object to subscribers", () => {
    const fn: jest.MockedFunction<(n: ToastNotification) => void> = jest.fn();
    subscribeNotify(fn);

    const { result } = renderHook(() => useNotify());
    const notify = result.current;

    const payload: ToastNotification = {
      title: "Notify Title",
      message: "Notify Message",
      type: "success" as INotificationProps["type"],
    };

    act(() => {
      notify(payload);
    });

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(payload);

    unsubscribeNotify(fn);
  });
});
