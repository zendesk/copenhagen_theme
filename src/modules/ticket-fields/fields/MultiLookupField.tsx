import type { IComboboxProps } from "@zendeskgarden/react-dropdowns";
import { Field, Combobox, Option } from "@zendeskgarden/react-dropdowns";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  TicketFieldObject,
  TicketFieldOptionObject,
} from "../data-types/TicketFieldObject";
import { Span } from "@zendeskgarden/react-typography";
import debounce from "lodash.debounce";
import { useTranslation } from "react-i18next";
import {
  buildAdvancedDynamicFilterParams,
  getCustomObjectKey,
} from "./LookupField";
import type { CustomObjectRecord } from "../data-types/CustomObjectRecord";

const MAX_SELECTIONS = 20;

interface MultiLookupFieldProps {
  field: TicketFieldObject;
  userId: number;
  organizationId: string | null;
  brandId?: number;
  onChange: (value: string[]) => void;
  visibleFields: TicketFieldObject[];
  buildLookupFieldOptions?: (
    records: CustomObjectRecord[],
    field: TicketFieldObject
  ) => Promise<TicketFieldOptionObject[]>;
  renderOption?: (option: TicketFieldOptionObject) => React.ReactNode;
}

export function MultiLookupField({
  field,
  userId,
  organizationId,
  brandId,
  onChange,
  visibleFields,
  buildLookupFieldOptions,
  renderOption,
}: MultiLookupFieldProps) {
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
  const [selectedOptions, setSelectedOptions] = useState<
    TicketFieldOptionObject[]
  >([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoadingOptions, setIsLoadingOptions] = useState<boolean>(false);
  const { t } = useTranslation();

  const customObjectKey = getCustomObjectKey(
    relationship_target_type as string
  );

  const wrapperRef = useRef<HTMLDivElement>(null);
  const selectedValuesRef = useRef<string[]>([]);
  const selectedValues = selectedOptions.map((o) => o.value);
  selectedValuesRef.current = selectedValues;

  useEffect(() => {
    if (wrapperRef.current && required) {
      const combobox = wrapperRef.current.querySelector("[role=combobox]");
      combobox?.setAttribute("aria-required", "true");
    }
  }, [wrapperRef, required]);

  const isAtLimit = selectedOptions.length >= MAX_SELECTIONS;

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

  const fetchSelectedOptions = useCallback(
    async (recordIds: string[]) => {
      try {
        const params = new URLSearchParams();
        params.set("filter[ids]", recordIds.join(","));
        const res = await fetch(
          `/api/v2/custom_objects/${customObjectKey}/records?${params.toString()}`
        );
        if (res.ok) {
          const { custom_object_records } = await res.json();
          const results: TicketFieldOptionObject[] = custom_object_records.map(
            (record: CustomObjectRecord) => ({
              name: record.name,
              value: record.id,
            })
          );
          setSelectedOptions(results);
          onChange(results.map((o) => o.value));
        }
      } catch {
        // skip failed fetch
      }
    },
    [customObjectKey, onChange]
  );

  const fetchOptions = useCallback(
    async (query: string) => {
      const searchParams = new URLSearchParams();
      searchParams.set("name", query.toLocaleLowerCase());
      searchParams.set("source", "zen:ticket");
      searchParams.set("field_id", fieldId.toString());
      searchParams.set("requester_id", userId.toString());

      const filterPairs = buildAdvancedDynamicFilterParams(
        field.relationship_filter,
        visibleFields
      );

      for (const { key: filterValue, value: fieldValue } of filterPairs) {
        if (!filterValue) continue;

        if (filterValue === "ticket_brand_id") {
          if (brandId) {
            searchParams.set(
              "filter[dynamic_values][ticket_brand_id]",
              brandId.toString()
            );
          }
          continue;
        }

        const filterValueParam = `filter[dynamic_values][${filterValue}]`;
        const fieldValueParam = fieldValue?.toString() || "";
        searchParams.set(filterValueParam, fieldValueParam);
      }

      if (organizationId) searchParams.set("organization_id", organizationId);

      setIsLoadingOptions(true);
      try {
        const response = await fetch(
          `/api/v2/custom_objects/${customObjectKey}/records/autocomplete?${searchParams.toString()}`
        );

        const data = await response.json();
        if (response.ok) {
          const fetchedRecords = data.custom_object_records;

          let newOptions: TicketFieldOptionObject[];

          if (buildLookupFieldOptions) {
            newOptions = await buildLookupFieldOptions(fetchedRecords, field);
          } else {
            newOptions = fetchedRecords.map(
              ({ name, id }: { name: string; id: string }) => ({
                name,
                value: id,
              })
            );
          }

          newOptions = newOptions.filter(
            (option) => !selectedValuesRef.current.includes(option.value)
          );

          setOptions(newOptions);
        } else {
          setOptions([]);
        }
      } catch {
        setOptions([]);
      } finally {
        setIsLoadingOptions(false);
      }
    },
    [
      brandId,
      customObjectKey,
      field,
      fieldId,
      organizationId,
      userId,
      visibleFields,
      buildLookupFieldOptions,
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
    ({ inputValue: newInputValue, selectionValue }) => {
      if (selectionValue !== undefined && Array.isArray(selectionValue)) {
        const newlyAdded = selectionValue.filter(
          (v) => !selectedValuesRef.current.includes(v as string)
        );
        const removed = selectedValuesRef.current.filter(
          (v) => !selectionValue.includes(v)
        );

        if (newlyAdded.length > 0) {
          const addedValue = newlyAdded[0] as string;
          const addedOption = options.find((o) => o.value === addedValue);
          if (addedOption) {
            const updated = [...selectedOptions, addedOption];
            setSelectedOptions(updated);
            onChange(updated.map((o) => o.value));
            setOptions((prev) => prev.filter((o) => o.value !== addedValue));
          }
        } else if (removed.length > 0) {
          const updated = selectedOptions.filter(
            (o) => !removed.includes(o.value)
          );
          setSelectedOptions(updated);
          onChange(updated.map((o) => o.value));
        }

        setInputValue("");
      }

      if (newInputValue !== undefined) {
        setInputValue(newInputValue);
        if (!isAtLimit) {
          debouncedFetchOptions(newInputValue);
        }
      }
    },
    [debouncedFetchOptions, onChange, options, selectedOptions, isAtLimit]
  );

  useEffect(() => {
    if (value && Array.isArray(value) && value.length > 0) {
      fetchSelectedOptions(value as string[]);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onFocus = () => {
    if (!isAtLimit) {
      setInputValue("");
      fetchOptions("*");
    }
  };

  return (
    <Field>
      <Field.Label>
        {label}
        {required && <Span aria-hidden="true">*</Span>}
      </Field.Label>
      {description && (
        <Field.Hint dangerouslySetInnerHTML={{ __html: description }} />
      )}
      <Combobox
        ref={wrapperRef}
        inputProps={{ required }}
        data-test-id="multi-lookup-field-combobox"
        validation={error ? "error" : undefined}
        inputValue={inputValue}
        selectionValue={selectedValues}
        isMultiselectable
        isAutocomplete
        maxHeight="auto"
        placeholder={
          isAtLimit
            ? t(
                "cph-theme-ticket-fields.multi-lookup-field.max-reached",
                "Maximum selections reached"
              )
            : t(
                "cph-theme-ticket-fields.lookup-field.placeholder",
                "Search {{label}}",
                { label }
              )
        }
        onFocus={onFocus}
        onChange={handleChange}
      >
        {selectedOptions.map((opt) => (
          <Option
            key={`selected-${opt.value}`}
            value={opt.value}
            label={opt.name}
            isHidden
          />
        ))}
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
          options.map((option) => (
            <Option
              key={option.value}
              value={option.value}
              label={option.name}
              data-test-id={`option-${option.name}`}
            >
              {renderOption ? renderOption(option) : option.name}
            </Option>
          ))}
      </Combobox>
      {error && <Field.Message validation="error">{error}</Field.Message>}
      {selectedValues.map((val) => (
        <input key={val} type="hidden" name={`${name}[]`} value={val} />
      ))}
    </Field>
  );
}
