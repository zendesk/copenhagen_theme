import type { HiddenField } from "../data-types";

interface ParentTicketFieldProps {
  field: HiddenField;
}

export function ParentTicketField({
  field,
}: ParentTicketFieldProps): JSX.Element {
  const { value, name } = field;
  return <input type="hidden" name={name} value={value as string} />;
}
