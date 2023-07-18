import type { IComboboxProps } from "@zendeskgarden/react-dropdowns.next";
import {
  Combobox,
  Field,
  Label,
  Option,
} from "@zendeskgarden/react-dropdowns.next";
import type { TicketForm } from "./types";

interface TicketFormFieldProps {
  ticketForms: TicketForm[];
}

export function TicketFormField({ ticketForms }: TicketFormFieldProps) {
  const handleChange: IComboboxProps["onChange"] = ({ selectionValue }) => {
    if (selectionValue && typeof selectionValue === "string") {
      window.location.href = selectionValue;
    }
  };

  return (
    <Field>
      <Label>Please choose your issue below</Label>
      <Combobox isEditable={false} onChange={handleChange}>
        {ticketForms.map(({ id, url, name }) => (
          <Option key={id} value={url} label={name}>
            {name}
          </Option>
        ))}
      </Combobox>
    </Field>
  );
}
