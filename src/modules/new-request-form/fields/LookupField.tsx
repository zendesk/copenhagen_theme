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
  onChange: (value: string) => void;
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
  const [selectedOption, setSelectedOption] = useState<FieldOption | null>(
    null
  );

  const customObjectKey = getCustomObjectKey(
    relationship_target_type as string
  );

  const handleChange = useCallback<NonNullable<IComboboxProps["onChange"]>>(
    async ({ inputValue, selectionValue }) => {
      if (inputValue !== undefined) {
        if (inputValue === "") {
          setOptions([]);
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
          console.log(data);
          setOptions(
            data.custom_object_records.map(
              ({ name, id }: { name: string; id: string }) => ({
                name,
                value: id,
              })
            )
          );
          const selected = data.custom_object_records.find(
            (elem: any) => elem.id === selectionValue
          );
          if (selected !== undefined) {
            onChange(selected?.id || "");
            setSelectedOption(selected.name);
          }
        }
      }
    },
    [customObjectKey, fieldId, onChange, userId]
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
      fetch(`/api/v2/custom_objects/${customObjectKey}/records/${value}`)
        .then((res) => res.json())
        .then(({ custom_object_record }) => {
          setOptions([
            { name: custom_object_record.name, value: value as string },
          ]);
        });
    }
  }, [value, customObjectKey, options]);

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
        isAutocomplete
        inputProps={{ name, required }}
        validation={error ? "error" : undefined}
        selectionValue={selectedOption}
        onChange={debounceHandleChange}
      >
        {!required && (
          <Option value="" label="-">
            <EmptyValueOption />
          </Option>
        )}
        {options.map((option) => (
          <Option key={option.value} value={option.value} label={option.name} />
        ))}
      </Combobox>
      {error && <Message validation="error">{error}</Message>}
      {JSON.stringify(options)}
    </GardenField>
  );
}
