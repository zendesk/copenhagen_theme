export interface OrganizationMembership {
  organization_id: number;
  default: boolean;
  organization_name: string;
  view_tickets?: boolean;
}
