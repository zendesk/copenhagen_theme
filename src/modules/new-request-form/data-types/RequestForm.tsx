import type { Field } from "./Field";
import type { EndUserCondition } from "./EndUserCondition";
import type { AttachmentField } from "./AttachmentsField";
import type { HiddenField } from "./HiddenField";

export interface RequestForm {
  accept_charset: string;
  action: string;
  http_method: string;
  errors: string | null;
  ticket_form_field: Field;
  parent_id_field: Field;
  email_field: Field;
  cc_field: Field;
  organization_field: Field;
  due_date_field: Field;
  ticket_fields: Field[];
  end_user_conditions: EndUserCondition[];
  attachments_field: AttachmentField | null;
  inline_attachments_fields: HiddenField[];
  description_mimetype_field: HiddenField;
}
