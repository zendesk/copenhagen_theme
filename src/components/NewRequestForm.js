import React from "react";
import {
  Combobox,
  Option,
  Field,
  Label,
} from "@zendeskgarden/react-dropdowns.next";

export default function NewRequestForm({ ticketForms }) {
  return (
    <form>
      <TicketFormField ticketForms={ticketForms} />
    </form>
  );
}

function TicketFormField({ ticketForms }) {
  const { options } = ticketForms;

  function handleChange({ selectionValue }) {
    if (selectionValue) {
      window.location.href = selectionValue;
    }
  }

  return (
    <Field>
      <Label>Please choose your issue below</Label>
      <Combobox isEditable={false} onChange={handleChange}>
        {options.map(({ id, url, name }) => (
          <Option key={id} value={url} label={name}>
            {name}
          </Option>
        ))}
      </Combobox>
    </Field>
  );
}
