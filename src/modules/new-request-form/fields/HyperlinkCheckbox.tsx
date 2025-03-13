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
  onChange: (value: boolean) => void;
}

export function HyperLinkCheckbox({ field, onChange }: CheckboxProps): JSX.Element {
  const { label, error, value, name, required, description, termsOfUseLink, privacyNoticeLink } = field;
  const [checkboxValue, setCheckboxValue] = useState(value as boolean);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setCheckboxValue(checked);
    onChange(checked);
  };

  const labelHtml = `
    By submitting this form, you agree to our 
    <a href="${termsOfUseLink}" target="_blank" rel="noopener noreferrer">Terms of Use</a> 
    and 
    <a href="${privacyNoticeLink}" target="_blank" rel="noopener noreferrer">Privacy Notice</a>.
  `;
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
        <Label>
          By submitting this form, you agree to our{" "}
          <a href={termsOfUseLink} target="_blank" rel="noopener noreferrer">
            Terms of Use
          </a>{" "}
          and{" "}
          <a href={privacyNoticeLink} target="_blank" rel="noopener noreferrer">
            Privacy Notice
          </a>.
          {required && <Span aria-hidden="true">*</Span>}
        </Label>
      </GardenCheckbox>
      {description && (
        <Hint>{description}</Hint>
      )}
      {error && <Message validation="error">{error}</Message>}
    </GardenField>
  );
}