import { renderHook, act } from "@testing-library/react-hooks";
import { useOrganizationSearch } from "./useOrganizationSearch";

const okResponse = (
  organizations: { id: number; name: string; shared_tickets?: boolean }[]
) => ({
  ok: true,
  json: () =>
    Promise.resolve({
      organizations: organizations.map((organization) => ({
        url: `/api/v2/organizations/${organization.id}.json`,
        shared_tickets: true,
        inherited: false,
        default: false,
        ...organization,
      })),
      count: organizations.length,
      next_page: null,
      previous_page: null,
    }),
});

describe("useOrganizationSearch", () => {
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
      .mockResolvedValue(okResponse([{ id: 1, name: "Acme" }])) as jest.Mock;
    global.fetch = fetchMock;

    const { result } = renderHook(() => useOrganizationSearch());

    act(() => {
      result.current.search("ac");
      result.current.search("acme co");
    });

    expect(fetchMock).not.toHaveBeenCalled();

    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/v2/organizations/accessible?name=acme%20co",
      expect.objectContaining({ signal: expect.any(AbortSignal) })
    );
    expect(result.current.searchResults).toEqual([
      { id: 1, name: "Acme", default: false },
    ]);
    expect(result.current.isSearching).toBe(false);
  });

  it("excludes organizations whose tickets are not shared", async () => {
    global.fetch = jest.fn().mockResolvedValue(
      okResponse([
        { id: 1, name: "Acme" },
        { id: 2, name: "Acme restricted", shared_tickets: false },
      ])
    ) as jest.Mock;

    const { result } = renderHook(() => useOrganizationSearch());

    await act(async () => {
      result.current.search("acme");
      jest.advanceTimersByTime(300);
    });

    expect(result.current.searchResults).toEqual([
      { id: 1, name: "Acme", default: false },
    ]);
  });

  it("searches from a single character", async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValue(okResponse([{ id: 1, name: "Acme" }])) as jest.Mock;
    global.fetch = fetchMock;

    const { result } = renderHook(() => useOrganizationSearch());

    await act(async () => {
      result.current.search("a");
      jest.advanceTimersByTime(300);
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/v2/organizations/accessible?name=a",
      expect.objectContaining({ signal: expect.any(AbortSignal) })
    );
    expect(result.current.searchResults).toEqual([
      { id: 1, name: "Acme", default: false },
    ]);
  });

  it("does not fetch and clears results for an empty query", async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValue(okResponse([{ id: 1, name: "Acme" }])) as jest.Mock;
    global.fetch = fetchMock;

    const { result } = renderHook(() => useOrganizationSearch());

    await act(async () => {
      result.current.search("acme");
      jest.advanceTimersByTime(300);
    });
    expect(result.current.searchResults).toEqual([
      { id: 1, name: "Acme", default: false },
    ]);

    act(() => {
      result.current.search("   ");
    });

    expect(result.current.searchResults).toBeNull();
    expect(fetchMock).toHaveBeenCalledTimes(1);

    await act(async () => {
      jest.advanceTimersByTime(300);
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("aborts the previous request when a new search fires", async () => {
    const abortSpy = jest.spyOn(AbortController.prototype, "abort");
    global.fetch = jest
      .fn()
      .mockResolvedValue(okResponse([{ id: 1, name: "Acme" }])) as jest.Mock;

    const { result } = renderHook(() => useOrganizationSearch());

    await act(async () => {
      result.current.search("acme");
      jest.advanceTimersByTime(300);
    });

    await act(async () => {
      result.current.search("beta");
      jest.advanceTimersByTime(300);
    });
    await act(async () => {
      await Promise.resolve();
    });

    expect(abortSpy).toHaveBeenCalled();
    abortSpy.mockRestore();
  });

  it("clearSearch cancels pending searches and resets results to null", async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValue(okResponse([{ id: 1, name: "Acme" }])) as jest.Mock;
    global.fetch = fetchMock;

    const { result } = renderHook(() => useOrganizationSearch());

    await act(async () => {
      result.current.search("acme");
      jest.advanceTimersByTime(300);
    });
    expect(result.current.searchResults).toEqual([
      { id: 1, name: "Acme", default: false },
    ]);

    await act(async () => {
      result.current.search("beta");
      result.current.clearSearch();
      jest.advanceTimersByTime(300);
    });

    expect(result.current.searchResults).toBeNull();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("sets an error and stops searching on fetch failure", async () => {
    global.fetch = jest
      .fn()
      .mockRejectedValue(new Error("network")) as jest.Mock;

    const { result } = renderHook(() => useOrganizationSearch());

    await act(async () => {
      result.current.search("acme");
      jest.advanceTimersByTime(300);
    });

    expect(result.current.error).toEqual(new Error("network"));
    expect(result.current.isSearching).toBe(false);
  });
});
