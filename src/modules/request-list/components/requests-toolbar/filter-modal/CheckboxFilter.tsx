import { Combobox, Field, Option } from "@zendeskgarden/react-dropdowns";
import { useEffect, useState } from "react";
import type { CheckboxFilterValue } from "../../../data-types/FilterValue";
import { useFilterTranslations } from "../i18n";
import { FieldError } from "./FieldError";
import type { FormErrors, FormState } from "./FormState";
import { useTranslation } from "react-i18next";
import { useModalContainer } from "../../../../shared/garden-theme/modal-container/useModalContainer";

type FormFieldKey = "filterValue";

interface CheckboxFilterProps {
  label: string;
  onSelect: (state: FormState<FormFieldKey>) => void;
  errors: FormErrors<FormFieldKey>;
}

export function CheckboxFilter({
  label,
  onSelect,
  errors,
}: CheckboxFilterProps): JSX.Element {
  const { t } = useTranslation();
  const modalContainer = useModalContainer();

  const validateForm = (
    checkboxFilterValue: CheckboxFilterValue | null
  ): FormState<FormFieldKey> => {
    if (checkboxFilterValue === null) {
      return {
        state: "invalid",
        errors: {
          filterValue: t(
            "guide-requests-app.filters-modal.select-value-error",
            "Select a value"
          ),
        },
      };
    }

    return {
      state: "valid",
      values: [checkboxFilterValue],
    };
  };

  const { checkboxFilterValuesI18N } = useFilterTranslations();
  const [value, setValue] = useState<CheckboxFilterValue | null>(null);

  useEffect(() => {
    onSelect(validateForm(null));
  }, []);

  const handleSelect = (item: CheckboxFilterValue) => {
    setValue(item);
    onSelect(validateForm(item));
  };

  const formatDisplayValue = (val: string | null): string => {
    if (!val) return "";
    return checkboxFilterValuesI18N[val as CheckboxFilterValue] || "";
  };

  return (
    <Field>
      <Field.Label>
        {t(
          "guide-requests-app.filters-modal.select-field-value",
          "Select {{field_name}}",
          {
            field_name: label,
          }
        )}
      </Field.Label>
      <Combobox
        isEditable={false}
        selectionValue={value}
        inputValue={formatDisplayValue(value)}
        onChange={(changes) => {
          if (changes.selectionValue !== undefined) {
            handleSelect(changes.selectionValue as CheckboxFilterValue);
          }
        }}
        validation={errors.filterValue ? "error" : undefined}
        listboxAppendToNode={modalContainer}
      >
        <Option label={checkboxFilterValuesI18N[":checked"]} value=":checked" />
        <Option
          label={checkboxFilterValuesI18N[":unchecked"]}
          value=":unchecked"
        />
      </Combobox>
      <FieldError errors={errors} field="filterValue" />
    </Field>
  );
}
