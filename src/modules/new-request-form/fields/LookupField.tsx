import type { IComboboxProps } from "@zendeskgarden/react-dropdowns.next";
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
import SearchIcon from "@zendeskgarden/svg-icons/src/16/search-stroke.svg";
import debounce from "lodash.debounce";
import { useTranslation } from "react-i18next";
import { EmptyValueOption } from "./EmptyValueOption";

function getCustomObjectKey(targetType: string) {
  return targetType.replace("zen:custom_object:", "");
}

const EMPTY_OPTION = {
  value: "",
  name: "-",
};

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
  const [inputValue, setInputValue] = useState<string>(value as string);
  const [isLoadingOptions, setIsLoadingOptions] = useState<boolean>(false);
  const { t } = useTranslation();

  const customObjectKey = getCustomObjectKey(
    relationship_target_type as string
  );

  const loadingOption = {
    name: t("new-request-form.lookupfield.loading-options", "Loading items..."),
    id: "loading",
  };

  const noResultsOption = {
    name: t(
      "new-request-form.lookupfield.no-matches.found",
      "No matches found"
    ),
    id: "no-results",
  };

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
      setInputValue(custom_object_record.name);
      onChange(custom_object_record.id);
    },
    [customObjectKey, onChange]
  );

  const handleChange = useCallback<NonNullable<IComboboxProps["onChange"]>>(
    async ({ inputValue, selectionValue }) => {
      if (selectionValue !== undefined) {
        if (selectionValue == "") {
          setSelectedOption(EMPTY_OPTION);
          setInputValue(EMPTY_OPTION.name);
          onChange(EMPTY_OPTION.value);
        } else fetchSelectedOption(selectionValue as string);
        return;
      }

      if (inputValue !== undefined) {
        setInputValue(inputValue);
        if (inputValue === "") {
          setOptions([]);
          setSelectedOption(null);
          onChange("");
        } else {
          const searchParams = new URLSearchParams();
          searchParams.set("name", inputValue.toLocaleLowerCase());
          searchParams.set("source", "zen:ticket");
          searchParams.set("field_id", fieldId.toString());
          searchParams.set("user_id", userId.toString());

          const response = await fetch(
            `/api/v2/custom_objects/${customObjectKey}/records/autocomplete?${searchParams.toString()}`
          );
          setIsLoadingOptions(true);
          const data = await response.json();
          if (data !== undefined) {
            setIsLoadingOptions(false);
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
      return;
    }
  }, [value]);

  const handleRenderValue = useCallback(() => {
    return selectedOption?.name ?? EMPTY_OPTION.name;
  }, [selectedOption]);

  return (
    <GardenField>
      <Label>
        {label}
        {required && <Span aria-hidden="true">*</Span>}
      </Label>
      {description && (
        <Hint dangerouslySetInnerHTML={{ __html: description }} />
      )}
      <input type="hidden" name={name} value={selectedOption?.value} />
      <Combobox
        inputProps={{ required }}
        startIcon={<SearchIcon />}
        validation={error ? "error" : undefined}
        inputValue={inputValue}
        selectionValue={selectedOption?.value}
        onChange={debounceHandleChange}
        renderValue={handleRenderValue}
      >
        {!required && !isLoadingOptions && (
          <Option value="" label="-">
            <EmptyValueOption />
          </Option>
        )}
        {isLoadingOptions && (
          <Option
            isDisabled
            key={loadingOption.id}
            value={loadingOption.name}
          />
        )}
        {!isLoadingOptions && options.length === 0 && (
          <Option
            isDisabled
            key={noResultsOption.id}
            value={noResultsOption.name}
          />
        )}
        {!isLoadingOptions &&
          options.length !== 0 &&
          options.map((option) => (
            <Option
              key={option.value}
              value={option.value}
              label={option.name}
            />
          ))}
      </Combobox>
      {error && <Message validation="error">{error}</Message>}
    </GardenField>
  );
}
