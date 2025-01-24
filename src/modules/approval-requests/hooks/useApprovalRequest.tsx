import { useEffect, useState } from "react";
import type { ApprovalRequest } from "../types";

export function useApprovalRequest(approvalRequestId: string): {
  approvalRequest: ApprovalRequest | undefined;
  errorFetchingApprovalRequest: unknown;
} {
  const [approvalRequest, setApprovalRequest] = useState<
    ApprovalRequest | undefined
  >();
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchApprovalRequest = async () => {
      try {
        const response = await fetch(
          `/api/v2/approval_workflow_instances/${approvalRequestId}/approval_requests/${approvalRequestId}`
        );

        if (response.ok) {
          const data = await response.json();
          setApprovalRequest(data.approval_request);
        } else {
          throw new Error("Error fetching approval request");
        }
      } catch (error) {
        setError(error);
      }
    };
    fetchApprovalRequest();
  }, [approvalRequestId]);

  return { approvalRequest, errorFetchingApprovalRequest: error };
}
