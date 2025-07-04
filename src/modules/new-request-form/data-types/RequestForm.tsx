import type { EndUserCondition } from "../../ticket-fields/data-types/EndUserCondition";
import type { AttachmentField } from "./AttachmentsField";
import type { HiddenField } from "./HiddenField";
import type { TicketFieldObject } from "../../ticket-fields/data-types/TicketFieldObject";

export interface RequestForm {
  accept_charset: string;
  action: string;
  http_method: string;
  errors: string | null;
  ticket_form_field: TicketFieldObject;
  parent_id_field: HiddenField | null;
  email_field: TicketFieldObject | null;
  cc_field: TicketFieldObject | null;
  organization_field: TicketFieldObject | null;
  due_date_field: TicketFieldObject;
  ticket_fields: TicketFieldObject[];
  end_user_conditions: EndUserCondition[];
  attachments_field: AttachmentField | null;
  inline_attachments_fields: HiddenField[];
  description_mimetype_field: HiddenField;
}
