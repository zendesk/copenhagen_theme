import type {
  IComboboxProps,
  ISelectedOption,
} from "@zendeskgarden/react-dropdowns.next";
import {
  Field as GardenField,
  Label,
  Hint,
  Combobox,
  Option,
  Message,
} from "@zendeskgarden/react-dropdowns.next";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Field, FieldOption } from "../data-types";
import { Span } from "@zendeskgarden/react-typography";
import { EmptyValueOption } from "./EmptyValueOption";
import debounce from "lodash.debounce";

function getCustomObjectKey(targetType: string) {
  return targetType.replace("zen:custom_object:", "");
}

interface LookupFieldProps {
  field: Field;
  userId: number;
  onChange: (value: string, option: FieldOption) => void;
}

export function LookupField({ field, userId, onChange }: LookupFieldProps) {
  const {
    id: fieldId,
    label,
    error,
    value,
    name,
    required,
    description,
    relationship_target_type,
  } = field;
  const [options, setOptions] = useState<FieldOption[]>([]);

  console.log("value", field, value);
  const [selectedOption, setSelectedOption] = useState<FieldOption | null>(
    null
  );
  const [inputValue, setInputValue] = useState<string>("");

  const customObjectKey = getCustomObjectKey(
    relationship_target_type as string
  );

  const fetchSelectedOption = useCallback(
    async (selectionValue: string) => {
      const res = await fetch(
        `/api/v2/custom_objects/${customObjectKey}/records/${selectionValue}`
      );
      const { custom_object_record } = await res.json();
      const newSelectedOption = {
        name: custom_object_record.name,
        value: custom_object_record.id,
      };
      setSelectedOption(newSelectedOption);
      setInputValue(custom_object_record.name); // Update input value to show the name
      onChange(custom_object_record.id, newSelectedOption); // Set the hidden input value
    },
    [customObjectKey, onChange]
  );

  const handleChange = useCallback<NonNullable<IComboboxProps["onChange"]>>(
    async ({ inputValue, selectionValue }) => {
      if (selectionValue !== undefined) {
        fetchSelectedOption(selectionValue as string);
        return;
      }

      if (inputValue !== undefined) {
        setInputValue(inputValue);
        if (inputValue === "") {
          setOptions([]);
          setSelectedOption(null);
          onChange("", null);
        } else {
          const searchParams = new URLSearchParams();
          searchParams.set("name", inputValue.toLocaleLowerCase());
          searchParams.set("source", "zen:ticket");
          searchParams.set("field_id", fieldId.toString());
          searchParams.set("user_id", userId.toString());

          const response = await fetch(
            `/api/v2/custom_objects/${customObjectKey}/records/autocomplete?${searchParams.toString()}`
          );
          const data = await response.json();
          setOptions(
            data.custom_object_records.map(
              ({ name, id }: { name: string; id: string }) => ({
                name,
                value: id,
              })
            )
          );
        }
      }
    },
    [customObjectKey, fetchSelectedOption]
  );

  const debounceHandleChange = useMemo(
    () => debounce(handleChange, 300),
    [handleChange]
  );

  useEffect(() => {
    return () => debounceHandleChange.cancel();
  }, [debounceHandleChange]);

  useEffect(() => {
    if (value && !options.find((option) => option.value === value)) {
      fetchSelectedOption(value as string);
    }
  }, [value, options, fetchSelectedOption]);

  return (
    <GardenField>
      <Label>
        {label}
        {required && <Span aria-hidden="true">*</Span>}
      </Label>
      {description && (
        <Hint dangerouslySetInnerHTML={{ __html: description }} />
      )}
      <Combobox
        inputProps={{ name, required }}
        validation={error ? "error" : undefined}
        inputValue={inputValue}
        selectionValue={selectedOption?.value}
        onChange={debounceHandleChange}
      >
        {!required && (
          <Option value="" label="-">
            <EmptyValueOption />
          </Option>
        )}
        {options.length === 0 ? (
          <Option isDisabled label="" value="No matches found" />
        ) : (
          options.map((option) => (
            <Option
              key={option.value}
              value={option.value}
              label={option.name}
            />
          ))
        )}
      </Combobox>
      {error && <Message validation="error">{error}</Message>}
      {JSON.stringify(options)}
    </GardenField>
  );
}
