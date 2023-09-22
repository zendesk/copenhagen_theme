import {
  Field as GardenField,
  Hint,
  Textarea,
  Label,
  Message,
} from "@zendeskgarden/react-forms";
import { Span } from "@zendeskgarden/react-typography";
import type { Field } from "../data-types";

interface TextAreaProps {
  field: Field;
}

export function TextArea({ field }: TextAreaProps): JSX.Element {
  const { label, error, value, name, required, description } = field;
  return (
    <GardenField>
      <Label>
        {label}
        {required && <Span>*</Span>}
      </Label>
      {description && <Hint>{description}</Hint>}
      <Textarea
        name={name}
        defaultValue={value}
        validation={error ? "error" : undefined}
        required={required}
      />
      {error && <Message validation="error">{error}</Message>}
    </GardenField>
  );
}
