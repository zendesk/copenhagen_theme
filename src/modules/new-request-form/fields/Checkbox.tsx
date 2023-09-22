import type { ChangeEvent } from "react";
import { useState } from "react";
import type { Field } from "../data-types";
import {
  Label,
  Field as GardenField,
  Hint,
  Checkbox as GardenCheckbox,
  Message,
} from "@zendeskgarden/react-forms";
import { Span } from "@zendeskgarden/react-typography";

interface CheckboxProps {
  field: Field;
}

export function Checkbox({ field }: CheckboxProps): JSX.Element {
  const { label, error, value, name, required, description } = field;
  const [checkboxValue, setCheckboxValue] = useState(value);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckboxValue(e.target.checked ? "on" : "off");
  };

  return (
    <GardenField>
      <input type="hidden" name={name} value="off" />
      <GardenCheckbox
        name={name}
        required={required}
        defaultChecked={value === "on"}
        value={checkboxValue}
        onChange={handleChange}
      >
        <Label>
          {label}
          {required && <Span aria-hidden="true">*</Span>}
        </Label>
        {description && <Hint>{description}</Hint>}
      </GardenCheckbox>
      {error && <Message validation="error">{error}</Message>}
    </GardenField>
  );
}
