import type { Field } from "./Field";

export interface RequestForm {
  accept_charset: string;
  action: string;
  http_method: string;
  errors: string | null;
  ticket_forms_instructions: string;
  ticket_form_field: Field;
  fields: Field[];
}
