import {
  emitNotify,
  subscribeNotify,
  unsubscribeNotify,
  resetNotifyBus,
} from "./notifyBus";
import type { ToastNotification } from "./ToastNotification";

describe("notifyBus", () => {
  beforeEach(() => {
    resetNotifyBus();
  });

  it("delivers ToastNotification immediately to active subscribers", () => {
    const fn = jest.fn();
    subscribeNotify(fn);

    const notification: ToastNotification = {
      type: "success",
      title: "Hello",
      message: <div data-testid="toast-node" />,
    };

    emitNotify(notification);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn.mock.calls[0][0]).toEqual(notification);
  });

  it("queues notifications before subscription and flushes later", () => {
    const fn = jest.fn();

    const notification: ToastNotification = {
      message: <span data-testid="queued-toast" />,
    };

    emitNotify(notification);
    subscribeNotify(fn);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn.mock.calls[0][0]).toEqual(notification);
  });

  it("does not deliver notifications after unsubscribe", () => {
    const fn = jest.fn();
    subscribeNotify(fn);

    const n1: ToastNotification = { message: "first" };
    emitNotify(n1);
    expect(fn).toHaveBeenCalledWith(n1);

    unsubscribeNotify(fn);

    const n2: ToastNotification = { message: "second" };
    emitNotify(n2);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("supports multiple subscribers and each gets the same notification", () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();

    subscribeNotify(fn1);
    subscribeNotify(fn2);

    const n: ToastNotification = { message: "multi" };
    emitNotify(n);

    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn1).toHaveBeenCalledWith(n);
    expect(fn2).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledWith(n);
  });

  it("resetNotifyBus clears both listeners and queue", () => {
    const fn = jest.fn();

    const queued: ToastNotification = { message: "queued" };
    emitNotify(queued);
    subscribeNotify(fn);

    resetNotifyBus();

    const afterReset: ToastNotification = { message: "after reset" };
    emitNotify(afterReset);

    expect(fn).not.toHaveBeenCalledWith(afterReset);
  });
});
