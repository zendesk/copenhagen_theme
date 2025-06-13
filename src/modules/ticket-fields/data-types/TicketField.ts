import type { BaseTicketField } from "./BaseTicketField";

/**
 * This types represent the structure of a ticket field returned by the
 * [Ticket Fields API](https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_fields/).
 */
export interface TicketField extends BaseTicketField {
  title_in_portal: string;
  required_in_portal: boolean;
  editable_in_portal: boolean;
  custom_field_options: TicketFieldOption[];
}

export interface TicketFieldOption {
  name: string;
  value: string;
  default?: boolean;
}
