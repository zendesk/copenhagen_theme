import {
  Field as GardenField,
  Hint,
  Input as GardenInput,
  Label,
  Message,
} from "@zendeskgarden/react-forms";
import { Span } from "@zendeskgarden/react-typography";
import type { TicketFieldObject } from "../data-types/TicketFieldObject";

interface InputProps {
  field: TicketFieldObject;
  onChange?: (value: string) => void;
}

export function Input({ field, onChange }: InputProps): JSX.Element {
  const { label, error, value, name, required, description, type } = field;
  const stepProp: { step?: string } = {};
  const inputType =
    type === "integer" || type === "decimal" ? "number" : "text";

  if (type === "integer") stepProp.step = "1";
  if (type === "decimal") stepProp.step = "any";

  const autocomplete =
    type === "anonymous_requester_email" ? "email" : undefined;

  return (
    <GardenField>
      <Label>
        {label}
        {required && <Span aria-hidden="true">*</Span>}
      </Label>
      {description && (
        <Hint dangerouslySetInnerHTML={{ __html: description }} />
      )}
      <GardenInput
        name={name}
        type={inputType}
        defaultValue={value as string}
        validation={error ? "error" : undefined}
        required={required}
        onChange={(e) => {
          onChange && onChange(e.target.value);
        }}
        autoComplete={autocomplete}
        {...stepProp}
      />
      {error && <Message validation="error">{error}</Message>}
    </GardenField>
  );
}
