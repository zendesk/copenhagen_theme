import { useCallback, useEffect, useState } from "react";
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

  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [inputValue, setInputValue] = useState("");

  const validateForm = useCallback(
    (selectedLabels: string[]): FormState<FormFieldKey> => {
      const selectedOptions = options.filter((option) =>
        selectedLabels.includes(option.label)
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
    },
    [options, t]
  );

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  const handleChange = useCallback(
    (changes: {
      selectionValue?: string | string[] | null;
      inputValue?: string;
    }) => {
      const { inputValue, selectionValue } = changes;

      if (inputValue !== undefined) {
        setInputValue(inputValue);

        if (inputValue === "") {
          setFilteredOptions(options);
        } else {
          const matchedOptions = options.filter((option) => {
            return option.label
              .trim()
              .toLowerCase()
              .includes(inputValue.trim().toLowerCase());
          });

          setFilteredOptions(matchedOptions);
        }
      }

      if (selectionValue !== undefined) {
        const selectedLabels = (selectionValue as string[] | null) ?? [];
        setSelectedValues(selectedLabels);
        onSelect(validateForm(selectedLabels));
      }
    },
    [options, onSelect, validateForm]
  );

  useEffect(() => {
    onSelect({
      state: "invalid",
      errors: {
        selectedOptions: t(
          "guide-requests-app.filters-modal.multiselect-no-value-error",
          "Select at least one value"
        ),
      },
    });
  }, [onSelect, t]);

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
              value={option.label}
              label={option.label}
            />
          ))
        )}
      </Combobox>
      <FieldError errors={errors} field="selectedOptions" />
    </Field>
  );
}
