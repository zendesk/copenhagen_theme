import type { ChangeEvent } from "react";
import { useState } from "react";
import type { TicketFieldObject } from "../data-types/TicketFieldObject";
import {
  Field as GardenField,
  Checkbox as GardenCheckbox,
} from "@zendeskgarden/react-forms";
import { Span } from "@zendeskgarden/react-typography";

interface CheckboxProps {
  field: TicketFieldObject;
  onChange: (value: boolean) => void;
}

export function Checkbox({ field, onChange }: CheckboxProps): JSX.Element {
  const { label, error, value, name, required, description } = field;
  const [checkboxValue, setCheckboxValue] = useState(value as boolean);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setCheckboxValue(checked);
    onChange(checked);
  };

  return (
    <GardenField>
      <input type="hidden" name={name} value="off" />
      <GardenCheckbox
        name={name}
        required={required}
        defaultChecked={value as boolean}
        value={checkboxValue ? "on" : "off"}
        onChange={handleChange}
      >
        <GardenField.Label>
          {label}
          {required && <Span aria-hidden="true">*</Span>}
        </GardenField.Label>
        {description && (
          <GardenField.Hint dangerouslySetInnerHTML={{ __html: description }} />
        )}
      </GardenCheckbox>
      {error && (
        <GardenField.Message validation="error">{error}</GardenField.Message>
      )}
    </GardenField>
  );
}
