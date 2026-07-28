import { useMemo } from "react";
import { parseQueryStringPrefill } from "../utils/parseQueryStringPrefill";

export function useQueryStringPrefill(): Map<string, string> {
  return useMemo(() => {
    if (typeof window === "undefined") {
      return new Map<string, string>();
    }

    return parseQueryStringPrefill(
      window.location.search,
      window.location.href.length
    );
  }, []);
}
