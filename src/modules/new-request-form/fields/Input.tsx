import {
  Field as GardenField,
  Hint,
  Input as GardenInput,
  Label,
  Message,
} from "@zendeskgarden/react-forms";
import type { Field } from "../data-types";

interface InputProps {
  field: Field;
}

export function Input({ field }: InputProps): JSX.Element {
  const { label, error, value, name, required, description, type } = field;
  const stepProp: { step?: string } = {};

  if (type === "integer") stepProp.step = "1";
  if (type === "decimal") stepProp.step = "any";

  return (
    <GardenField>
      <Label>{label}</Label>
      {description && <Hint>{description}</Hint>}
      <GardenInput
        name={name}
        type={type === "text" ? "text" : "number"}
        defaultValue={value}
        validation={error ? "error" : undefined}
        required={required}
        {...stepProp}
      />
      {error && <Message validation="error">{error}</Message>}
    </GardenField>
  );
}
