import { useEffect, useState } from "react";
import type { CustomStatus } from "../data-types";

export function useCustomStatuses(customStatusesEnabled: boolean): {
  customStatuses: CustomStatus[];
  error?: Error;
} {
  const [customStatuses, setCustomStatuses] = useState<CustomStatus[]>([]);
  const [error, setError] = useState<Error | undefined>();

  async function fetchCustomStatuses() {
    if (!customStatusesEnabled) {
      return;
    }

    try {
      const response = await fetch("/api/v2/custom_statuses?active=true");
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const { custom_statuses }: { custom_statuses: CustomStatus[] } =
        await response.json();
      setCustomStatuses(custom_statuses);
    } catch (error) {
      setError(error as Error);
    }
  }

  useEffect(() => {
    fetchCustomStatuses();
  }, []);

  return { customStatuses, error };
}
