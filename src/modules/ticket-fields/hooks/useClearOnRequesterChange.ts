import { useEffect, useRef } from "react";

// Requester-dependent fields (their relationship filter resolves the
// "requester_id" value) must not keep a selection made for a previous
// requester, so clear them when the requester changes (request-on-behalf).
export function useClearOnRequesterChange(
  userId: number | null,
  isRequesterDependent: boolean,
  hasSelection: boolean,
  clearSelection: () => void
) {
  const previousUserIdRef = useRef(userId);
  const clearSelectionRef = useRef(clearSelection);
  clearSelectionRef.current = clearSelection;

  useEffect(() => {
    if (previousUserIdRef.current === userId) return;
    previousUserIdRef.current = userId;

    if (isRequesterDependent && hasSelection) {
      clearSelectionRef.current();
    }
  }, [userId, isRequesterDependent, hasSelection]);
}
