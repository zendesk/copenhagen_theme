import type { FieldOption } from "../../ticket-fields/data-types/Field";

export interface TicketField {
  id: number;
  title: string;
  value?: string | string[] | boolean;
  required: boolean;
  description: string;
  type: string;
  custom_field_options: FieldOption[];
  relationship_target_type?: string;
  title_in_portal: string;
  required_in_portal: boolean;
  editable_in_portal: boolean;
}
