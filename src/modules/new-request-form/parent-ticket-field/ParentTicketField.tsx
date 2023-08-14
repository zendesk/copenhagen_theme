import type { Field } from "../data-types";

interface ParentTicketFieldProps {
  field: Field;
}

export function ParentTicketField({ field }: ParentTicketFieldProps): JSX.Element {
  const { value, name } = field;
  return (
    <input
      type="hidden"
      name={name}
      value={value}
    />
  );
}
