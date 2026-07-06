import { useState, useCallback, useEffect } from "react";

interface UseUserViewedApprovalStatusParams {
  approvalRequestId: string | undefined;
  currentUserId: number;
}

/**
 * Hook that tracks whether a user has viewed a specific approval request before, using localStorage.
 */
export function useUserViewedApprovalStatus({
  approvalRequestId,
  currentUserId,
}: UseUserViewedApprovalStatusParams) {
  const isValid = approvalRequestId !== undefined;

  const storage = window.localStorage;
  const storageKey = `userViewedApproval:${currentUserId}:${approvalRequestId}`;

  const getViewedStatus = useCallback((): boolean => {
    if (!isValid) return false;
    try {
      return storage.getItem(storageKey) === "true";
    } catch {
      return false;
    }
  }, [isValid, storage, storageKey]);

  const [hasUserViewedBefore, setHasUserViewedBefore] = useState<boolean>(
    () => {
      return getViewedStatus();
    }
  );

  const markUserViewed = useCallback(() => {
    if (!isValid) return;
    try {
      storage.setItem(storageKey, "true");
      setHasUserViewedBefore(true);
    } catch {
      // ignore errors
    }
  }, [isValid, storage, storageKey]);

  useEffect(() => {
    if (!isValid) return;
    setHasUserViewedBefore(getViewedStatus());
  }, [approvalRequestId, currentUserId, getViewedStatus, isValid]);

  return { hasUserViewedBefore, markUserViewed };
}
