import type {
  IComboboxProps,
  OptionValue,
} from "@zendeskgarden/react-dropdowns.next";

import {
  Field as GardenField,
  Label,
  Hint,
  Combobox,
  Option,
  Message,
  OptGroup,
} from "@zendeskgarden/react-dropdowns.next";
import type { Field } from "../data-types";
import { useMemo, useState } from "react";
import type { NestedOption, NestedOptions } from "../buildNestedOptions";
import { buildNestedOptions } from "../buildNestedOptions";

interface MultiSelectProps {
  field: Field;
}

export function MultiSelect({ field }: MultiSelectProps): JSX.Element {
  const { label, options, error, value, name, required, description } = field;

  const nestedOptions: NestedOptions = useMemo(
    () => buildNestedOptions(options),
    [options]
  );
  const [selectedValues, setSelectValues] = useState<string[]>(
    (value as unknown as string[]) || []
  );
  // represents the subgroup chain, for example: ['Color','Special']
  const [subGroupStack, setSubGroupStack] = useState<string[]>([]);
  // indicates the "selected" subgroup, for example: 'Special'
  const [activeSubGroup, setActiveSubOption] = useState<string | null>(null);
  // holds the available options related to the activeSubGroup or the root(default) group.
  const [activeOptions, setActiveOptions] = useState<
    NestedOption[] | undefined
  >(nestedOptions.root);

  const handleChange: IComboboxProps["onChange"] = (changes) => {
    if (Array.isArray(changes.selectionValue)) {
      // for an option like `Color::Special::Radioactive Green` the return will be `Radioactive Green`
      const lastSelectedItem: string = (changes.selectionValue as OptionValue[])
        .slice(-1)
        .toString();

      if (lastSelectedItem == "back") {
        // walks back the subgroup option chain. Example: from: `Color::Special` to ``Color`
        subGroupStack.pop();
        const previousSubGroup: string | undefined =
          subGroupStack.length > 0 ? subGroupStack.slice(-1)[0] : "root";

        setSubGroupStack(subGroupStack);
        previousSubGroup == "root"
          ? setActiveSubOption(null)
          : setActiveSubOption(previousSubGroup!);
        setActiveOptions(nestedOptions[previousSubGroup!]);
      } else if (nestedOptions[lastSelectedItem] !== undefined) {
        // the selected Item represents/matches an option subgroup then move up the group chain
        // Example: if lastSelectedItem = `Color`, the component move up the group chain from root to color
        // and it will update the activeOptions property to display the elements inside `nestedOptions['Color']
        if (!subGroupStack.includes(lastSelectedItem)) {
          subGroupStack.push(lastSelectedItem);
          setSubGroupStack(subGroupStack);
          setActiveSubOption(lastSelectedItem);
          setActiveOptions(nestedOptions[lastSelectedItem]);
        }
      } else {
        // if the lastSelectedItem represents a option Value then we update the component state
        setSelectValues(changes.selectionValue as string[]);
      }
    }
  };

  return (
    <GardenField>
      {(selectedValues as Array<string>).map((selectedValue) => (
        <input
          type="hidden"
          key={selectedValue}
          name={`${name}[]`}
          value={selectedValue}
        />
      ))}
      <Label>{label}</Label>
      {description && <Hint>{description}</Hint>}
      <Combobox
        isMultiselectable
        inputProps={{ required }}
        isEditable={false}
        validation={error ? "error" : undefined}
        onChange={handleChange}
        selectionValue={selectedValues}
      >
        {activeSubGroup && (
          <Option value="back" type="previous">
            Back
          </Option>
        )}

        {activeSubGroup ? (
          <OptGroup aria-label={activeSubGroup}>
            {activeOptions?.map((option) => (
              <Option
                key={option.value}
                value={option.value}
                type={option.type}
                label={option.label}
                isSelected={(selectedValues as Array<string>).includes(
                  option.value!.toString()
                )}
              >
                {option.name}
              </Option>
            ))}
          </OptGroup>
        ) : (
          activeOptions?.map((option) => (
            <Option
              key={option.value}
              value={option.value!}
              label={option.label}
              type={option.type}
              isSelected={(selectedValues as Array<string>).includes(
                option.value!.toString()
              )}
            >
              {option.name}
            </Option>
          ))
        )}
      </Combobox>
      {error && <Message validation="error">{error}</Message>}
    </GardenField>
  );
}
