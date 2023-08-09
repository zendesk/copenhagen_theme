import {
  Field as GardenField,
  Label,
  Hint,
  Combobox,
  Option,
  Message,
} from "@zendeskgarden/react-dropdowns.next";
import type { Field } from "../data-types";

interface DropDownProps {
  field: Field;
}

export function DropDown({ field }: DropDownProps): JSX.Element {
  const { label, options, error, value, name, required, description } = field;
  return (
    <GardenField>
      <Label>{label}</Label>
      {description && <Hint>{description}</Hint>}
      <Combobox
        inputProps={{ name, required }}
        isEditable={false}
        validation={error ? "error" : undefined}
        renderValue={({ selection }) =>
          selection && "value" in selection
            ? options.find((option) => option.value === selection.value)?.name
            : "-"
        }
      >
        {options.map((option) => (
          <Option
            key={option.value}
            value={option.value}
            isSelected={option.value?.toString() === value?.toString()}
          >
            {option.name}
          </Option>
        ))}
      </Combobox>
      {error && <Message validation="error">{error}</Message>}
    </GardenField>
  );
}
