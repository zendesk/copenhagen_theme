import type { ISelectedOption } from "@zendeskgarden/react-dropdowns.next";
import {
  Field as GardenField,
  Label,
  Hint,
  Combobox,
  Option,
  Message,
} from "@zendeskgarden/react-dropdowns.next";
import { Span } from "@zendeskgarden/react-typography";
import type { Field } from "../data-types";

interface DropDownProps {
  field: Field;
  onChange: (value: string) => void;
}

export function DropDown({ field, onChange }: DropDownProps): JSX.Element {
  const { label, options, error, value, name, required, description } = field;
  const selectionValue = value == null ? "" : value.toString();

  return (
    <GardenField>
      <Label>
        {label}
        {required && <Span aria-hidden="true">*</Span>}
      </Label>
      {description && <Hint>{description}</Hint>}
      <Combobox
        inputProps={{ name, required }}
        isEditable={false}
        validation={error ? "error" : undefined}
        inputValue={selectionValue}
        selectionValue={selectionValue}
        renderValue={({ selection }) =>
          (selection as ISelectedOption | null)?.label || "-"
        }
        onChange={({ selectionValue }) => {
          if (selectionValue !== undefined) {
            onChange(selectionValue as string);
          }
        }}
      >
        {!required && <Option value="" label="-" />}
        {options.map((option) => (
          <Option
            key={option.value}
            value={option.value.toString()}
            label={option.name}
          />
        ))}
      </Combobox>
      {error && <Message validation="error">{error}</Message>}
    </GardenField>
  );
}
