import type { IComboboxProps } from "@zendeskgarden/react-dropdowns.next";
import {
  Field as GardenField,
  Label,
  Hint,
  Combobox,
  Option,
  Message,
} from "@zendeskgarden/react-dropdowns.next";
import type { Field } from "../data-types";
import { useState } from "react";

interface CcFieldProps {
  field: Field;
}

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function CcField({ field }: CcFieldProps): JSX.Element {
  const { label, error, value, name, description } = field;
  const initialOptions = value ? value.split(",").map((v) => v.trim()) : [];
  const [options, setOptions] = useState<string[]>(initialOptions);
  const [selectionValue, setSelectionValue] =
    useState<string[]>(initialOptions);
  const [inputValue, setInputValue] = useState("");

  const handleChange: IComboboxProps["onChange"] = (changes) => {
    console.log(changes);
    const newSelectionValue =
      changes.selectionValue !== undefined &&
      Array.isArray(changes.selectionValue)
        ? changes.selectionValue
        : selectionValue;

    if (changes.selectionValue !== undefined) {
      setSelectionValue(newSelectionValue);
    }

    if (changes.inputValue === undefined) {
      setOptions(newSelectionValue);
    } else {
      setInputValue(changes.inputValue);
      if (changes.inputValue === "") {
        setOptions(newSelectionValue);
      } else {
        const regex = new RegExp(
          changes.inputValue.replace(/[.*+?^${}()|[\]\\]/giu, "\\$&"),
          "giu"
        );

        setOptions(newSelectionValue.filter((option) => option.match(regex)));
      }
    }
  };

  return (
    <GardenField>
      <Label>{label}</Label>
      {description && <Hint>{description}</Hint>}
      <Combobox
        isAutocomplete
        isMultiselectable
        maxHeight="auto"
        onChange={handleChange}
        inputValue={inputValue}
        selectionValue={selectionValue}
      >
        {options.length === 0 ? (
          <Option
            isDisabled
            label=""
            value="Enter a valid e-mail address to add it"
          />
        ) : (
          options.map((value) => <Option key={value} value={value} />)
        )}
        {inputValue.trim() &&
          !selectionValue.includes(inputValue) &&
          EMAIL_REGEX.test(inputValue) && (
            <Option value={inputValue} type="add">
              Add {inputValue}
            </Option>
          )}
      </Combobox>
      {error && <Message validation="error">{error}</Message>}
      {selectionValue.map((value) => (
        <input key="value" type="hidden" name={name} value={value} />
      ))}
    </GardenField>
  );
}
