export interface TicketField {
  id: number;
  type: string;
  active: boolean;
  title: string;
  title_in_portal: string;
  description: string;
  custom_field_options?: CustomFieldOption[];
}

interface CustomFieldOption {
  id: number;
  name: string;
  value: string;
}
