import { renderHook } from "@testing-library/react-hooks";
import { useStaleRequestGuard } from "./useStaleRequestGuard";

describe("useStaleRequestGuard", () => {
  const renderGuard = (initialUserId: number | null) =>
    renderHook(({ userId }) => useStaleRequestGuard(userId), {
      initialProps: { userId: initialUserId },
    });

  it("does not mark a request as stale while the requester is unchanged", () => {
    const { result, rerender } = renderGuard(1);

    const request = result.current();
    rerender({ userId: 1 });

    expect(request.isRequesterStale()).toBe(false);
    expect(request.isStale()).toBe(false);
    expect(request.isCurrent()).toBe(true);
  });

  it("marks a request as stale when the requester changes", () => {
    const { result, rerender } = renderGuard(1);

    const request = result.current();
    rerender({ userId: 2 });

    expect(request.isRequesterStale()).toBe(true);
    expect(request.isStale()).toBe(true);
  });

  it("keeps a request stale when the requester switches A -> B -> A", () => {
    const { result, rerender } = renderGuard(1);

    const request = result.current();
    rerender({ userId: 2 });
    rerender({ userId: 1 });

    expect(request.isRequesterStale()).toBe(true);
    expect(request.isStale()).toBe(true);
  });

  it("treats requests started after the requester changed as fresh", () => {
    const { result, rerender } = renderGuard(1);

    rerender({ userId: 2 });
    const request = result.current();

    expect(request.isRequesterStale()).toBe(false);
    expect(request.isStale()).toBe(false);
  });

  it("marks an older request as no longer current once a newer one starts", () => {
    const { result } = renderGuard(1);

    const first = result.current();
    const second = result.current();

    expect(first.isCurrent()).toBe(false);
    expect(first.isStale()).toBe(true);
    expect(second.isCurrent()).toBe(true);
  });
});
