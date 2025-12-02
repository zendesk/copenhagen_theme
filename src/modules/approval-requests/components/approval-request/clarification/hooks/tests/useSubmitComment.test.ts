import { renderHook, act } from "@testing-library/react-hooks";
import { useSubmitComment } from "../useSubmitComment";
import type { ApprovalClarificationFlowMessage } from "../../../../../types";
global.fetch = jest.fn();

describe("useSubmitComment", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return initial values", () => {
    const { result } = renderHook(() => useSubmitComment());
    const { submitComment, isLoading } = result.current;

    expect(submitComment).toBeDefined();
    expect(isLoading).toBe(false);
  });

  it("should call fetch with the correct arguments", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest
        .fn()
        .mockResolvedValueOnce({ user: { authenticity_token: "token" } }),
    });
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest
        .fn()
        .mockResolvedValueOnce({ clarification_flow_messages: [] }),
    });

    const { result } = renderHook(() => useSubmitComment());

    await act(async () => {
      await result.current.submitComment("123", "Test comment");
    });

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith("/api/v2/users/me.json");
    expect(fetch).toHaveBeenCalledWith(
      "/api/v2/approval_clarification_flow_messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": "token",
        },
        body: JSON.stringify({
          approval_request_id: "123",
          message: "Test comment",
        }),
      }
    );
  });

  it("should set isLoading to true while submitting a comment", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest
        .fn()
        .mockResolvedValueOnce({ user: { authenticity_token: "token" } }),
    });
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest
        .fn()
        .mockResolvedValueOnce({ clarification_flow_messages: [] }),
    });

    const { result } = renderHook(() => useSubmitComment());

    let submitPromise: Promise<{
      success: boolean;
      data: ApprovalClarificationFlowMessage[];
    }>;

    act(() => {
      submitPromise = result.current.submitComment("123", "Test comment");
    });

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      await submitPromise;
    });

    expect(result.current.isLoading).toBe(false);
  });

  it("should handle errors when fetching current user fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const { result } = renderHook(() => useSubmitComment());

    await expect(
      act(async () => {
        await result.current.submitComment("123", "Test comment");
      })
    ).rejects.toThrow("Error fetching current user data");

    expect(result.current.isLoading).toBe(false);
  });

  it("should handle errors when comment submission fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest
        .fn()
        .mockResolvedValueOnce({ user: { authenticity_token: "token" } }),
    });
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 422,
    });

    const { result } = renderHook(() => useSubmitComment());

    await expect(
      act(async () => {
        await result.current.submitComment("123", "Test comment");
      })
    ).rejects.toThrow("Failed to submit comment: 422");

    await act(async () => {});

    expect(result.current.isLoading).toBe(false);
  });
});
