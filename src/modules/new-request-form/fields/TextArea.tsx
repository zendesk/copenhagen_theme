import {
  Field as GardenField,
  Hint,
  Textarea,
  Label,
  Message,
} from "@zendeskgarden/react-forms";
import type { Field } from "../data-types";

interface TextAreaProps {
  field: Field;
  onChange: (value: string) => void;
}

export function TextArea({ field, onChange }: TextAreaProps): JSX.Element {
  const { label, error, value, name, required, description } = field;
  return (
    <GardenField>
      <Label>{label}</Label>
      {description && <Hint>{description}</Hint>}
      <Textarea
        name={name}
        defaultValue={value as string}
        validation={error ? "error" : undefined}
        required={required}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <Message validation="error">{error}</Message>}
    </GardenField>
  );
}
