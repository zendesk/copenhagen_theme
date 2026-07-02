import { renderHook, act } from "@testing-library/react-hooks";
import { useUserSearch } from "./useUserSearch";
import type { UserOption } from "../data-types/UserOption";

const userA: UserOption = {
  id: "1",
  name: "Alice",
  email: "alice@example.com",
};
const userB: UserOption = { id: "2", name: "Bob", email: "bob@example.com" };

const okResponse = (users: UserOption[]) => ({
  ok: true,
  json: () => Promise.resolve({ users }),
});

describe("useUserSearch", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("debounces the search and fetches the encoded query", async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValue(okResponse([userA])) as jest.Mock;
    global.fetch = fetchMock;

    const { result } = renderHook(() => useUserSearch(null));

    act(() => {
      result.current.searchUsers("a b");
      result.current.searchUsers("ali");
    });

    // Nothing fires before the debounce window elapses.
    expect(fetchMock).not.toHaveBeenCalled();

    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    // Only the last call fires, once.
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "/hc/api/v2/service_catalog/users?query=ali",
      expect.objectContaining({ signal: expect.any(AbortSignal) })
    );
    expect(result.current.options).toEqual([userA]);
    expect(result.current.isLoadingOptions).toBe(false);
  });

  it("invokes onSearchFired when a debounced search fires", async () => {
    global.fetch = jest.fn().mockResolvedValue(okResponse([])) as jest.Mock;
    const onSearchFired = jest.fn();

    const { result } = renderHook(() => useUserSearch(null, onSearchFired));

    act(() => {
      result.current.searchUsers("ali");
    });
    expect(onSearchFired).not.toHaveBeenCalled();

    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    expect(onSearchFired).toHaveBeenCalledTimes(1);
  });

  it("keeps the selected user first in the results, de-duplicated", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue(okResponse([userB, userA])) as jest.Mock;

    const { result } = renderHook(() => useUserSearch(userA));

    await act(async () => {
      result.current.searchUsers("user");
      jest.advanceTimersByTime(300);
    });

    // userA is hoisted to the front and not duplicated.
    expect(result.current.options).toEqual([userA, userB]);
  });

  it("aborts the previous request when a new search fires", async () => {
    const abortSpy = jest.spyOn(AbortController.prototype, "abort");
    global.fetch = jest
      .fn()
      .mockResolvedValue(okResponse([userA])) as jest.Mock;

    const { result } = renderHook(() => useUserSearch(null));

    // First request goes in flight.
    await act(async () => {
      result.current.searchUsers("ali");
      jest.advanceTimersByTime(300);
    });

    // Second request should abort the first.
    await act(async () => {
      result.current.searchUsers("bob");
      jest.advanceTimersByTime(300);
    });
    // Let any settled promises flush so no state update escapes act().
    await act(async () => {
      await Promise.resolve();
    });

    expect(abortSpy).toHaveBeenCalled();
    abortSpy.mockRestore();
  });

  it("clearOptions cancels pending searches and empties the list", async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValue(okResponse([userA])) as jest.Mock;
    global.fetch = fetchMock;

    const { result } = renderHook(() => useUserSearch(null));

    // Populate options first.
    await act(async () => {
      result.current.searchUsers("ali");
      jest.advanceTimersByTime(300);
    });
    expect(result.current.options).toEqual([userA]);

    // Queue another search, then clear before it fires.
    await act(async () => {
      result.current.searchUsers("bob");
      result.current.clearOptions();
      jest.advanceTimersByTime(300);
    });

    expect(result.current.options).toEqual([]);
    // The queued "bob" search was cancelled, so no second fetch happened.
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("empties options on fetch error", async () => {
    global.fetch = jest
      .fn()
      .mockRejectedValue(new Error("network")) as jest.Mock;
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    const { result } = renderHook(() => useUserSearch(null));

    await act(async () => {
      result.current.searchUsers("ali");
      jest.advanceTimersByTime(300);
    });

    expect(result.current.options).toEqual([]);
    expect(result.current.isLoadingOptions).toBe(false);
    consoleError.mockRestore();
  });
});
