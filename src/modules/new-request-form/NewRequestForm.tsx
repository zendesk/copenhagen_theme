import type { Field, TicketForm } from "./data-types";
import { TextInput } from "./fields/TextInput";
import { DropDown } from "./fields/DropDown";
import { TicketFormField } from "./ticket-form-field/TicketFormField";

export interface NewRequestFormProps {
  ticketForms: TicketForm[];
  fields: Field[];
}

export function NewRequestForm({ ticketForms, fields }: NewRequestFormProps) {
  return (
    <form>
      <TicketFormField ticketForms={ticketForms} />
      {fields.map((field) => {
        switch (field.type) {
          case "subject":
            return <TextInput field={field} />;
          case "priority":
            return <DropDown field={field} />;
          default:
            return <></>;
        }
      })}
    </form>
  );
}
