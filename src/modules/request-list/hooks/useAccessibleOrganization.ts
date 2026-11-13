import { useEffect, useState } from "react";
import type {
  Organization,
  AccessibleOrganizationResponse,
} from "../data-types";
import withAbort from "../utils/withAbort";
import { toOrganizations } from "../utils/toOrganizations";

// Fetches one accessible organization by id, for a selected organization that
// is not in the loaded first page (e.g. an organization id from a link). Pass
// undefined to skip the request. The result is null while loading, when the
// user cannot view the organization's tickets, and when the request fails:
// a missing name must not break the requests list.
export function useAccessibleOrganization(organizationId?: number): {
  organization: Organization | null;
  isLoading: boolean;
} {
  const [result, setResult] = useState<{
    organizationId: number;
    organization: Organization | null;
  } | null>(null);

  useEffect(() => {
    if (organizationId === undefined) {
      return;
    }

    return withAbort(async (signal) => {
      try {
        const response = await fetch(
          `/api/v2/organizations/accessible/${organizationId}`,
          { signal }
        );
        if (!response.ok) {
          setResult({ organizationId, organization: null });
          return;
        }
        const { organization }: AccessibleOrganizationResponse =
          await response.json();

        setResult({
          organizationId,
          organization: toOrganizations([organization])[0] ?? null,
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setResult({ organizationId, organization: null });
      }
    });
  }, [organizationId]);

  // A result for a previous id is never returned for the current one.
  const isCurrent =
    organizationId !== undefined && result?.organizationId === organizationId;

  return {
    organization: isCurrent ? result.organization : null,
    isLoading: organizationId !== undefined && !isCurrent,
  };
}
