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
}

export function Multiselect({
  label,
  options,
  onSelect,
  errors,
}: MultiselectProps): JSX.Element {
  const { t } = useTranslation();
  const modalContainer = useModalContainer();

  const validateForm = (selectedValues: string[]): FormState<FormFieldKey> => {
    const selectedOptions = options.filter((option) =>
      selectedValues.includes(option.value)
    );

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

  useEffect(() => {
    onSelect(validateForm([]));
  }, []);

  const [inputValue, setInputValue] = useState("");

  const filteredOptions =
    inputValue === ""
      ? options
      : options.filter(
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
    }

    if (selectionValue !== undefined && selectionValue !== null) {
      const selected = Array.isArray(selectionValue)
        ? selectionValue
        : [selectionValue];

      setSelectedValues(selected);
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
        onChange={handleChange}
        validation={errors.selectedOptions ? "error" : undefined}
        listboxAppendToNode={modalContainer}
      >
        {filteredOptions.length === 0 ? (
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
