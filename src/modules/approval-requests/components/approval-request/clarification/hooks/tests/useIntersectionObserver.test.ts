import { renderHook } from "@testing-library/react-hooks";
import { act } from "@testing-library/react";
import { useIntersectionObserver } from "../useIntersectionObserver";

describe("useIntersectionObserver", () => {
  let observeMock: jest.Mock;
  let unobserveMock: jest.Mock;

  beforeEach(() => {
    observeMock = jest.fn();
    unobserveMock = jest.fn();

    class IntersectionObserverMock {
      callback: IntersectionObserverCallback;
      constructor(callback: IntersectionObserverCallback) {
        this.callback = callback;
      }
      observe = observeMock;
      unobserve = unobserveMock;
      disconnect = jest.fn();
      takeRecords = jest.fn();
    }

    Object.defineProperty(window, "IntersectionObserver", {
      writable: true,
      configurable: true,
      value: IntersectionObserverMock,
    });
  });

  it("observes element and calls callback on intersect", () => {
    const mockCallback = jest.fn();
    const ref = { current: document.createElement("div") };

    const { unmount } = renderHook(() =>
      useIntersectionObserver(ref as React.RefObject<Element>, mockCallback)
    );

    expect(observeMock).toHaveBeenCalledWith(ref.current);

    act(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const observerInstance = observeMock.mock.instances[0] as any;
      observerInstance.callback([
        { target: ref.current, isIntersecting: true },
      ]);
    });

    expect(mockCallback).toHaveBeenCalledTimes(1);

    unmount();
    expect(unobserveMock).toHaveBeenCalledWith(ref.current);
  });
});
