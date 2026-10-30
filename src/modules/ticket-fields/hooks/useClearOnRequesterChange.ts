import { useEffect, useRef } from "react";

// Requester-dependent fields (their relationship filter resolves the
// "requester_id" value) show results scoped to the ticket requester, so when
// the requester changes (request-on-behalf) the field must drop anything that
// belonged to the previous requester — selection, options and input — or
// refetch them
export function useClearOnRequesterChange(
  userId: number | null,
  isRequesterDependent: boolean,
  clear: () => void
) {
  const previousUserIdRef = useRef(userId);
  const clearRef = useRef(clear);
  clearRef.current = clear;

  useEffect(() => {
    if (previousUserIdRef.current === userId) return;
    previousUserIdRef.current = userId;

    if (isRequesterDependent) {
      clearRef.current();
    }
  }, [userId, isRequesterDependent]);
}
