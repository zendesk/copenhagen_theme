import {
  Field as GardenField,
  Hint,
  Input,
  Label,
  Message,
} from "@zendeskgarden/react-forms";
import type { Field } from "../data-types";

interface TextInputProps {
  field: Field;
}

export function TextInput({ field }: TextInputProps): JSX.Element {
  const { label, error, value, name, required, description } = field;
  return (
    <GardenField>
      <Label>{label}</Label>
      {description && <Hint>{description}</Hint>}
      <Input
        name={name}
        defaultValue={value}
        validation={error ? "error" : undefined}
        required={required}
      />
      {error && <Message validation="error">{error}</Message>}
    </GardenField>
  );
}
