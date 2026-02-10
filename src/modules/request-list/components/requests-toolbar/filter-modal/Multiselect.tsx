import { useEffect, useState } from "react";
import { Combobox, Field, Option } from "@zendeskgarden/react-dropdowns";
import { useDropdownFilter } from "../../../hooks/useDropdownFilter";
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
    if (selectedValues.length > 0) {
      return {
        state: "valid",
        values: selectedValues.map((val): FilterValue => val as FilterValue),
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

  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const { onInputValueChange, matchingOptions, noMatchesOption } =
    useDropdownFilter(options, "value");

  useEffect(() => {
    onSelect(validateForm([]));
  }, []);

  function handleChange(values: string[]) {
    setSelectedValues(values);
    onSelect(validateForm(values));
  }

  return (
    <Field>
      <Field.Label>{label}</Field.Label>
      <Combobox
        isAutocomplete
        isMultiselectable
        selectionValue={selectedValues}
        onChange={(changes) => {
          if (changes.selectionValue !== undefined) {
            handleChange((changes.selectionValue as string[] | null) ?? []);
          }
          if (changes.inputValue !== undefined) {
            onInputValueChange(changes.inputValue);
          }
        }}
        validation={errors.selectedOptions ? "error" : undefined}
        listboxAppendToNode={modalContainer}
      >
        {noMatchesOption ||
          matchingOptions.map((option) => (
            <Option
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
      </Combobox>
      <FieldError errors={errors} field="selectedOptions" />
    </Field>
  );
}
