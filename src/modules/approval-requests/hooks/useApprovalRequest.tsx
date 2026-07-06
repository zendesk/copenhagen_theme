import { useCallback, useEffect, useRef, useState } from "react";
import type { ApprovalRequest } from "../types";

export function useApprovalRequest({
  approvalWorkflowInstanceId,
  approvalRequestId,
  enablePolling,
}: {
  approvalWorkflowInstanceId: string;
  approvalRequestId: string;
  enablePolling: boolean;
}): {
  approvalRequest: ApprovalRequest | undefined;
  errorFetchingApprovalRequest: unknown;
  isLoading: boolean;
  setApprovalRequest: (approvalRequest: ApprovalRequest) => void;
} {
  const [approvalRequest, setApprovalRequest] = useState<
    ApprovalRequest | undefined
  >();
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isInitialLoad = useRef(true);

  const isTerminalStatus =
    !!approvalRequest?.status &&
    (approvalRequest?.status === "withdrawn" ||
      approvalRequest?.status === "approved" ||
      approvalRequest?.status === "rejected");

  const shouldPoll = enablePolling && !isTerminalStatus;

  const fetchApprovalRequest = useCallback(async () => {
    if (isInitialLoad.current) {
      setIsLoading(true);
    }

    try {
      const response = await fetch(
        `/api/v2/approval_workflow_instances/${approvalWorkflowInstanceId}/approval_requests/${approvalRequestId}`
      );

      if (response.ok) {
        const data = await response.json();
        setApprovalRequest(data.approval_request);
      } else {
        throw new Error("Error fetching approval request");
      }
    } catch (error) {
      setError(error);
    } finally {
      if (isInitialLoad.current) {
        setIsLoading(false);
        isInitialLoad.current = false;
      }
    }
  }, [approvalRequestId, approvalWorkflowInstanceId]);

  useEffect(() => {
    fetchApprovalRequest();
  }, [approvalRequestId, approvalWorkflowInstanceId]);

  useEffect(() => {
    if (shouldPoll) {
      const intervalId = setInterval(() => {
        fetchApprovalRequest();
      }, 10000);

      return () => {
        clearInterval(intervalId);
      };
    }
    return;
  }, [fetchApprovalRequest, shouldPoll]);

  return {
    approvalRequest,
    errorFetchingApprovalRequest: error,
    isLoading,
    setApprovalRequest,
  };
}
