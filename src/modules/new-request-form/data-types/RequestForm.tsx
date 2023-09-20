import type { Field } from "./Field";
import type { EndUserCondition } from "./EndUserCondition";

export interface RequestForm {
  accept_charset: string;
  action: string;
  http_method: string;
  errors: string | null;
  ticket_forms_instructions: string;
  ticket_form_field: Field;
  parent_id_field: Field;
  fields: Field[];
  end_user_conditions: EndUserCondition[];
}
