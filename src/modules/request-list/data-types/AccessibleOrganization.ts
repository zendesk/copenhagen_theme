// Shape of an organization returned by GET /api/v2/organizations/accessible
export interface AccessibleOrganization {
  id: number;
  name: string;
  url: string;
  // False when the organization's tickets are only visible to their requesters.
  view_tickets: boolean;
  // True when access comes through an ancestor organization rather than a direct membership.
  inherited: boolean;
  // True for the user's default organization; null for any other membership
  // and for inherited organizations.
  default: boolean | null;
}

// The endpoint is offset paginated with a fixed page size.
export interface AccessibleOrganizationsResponse {
  organizations: AccessibleOrganization[];
  count: number;
  next_page: string | null;
  previous_page: string | null;
}
