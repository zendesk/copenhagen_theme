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
import type {
  TicketFieldObject,
  TicketFieldOptionObject,
} from "../data-types/TicketFieldObject";
import { Span } from "@zendeskgarden/react-typography";
import debounce from "lodash.debounce";
import { useTranslation } from "react-i18next";
import { EmptyValueOption } from "./EmptyValueOption";
import type { LookupRelationshipFieldFilter } from "../data-types/BaseTicketField";

export function buildAdvancedDynamicFilterParams(
  filter?: LookupRelationshipFieldFilter,
  fields: TicketFieldObject[] = []
) {
  if (!filter) return [];

  const dynamicFilters = [
    ...filter.all.filter(
      (f) => f.operator === "matches" || f.operator === "not_matches"
    ),
    ...filter.any.filter(
      (f) => f.operator === "matches" || f.operator === "not_matches"
    ),
  ];

  return dynamicFilters.map((f) => {
    const parsedFilterId = f.value.split("ticket_fields_")[1];
    const field = fields.find(
      (field) => field.id.toString() === parsedFilterId
    );
    return {
      key: f.value,
      value: field?.value ?? null,
    };
  });
}

export function getCustomObjectKey(targetType: string) {
  return targetType.replace("zen:custom_object:", "");
}

const EMPTY_OPTION = {
  value: "",
  name: "-",
};

interface LookupFieldProps {
  field: TicketFieldObject;
  userId: number;
  organizationId: string | null;
  onChange: (value: string) => void;
  visibleFields: TicketFieldObject[];
}

export function LookupField({
  field,
  userId,
  organizationId,
  onChange,
  visibleFields,
}: LookupFieldProps) {
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

  const [options, setOptions] = useState<TicketFieldOptionObject[]>([]);
  const [selectedOption, setSelectedOption] =
    useState<TicketFieldOptionObject | null>(null);
  const [inputValue, setInputValue] = useState<string>(value as string);
  const [isLoadingOptions, setIsLoadingOptions] = useState<boolean>(false);
  const { t } = useTranslation();

  const customObjectKey = getCustomObjectKey(
    relationship_target_type as string
  );

  const loadingOption = {
    name: t(
      "cph-theme-ticket-fields.lookup-field.loading-options",
      "Loading items..."
    ),
    id: "loading",
  };

  const noResultsOption = {
    name: t(
      "cph-theme-ticket-fields.lookup-field.no-matches-found",
      "No matches found"
    ),
    id: "no-results",
  };

  const fetchSelectedOption = useCallback(
    async (selectionValue: string) => {
      try {
        const res = await fetch(
          `/api/v2/custom_objects/${customObjectKey}/records/${selectionValue}`
        );
        if (res.ok) {
          const { custom_object_record } = await res.json();
          const newSelectedOption = {
            name: custom_object_record.name,
            value: custom_object_record.id,
          };
          setSelectedOption(newSelectedOption);
          setInputValue(custom_object_record.name);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [customObjectKey]
  );

  const fetchOptions = useCallback(
    async (inputValue: string) => {
      const searchParams = new URLSearchParams();
      searchParams.set("name", inputValue.toLocaleLowerCase());
      searchParams.set("source", "zen:ticket");
      searchParams.set("field_id", fieldId.toString());
      searchParams.set("requester_id", userId.toString());

      const filterPairs = buildAdvancedDynamicFilterParams(
        field.relationship_filter,
        visibleFields
      );

      for (const { key: filterValue, value: fieldValue } of filterPairs) {
        if (filterValue) {
          const filterValueParam = `filter[dynamic_values][${filterValue}]`;
          const fieldValueParam = fieldValue?.toString() || "";
          searchParams.set(filterValueParam, fieldValueParam);
        }
      }

      if (organizationId) searchParams.set("organization_id", organizationId);

      setIsLoadingOptions(true);
      try {
        const response = await fetch(
          `/api/v2/custom_objects/${customObjectKey}/records/autocomplete?${searchParams.toString()}`
        );

        const data = await response.json();
        if (response.ok) {
          let fetchedOptions = data.custom_object_records.map(
            ({ name, id }: { name: string; id: string }) => ({
              name,
              value: id,
            })
          );
          if (selectedOption) {
            fetchedOptions = fetchedOptions.filter(
              (option: TicketFieldOptionObject) =>
                option.value !== selectedOption.value
            );
            fetchedOptions = [selectedOption, ...fetchedOptions];
          }

          setOptions(fetchedOptions);
        } else {
          setOptions([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingOptions(false);
      }
    },
    [
      customObjectKey,
      field.relationship_filter,
      fieldId,
      organizationId,
      selectedOption,
      userId,
      visibleFields,
    ]
  );

  const debouncedFetchOptions = useMemo(
    () => debounce(fetchOptions, 300),
    [fetchOptions]
  );

  useEffect(() => {
    return () => debouncedFetchOptions.cancel();
  }, [debouncedFetchOptions]);

  const handleChange = useCallback<NonNullable<IComboboxProps["onChange"]>>(
    ({ inputValue, selectionValue }) => {
      if (selectionValue !== undefined) {
        if (selectionValue == "") {
          setSelectedOption(EMPTY_OPTION);
          setInputValue(EMPTY_OPTION.name);
          setOptions([]);
          onChange(EMPTY_OPTION.value);
        } else {
          const selectedOption = options.find(
            (option) => option.value === selectionValue
          );
          if (selectedOption) {
            setInputValue(selectedOption.name);
            setSelectedOption(selectedOption);
            setOptions([selectedOption]);
            onChange(selectedOption.value);
          }
        }
      }

      if (inputValue !== undefined) {
        setInputValue(inputValue);
        debouncedFetchOptions(inputValue);
      }
    },
    [debouncedFetchOptions, onChange, options]
  );

  useEffect(() => {
    if (value) {
      fetchSelectedOption(value as string);
    }
  }, []); //we don't set dependency array as we want this hook to be called only once

  const onFocus = () => {
    setInputValue("");
    fetchOptions("*");
  };

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
        inputProps={{ required }}
        data-test-id="lookup-field-combobox"
        validation={error ? "error" : undefined}
        inputValue={inputValue}
        selectionValue={selectedOption?.value}
        isAutocomplete
        placeholder={t(
          "cph-theme-ticket-fields.lookup-field.placeholder",
          "Search {{label}}",
          { label: label.toLowerCase() }
        )}
        onFocus={onFocus}
        onChange={handleChange}
        renderValue={() =>
          selectedOption ? selectedOption?.name : EMPTY_OPTION.name
        }
      >
        {selectedOption?.name !== EMPTY_OPTION.name && (
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
        {!isLoadingOptions &&
          inputValue?.length > 0 &&
          options.length === 0 && (
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
              data-test-id={`option-${option.name}`}
            />
          ))}
      </Combobox>
      {error && <Message validation="error">{error}</Message>}
      <input type="hidden" name={name} value={selectedOption?.value} />
    </GardenField>
  );
}
