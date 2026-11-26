import { renderHook } from "@testing-library/react-hooks";
import type { AccessibleOrganization } from "../data-types";
import { useAccessibleOrganization } from "./useAccessibleOrganization";

const accessibleOrganization = (
  overrides: Partial<AccessibleOrganization> & { id: number; name: string }
): AccessibleOrganization => ({
  url: `/api/v2/organizations/${overrides.id}.json`,
  view_tickets: true,
  inherited: true,
  default: null,
  ...overrides,
});

const okResponse = (organization: AccessibleOrganization) => ({
  ok: true,
  json: () => Promise.resolve({ organization }),
});

describe("useAccessibleOrganization", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  test("does not fetch without an organization id", () => {
    const { result } = renderHook(() => useAccessibleOrganization(undefined));

    expect(global.fetch).not.toHaveBeenCalled();
    expect(result.current).toEqual({ organization: null, isLoading: false });
  });

  test("fetches the organization from the accessible by-id endpoint", async () => {
    (global.fetch as jest.Mock).mockResolvedValue(
      okResponse(accessibleOrganization({ id: 99, name: "Zebra Inc" }))
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useAccessibleOrganization(99)
    );

    expect(result.current).toEqual({ organization: null, isLoading: true });

    await waitForNextUpdate();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/v2/organizations/accessible/99",
      expect.objectContaining({ signal: expect.any(AbortSignal) })
    );
    expect(result.current).toEqual({
      organization: { id: 99, name: "Zebra Inc", default: null },
      isLoading: false,
    });
  });

  test("returns no organization when the user cannot view its tickets", async () => {
    (global.fetch as jest.Mock).mockResolvedValue(
      okResponse(
        accessibleOrganization({
          id: 99,
          name: "Restricted",
          view_tickets: false,
        })
      )
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useAccessibleOrganization(99)
    );
    await waitForNextUpdate();

    expect(result.current).toEqual({ organization: null, isLoading: false });
  });

  test.each([
    [403, "Forbidden"],
    [404, "Not Found"],
    [500, "Internal Server Error"],
  ])(
    "returns no organization without throwing on a %i response",
    async (status, statusText) => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status,
        statusText,
      });

      const { result, waitForNextUpdate } = renderHook(() =>
        useAccessibleOrganization(99)
      );
      await waitForNextUpdate();

      expect(result.current).toEqual({ organization: null, isLoading: false });
    }
  );

  test("returns no organization when the request fails", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

    const { result, waitForNextUpdate } = renderHook(() =>
      useAccessibleOrganization(99)
    );
    await waitForNextUpdate();

    expect(result.current).toEqual({ organization: null, isLoading: false });
  });

  test("does not fetch again when re-rendered with the same id", async () => {
    (global.fetch as jest.Mock).mockResolvedValue(
      okResponse(accessibleOrganization({ id: 99, name: "Zebra Inc" }))
    );

    const { rerender, waitForNextUpdate } = renderHook(() =>
      useAccessibleOrganization(99)
    );
    await waitForNextUpdate();
    rerender();

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test("aborts the previous request and ignores its result when the id changes", async () => {
    const signals: AbortSignal[] = [];
    let resolveFirst: (value: unknown) => void = () => undefined;
    (global.fetch as jest.Mock)
      .mockImplementationOnce((_url: string, init: RequestInit) => {
        signals.push(init.signal as AbortSignal);
        return new Promise((resolve) => {
          resolveFirst = resolve;
        });
      })
      .mockImplementationOnce((_url: string, init: RequestInit) => {
        signals.push(init.signal as AbortSignal);
        return Promise.resolve(
          okResponse(accessibleOrganization({ id: 2, name: "Second" }))
        );
      });

    const { result, rerender, waitForNextUpdate } = renderHook(
      ({ id }) => useAccessibleOrganization(id),
      { initialProps: { id: 1 } }
    );
    rerender({ id: 2 });
    await waitForNextUpdate();

    expect(signals[0]?.aborted).toBe(true);
    expect(result.current.organization).toEqual({
      id: 2,
      name: "Second",
      default: null,
    });

    resolveFirst(okResponse(accessibleOrganization({ id: 1, name: "First" })));
    await Promise.resolve();

    expect(result.current.organization?.name).toBe("Second");
  });

  test("stops returning the organization when the id is cleared", async () => {
    (global.fetch as jest.Mock).mockResolvedValue(
      okResponse(accessibleOrganization({ id: 99, name: "Zebra Inc" }))
    );

    const { result, rerender, waitForNextUpdate } = renderHook(
      ({ id }: { id?: number }) => useAccessibleOrganization(id),
      { initialProps: { id: 99 } as { id?: number } }
    );
    await waitForNextUpdate();
    rerender({ id: undefined });

    expect(result.current).toEqual({ organization: null, isLoading: false });
  });
});
