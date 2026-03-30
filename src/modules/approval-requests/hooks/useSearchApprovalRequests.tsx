import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type {
  ApprovalRequestDropdownStatus,
  SearchApprovalRequest,
} from "../types";

export function useSearchApprovalRequests(): {
  approvalRequests: SearchApprovalRequest[];
  errorFetchingApprovalRequests: unknown;
  approvalRequestStatus: ApprovalRequestDropdownStatus;
  setApprovalRequestStatus: Dispatch<
    SetStateAction<ApprovalRequestDropdownStatus>
  >;
  isLoading: boolean;
} {
  const [approvalRequests, setApprovalRequests] = useState<
    SearchApprovalRequest[]
  >([]);
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [approvalRequestStatus, setApprovalRequestStatus] =
    useState<ApprovalRequestDropdownStatus>("any");

  useEffect(() => {
    const fetchApprovalRequests = async () => {
      setIsLoading(true);
      try {
        const currentUserRequest = await fetch("/api/v2/users/me.json");
        if (!currentUserRequest.ok) {
          throw new Error("Error fetching current user data");
        }
        const currentUser = await currentUserRequest.json();

        // TODO: can be any ULID, the API was implemented this way for future proofing, we will likely need to update the route in the UI to match
        const approvalWorkflowInstanceId = "01JJQFNX5ADZ6PRQCFWRDNKZRD";

        const response = await fetch(
          `/api/v2/approval_workflow_instances/${approvalWorkflowInstanceId}/approval_requests/search${
            approvalRequestStatus === "any"
              ? ""
              : `?status=${approvalRequestStatus}`
          }`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-CSRF-Token": currentUser.user.authenticity_token,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setApprovalRequests(data.approval_requests);
        } else {
          throw new Error("Error fetching approval requests");
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchApprovalRequests();
  }, [approvalRequestStatus]);

  return {
    approvalRequests,
    errorFetchingApprovalRequests: error,
    approvalRequestStatus,
    setApprovalRequestStatus,
    isLoading: isLoading,
  };
}
