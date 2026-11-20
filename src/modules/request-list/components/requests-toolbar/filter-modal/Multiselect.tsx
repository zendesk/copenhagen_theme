import { useEffect, useState } from "react";
import { Combobox, Field, Option } from "@zendeskgarden/react-dropdowns";
import type { FilterValue } from "../../../data-types/FilterValue";
import { FieldError } from "./FieldError";
import type { FormErrors, FormState } from "./FormState";
import { useTranslation } from "react-i18next";
import { useModalContainer } from "../../../../shared/garden-theme/modal-container/useModalContainer";

export interface MultiSelectOption {
  value: FilterValue;
  label: string;
}

type FormFieldKey = "selectedOptions";

interface MultiselectProps {
  label: string;
  options: MultiSelectOption[];
  onSelect: (state: FormState<FormFieldKey>) => void;
  errors: FormErrors<FormFieldKey>;
  onSearch?: (query: string) => void;
  isLoading?: boolean;
}

export function Multiselect({
  label,
  options,
  onSelect,
  errors,
  onSearch,
  isLoading = false,
}: MultiselectProps): JSX.Element {
  const { t } = useTranslation();
  const modalContainer = useModalContainer();

  const validateForm = (selectedValues: string[]): FormState<FormFieldKey> => {
    const selectedOptions = selectedValues.flatMap((value) => {
      const option = availableOptions.find((option) => option.value === value);
      return option ? [option] : [];
    });

    if (selectedOptions.length > 0) {
      return {
        state: "valid",
        values: selectedOptions.map((option): FilterValue => option.value),
      };
    } else {
      return {
        state: "invalid",
        errors: {
          selectedOptions: t(
            "guide-requests-app.filters-modal.multiselect-no-value-error",
            "Select at least one value"
          ),
        },
      };
    }
  };

  const [selectedValues, setSelectedValues] = useState<string[]>(() => {
    return [];
  });
  const [selectedOptions, setSelectedOptions] = useState<MultiSelectOption[]>(
    []
  );
  const availableOptions = onSearch
    ? Array.from(
        new Map(
          [...selectedOptions, ...options].map((option) => [
            option.value,
            option,
          ])
        ).values()
      )
    : options;

  useEffect(() => {
    onSelect(validateForm([]));
  }, []);

  const [inputValue, setInputValue] = useState("");

  const filteredOptions =
    onSearch || inputValue === ""
      ? availableOptions
      : availableOptions.filter(
          (option) =>
            selectedValues.includes(option.value) ||
            option.label
              .trim()
              .toLowerCase()
              .includes(inputValue.trim().toLowerCase())
        );

  const handleChange = (changes: {
    selectionValue?: string | string[] | null;
    inputValue?: string;
  }) => {
    const { inputValue, selectionValue } = changes;

    if (inputValue !== undefined) {
      setInputValue(inputValue);
      onSearch?.(inputValue);
    }

    if (selectionValue !== undefined && selectionValue !== null) {
      const selected = Array.isArray(selectionValue)
        ? selectionValue
        : [selectionValue];

      setSelectedValues(selected);
      setSelectedOptions(
        availableOptions.filter((option) => selected.includes(option.value))
      );
      onSelect(validateForm(selected));
    }
  };

  return (
    <Field>
      <Field.Label>{label}</Field.Label>
      <Combobox
        isAutocomplete
        isMultiselectable
        selectionValue={selectedValues}
        inputValue={inputValue}
        aria-busy={isLoading}
        onChange={handleChange}
        validation={errors.selectedOptions ? "error" : undefined}
        listboxAppendToNode={modalContainer}
      >
        {filteredOptions.length === 0 && !isLoading ? (
          <Option
            isDisabled
            label={t(
              "guide-requests-app.filters-modal.no-matches-found",
              "No matches found"
            )}
            value=""
          />
        ) : (
          filteredOptions.map((option) => (
            <Option
              key={option.value}
              value={option.value}
              label={option.label}
            />
          ))
        )}
      </Combobox>
      <FieldError errors={errors} field="selectedOptions" />
    </Field>
  );
}
