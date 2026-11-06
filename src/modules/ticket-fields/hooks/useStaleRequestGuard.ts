import { useCallback, useRef } from "react";

export function useStaleRequestGuard(userId: number | null) {
  const requesterRef = useRef(userId);
  requesterRef.current = userId;
  const requestSeqRef = useRef(0);

  return useCallback(() => {
    const requesterId = requesterRef.current;
    const requestSeq = ++requestSeqRef.current;

    return {
      isStale: () =>
        requesterId !== requesterRef.current ||
        requestSeq !== requestSeqRef.current,
      isCurrent: () => requestSeq === requestSeqRef.current,
      isRequesterStale: () => requesterId !== requesterRef.current,
    };
  }, []);
}
