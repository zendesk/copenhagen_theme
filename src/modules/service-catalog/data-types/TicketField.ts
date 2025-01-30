export interface TicketField {
  id: number;
  title: string;
  value?: string | string[] | boolean;
  required: boolean;
  description: string;
  type: string;
  custom_field_options: TicketFieldOption[];
  relationship_target_type?: string;
  title_in_portal: string;
  required_in_portal: boolean;
  editable_in_portal: boolean;
}

export interface TicketFieldOption {
  name: string;
  value: string;
  default?: boolean;
}
