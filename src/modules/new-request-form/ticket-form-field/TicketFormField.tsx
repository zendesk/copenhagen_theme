import type { IComboboxProps } from "@zendeskgarden/react-dropdowns.next";
import { createRef, useEffect } from "react";
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

const key = "return-focus-to-ticket-form-field";

export function TicketFormField({
  label,
  ticketFormField,
  ticketForms,
}: TicketFormFieldProps) {
  const ref = createRef<HTMLDivElement>();

  const handleChange: IComboboxProps["onChange"] = ({ selectionValue }) => {
    if (selectionValue && typeof selectionValue === "string") {
      const newUrl = new URL(window.location.origin + selectionValue);

      const currentSearchParams = new URLSearchParams(window.location.search);
      currentSearchParams.delete("ticket_form_id");

      for (const [key, value] of currentSearchParams) {
        newUrl.searchParams.append(key, value);
      }

      sessionStorage.setItem(key, "true");

      window.location.href = newUrl.toString();
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem(key)) {
      sessionStorage.removeItem(key);
      // return focus to the ticket form field dropdown
      // after the page reloads for better a11y
      (ref.current?.firstChild as HTMLElement)?.focus();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <input
        type="hidden"
        name={ticketFormField.name}
        value={ticketFormField.value as string}
      />
      {ticketForms.length > 1 && (
        <GardenField>
          <Label>{label}</Label>
          <Combobox isEditable={false} onChange={handleChange} ref={ref}>
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
