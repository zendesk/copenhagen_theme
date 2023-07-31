import type { RequestForm, TicketForm } from "./data-types";
import { TextInput } from "./fields/TextInput";
import { TextArea } from "./fields/TextArea";
import { DropDown } from "./fields/DropDown";
import { TicketFormField } from "./ticket-form-field/TicketFormField";

export interface NewRequestFormProps {
  ticketForms: TicketForm[];
  requestForm: RequestForm;
}

export function NewRequestForm({
  ticketForms,
  requestForm,
}: NewRequestFormProps) {
  const {
    fields,
    action,
    http_method,
    accept_charset,
    ticket_form_field,
    ticket_forms_instructions,
  } = requestForm;

  return (
    <form action={action} method={http_method} acceptCharset={accept_charset}>
      <TicketFormField
        label={ticket_forms_instructions}
        ticketFormField={ticket_form_field}
        ticketForms={ticketForms}
      />
      {fields.map((field) => {
        switch (field.type) {
          case "anonymous_requester_email":
          case "subject":
            return <TextInput field={field} />;
          case "description":
          case "textarea":
            return <TextArea field={field} />;
          case "priority":
            return <DropDown field={field} />;
          default:
            return <></>;
        }
      })}
    </form>
  );
}
