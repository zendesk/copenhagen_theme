import { useState } from "react";

export const useSubmitComment = () => {
  const [isLoading, setIsLoading] = useState(false);

  const submitComment = async (approvalRequestId: string, comment: string) => {
    setIsLoading(true);
    try {
      const currentUserRequest = await fetch("/api/v2/users/me.json");
      if (!currentUserRequest.ok) {
        throw new Error("Error fetching current user data");
      }
      const currentUser = await currentUserRequest.json();

      const response = await fetch(
        `/api/v2/approval_clarification_flow_messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": currentUser.user.authenticity_token,
          },
          body: JSON.stringify({
            approval_request_id: approvalRequestId,
            message: comment,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to submit comment: ${response.status}`);
      }
      const data = await response.json();

      return { success: true, data: data.clarification_flow_messages };
    } finally {
      setIsLoading(false);
    }
  };

  return { submitComment, isLoading };
};
