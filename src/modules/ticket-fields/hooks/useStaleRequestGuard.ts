import { useCallback, useRef } from "react";

export function useStaleRequestGuard(userId: number | null) {
  const requesterRef = useRef(userId);
  // Counts requester changes so that a switch A -> B -> A still invalidates
  // requests started for the first A
  const requesterGenerationRef = useRef(0);
  if (requesterRef.current !== userId) {
    requesterRef.current = userId;
    requesterGenerationRef.current++;
  }
  const requestSeqRef = useRef(0);

  return useCallback(() => {
    const requesterGeneration = requesterGenerationRef.current;
    const requestSeq = ++requestSeqRef.current;

    return {
      isStale: () =>
        requesterGeneration !== requesterGenerationRef.current ||
        requestSeq !== requestSeqRef.current,
      isCurrent: () => requestSeq === requestSeqRef.current,
      isRequesterStale: () =>
        requesterGeneration !== requesterGenerationRef.current,
    };
  }, []);
}
