import type {
  Organization,
  AccessibleOrganizationsResponse,
} from "../data-types";
import { toOrganizations } from "./toOrganizations";

// Fetches the first page of the url. Restricted organizations are filtered out
// on the client, so when a page has no viewable organization the next pages are
// fetched until one has some or there are no more pages. `nextPage` is the
// next_page of the last page fetched.
export async function fetchViewableOrganizations(
  firstPageUrl: string,
  init?: RequestInit
): Promise<{ organizations: Organization[]; nextPage: string | null }> {
  let url: string | null = firstPageUrl;
  let organizations: Organization[] = [];
  let nextPage: string | null = null;

  while (url) {
    const response: Response = await fetch(url, init);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const body: AccessibleOrganizationsResponse = await response.json();

    organizations = toOrganizations(body.organizations);
    nextPage = body.next_page;
    url = organizations.length === 0 ? body.next_page : null;
  }

  return { organizations, nextPage };
}
