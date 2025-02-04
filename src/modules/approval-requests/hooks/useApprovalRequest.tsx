import { useEffect, useState } from "react";
import type { ApprovalRequest } from "../types";

export function useApprovalRequest(
  approvalWorkflowInstanceId: string,
  approvalRequestId: string
): {
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

  useEffect(() => {
    const fetchApprovalRequest = async () => {
      setIsLoading(true);
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
        setIsLoading(false);
      }
    };
    fetchApprovalRequest();
  }, [approvalRequestId, approvalWorkflowInstanceId]);

  return {
    approvalRequest,
    errorFetchingApprovalRequest: error,
    isLoading,
    setApprovalRequest,
  };
}
