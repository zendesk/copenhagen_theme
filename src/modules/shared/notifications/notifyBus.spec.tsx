import { render, screen } from "@testing-library/react";
import { emitNotify, subscribeNotify } from "./notifyBus";

describe("notifyBus", () => {
  it("delivers Content function to subscribers", () => {
    const fn = jest.fn();
    const unsub = subscribeNotify(fn);

    const testId = "toast-node";
    emitNotify(() => <div data-testid={testId} />);

    expect(fn).toHaveBeenCalledTimes(1);

    const contentFn = fn.mock.calls[0][0];
    render(contentFn({ close: jest.fn() }));
    expect(screen.getByTestId(testId)).toBeInTheDocument();

    unsub();
  });

  it("queues Content before subscription and flushes later", () => {
    const fn = jest.fn();

    const testId = "queued-toast";
    emitNotify(() => <span data-testid={testId} />);

    subscribeNotify(fn);

    const contentFn = fn.mock.calls[0][0];
    render(contentFn({ close: jest.fn() }));
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
