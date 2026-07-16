import { renderHook, act, waitFor } from "@testing-library/react";
import { useApprovalRequest } from "./useApprovalRequest";

global.fetch = jest.fn();

const mockApprovalRequest = {
  id: "1",
  status: "active",
};

describe("useApprovalRequest", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches approval request on mount", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ approval_request: mockApprovalRequest }),
    });

    const { result } = renderHook(() =>
      useApprovalRequest({
        approvalWorkflowInstanceId: "workflow123",
        approvalRequestId: "1234",
        enablePolling: false,
      })
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(fetch).toHaveBeenCalledWith(
      "/api/v2/approval_workflow_instances/workflow123/approval_requests/1234"
    );
    expect(result.current.approvalRequest).toEqual(mockApprovalRequest);
  });

  it("polls data when polling is enabled and status is not terminal", async () => {
    jest.useFakeTimers();

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ approval_request: mockApprovalRequest }),
    });

    const { result } = renderHook(() =>
      useApprovalRequest({
        approvalWorkflowInstanceId: "workflow123",
        approvalRequestId: "1234",
        enablePolling: true,
      })
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(fetch).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
    });
  });

  it("does not poll data when polling is disabled", async () => {
    jest.useFakeTimers();

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ approval_request: mockApprovalRequest }),
    });

    const { result } = renderHook(() =>
      useApprovalRequest({
        approvalWorkflowInstanceId: "workflow123",
        approvalRequestId: "1234",
        enablePolling: false,
      })
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(fetch).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("does not poll data when status is terminal", async () => {
    jest.useFakeTimers();

    const terminalApprovalRequest = {
      ...mockApprovalRequest,
      status: "approved",
    };

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ approval_request: terminalApprovalRequest }),
    });

    const { result } = renderHook(() =>
      useApprovalRequest({
        approvalWorkflowInstanceId: "workflow123",
        approvalRequestId: "1234",
        enablePolling: true,
      })
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(fetch).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
