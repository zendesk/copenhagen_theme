import { useDownshiftEnvironment } from "../../../../shared/garden-shadow/src/useDownshiftEnvironment";
import {
  Dropdown,
  Field,
  Item,
  Label,
  Select,
} from "@zendeskgarden/react-dropdowns.legacy";
import { useEffect, useState } from "react";
import type { CheckboxFilterValue } from "../../../data-types/FilterValue";
import { useFilterTranslations } from "../i18n";
import { FieldError } from "./FieldError";
import type { FormErrors, FormState } from "./FormState";
import { useTranslation } from "react-i18next";
import { ModalMenu } from "../../modal-menu/ModalMenu";

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
  const downshiftEnvironment = useDownshiftEnvironment();

  useEffect(() => {
    onSelect(validateForm(null));
  }, []);

  const handleSelect = (item: CheckboxFilterValue) => {
    setValue(item);
    onSelect(validateForm(item));
  };

  return (
    <Dropdown
      selectedItem={value}
      onSelect={handleSelect}
      downshiftProps={{ environment: downshiftEnvironment }}
    >
      <Field>
        <Label>
          {t(
            "guide-requests-app.filters-modal.select-field-value",
            "Select {{field_name}}",
            {
              field_name: label,
            }
          )}
        </Label>
        <Select validation={errors.filterValue ? "error" : undefined}>
          {value ? checkboxFilterValuesI18N[value] : ""}
        </Select>
        <FieldError errors={errors} field="filterValue" />
      </Field>
      <ModalMenu>
        <Item value=":checked">{checkboxFilterValuesI18N[":checked"]}</Item>
        <Item value=":unchecked">{checkboxFilterValuesI18N[":unchecked"]}</Item>
      </ModalMenu>
    </Dropdown>
  );
}
