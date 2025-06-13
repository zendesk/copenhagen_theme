import type { IComboboxProps } from "@zendeskgarden/react-dropdowns.next";
import { createRef, useEffect } from "react";
import {
  Combobox,
  Field as GardenField,
  Label,
  Option,
} from "@zendeskgarden/react-dropdowns.next";
import type { TicketFieldObject } from "../../ticket-fields/data-types/TicketFieldObject";

interface TicketFormFieldProps {
  field: TicketFieldObject;
  newRequestPath: string;
}

const key = "return-focus-to-ticket-form-field";

export function TicketFormField({
  field,
  newRequestPath,
}: TicketFormFieldProps) {
  const ref = createRef<HTMLDivElement>();

  const handleChange: IComboboxProps["onChange"] = ({ selectionValue }) => {
    if (selectionValue && typeof selectionValue === "number") {
      const url = new URL(window.location.href);
      const searchParams = url.searchParams;

      searchParams.set("ticket_form_id", selectionValue);

      sessionStorage.setItem(key, "true");

      window.location.assign(`${newRequestPath}${url.search}`);
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
      <input type="hidden" name={field.name} value={field.value as string} />
      {field.options.length > 1 && (
        <GardenField>
          <Label>{field.label}</Label>
          <Combobox isEditable={false} onChange={handleChange} ref={ref}>
            {field.options.map((option) => (
              <Option
                key={option.value}
                value={option.value}
                label={option.name}
                isSelected={field.value === option.value}
              >
                {option.name}
              </Option>
            ))}
          </Combobox>
        </GardenField>
      )}
    </>
  );
}
