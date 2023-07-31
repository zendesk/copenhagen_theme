import type { IComboboxProps } from "@zendeskgarden/react-dropdowns.next";
import {
  Combobox,
  Field as GardenField,
  Label,
  Option,
} from "@zendeskgarden/react-dropdowns.next";
import type { TicketForm } from "../data-types/TicketForm";
import type { Field } from "../data-types";

interface TicketFormFieldProps {
  label: string;
  ticketFormField: Field;
  ticketForms: TicketForm[];
}

export function TicketFormField({
  label,
  ticketFormField,
  ticketForms,
}: TicketFormFieldProps) {
  const handleChange: IComboboxProps["onChange"] = ({ selectionValue }) => {
    if (selectionValue && typeof selectionValue === "string") {
      const newUrl = new URL(window.location.origin + selectionValue);

      const currentSearchParams = new URLSearchParams(window.location.search);
      currentSearchParams.delete("ticket_form_id");

      for (const [key, value] of currentSearchParams) {
        newUrl.searchParams.append(key, value);
      }

      window.location.href = newUrl.toString();
    }
  };

  return (
    <>
      <input
        type="hidden"
        name={ticketFormField.name}
        value={ticketFormField.value}
      />
      {ticketForms.length > 1 && (
        <GardenField>
          <Label>{label}</Label>
          <Combobox isEditable={false} onChange={handleChange}>
            {ticketForms.map(({ id, url, display_name }) => (
              <Option
                key={id}
                value={url}
                label={display_name}
                isSelected={ticketFormField.value === id}
              >
                {display_name}
              </Option>
            ))}
          </Combobox>
        </GardenField>
      )}
    </>
  );
}
