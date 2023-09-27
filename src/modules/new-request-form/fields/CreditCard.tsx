import {
  Field as GardenField,
  Hint,
  Input,
  Label,
  Message,
} from "@zendeskgarden/react-forms";
import type { Field } from "../data-types";
import { Span } from "@zendeskgarden/react-typography";
import type { FocusEventHandler } from "react";
import { redactCreditCard } from "../redactCreditCard";

interface CreditCardProps {
  field: Field;
  onChange: (value: string) => void;
}

export function CreditCard({ field, onChange }: CreditCardProps): JSX.Element {
  const { label, error, value, name, required, description } = field;

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    onChange(redactCreditCard(e.target.value));
  };

  return (
    <GardenField>
      <Label>
        {label}
        {required && <Span aria-hidden="true">*</Span>}
      </Label>
      {description && <Hint>{description}</Hint>}
      <Input
        name={name}
        type="text"
        value={value as string}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleBlur}
        validation={error ? "error" : undefined}
        required={required}
      />
      {error && <Message validation="error">{error}</Message>}
    </GardenField>
  );
}
