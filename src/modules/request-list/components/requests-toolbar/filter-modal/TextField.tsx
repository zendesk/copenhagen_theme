import { Field, Input } from "@zendeskgarden/react-forms";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { FieldError } from "./FieldError";
import type { FilterTypeKey, FilterTypeValue } from "./FilterTypeDropdown";
import { FilterTypeDropdown } from "./FilterTypeDropdown";
import type { FormErrors, FormState } from "./FormState";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

type FormFieldKey = FilterTypeKey | "textValue";

interface TextFieldProps {
  label: string;
  onSelect: (state: FormState) => void;
  errors: FormErrors<FormFieldKey>;
}

const Gap = styled.div`
  height: ${(p) => p.theme.space.md};
`;

export const TextField = ({
  label,
  onSelect,
  errors,
}: TextFieldProps): JSX.Element => {
  const { t } = useTranslation();
  const [value, setValue] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<
    undefined | FilterTypeValue
  >();

  const validateForm = (
    filterType: FilterTypeValue | undefined,
    value: string
  ): FormState<FormFieldKey> => {
    switch (filterType) {
      case undefined: {
        return {
          state: "invalid",
          errors: {
            filterType: t(
              "guide-requests-app.filters-modal.no-filter-type-error",
              "Select a filter type"
            ),
          },
        };
      }
      case "anyValue": {
        return { state: "valid", values: [":*"] };
      }
      case "exactMatch": {
        if (value !== "") {
          return { state: "valid", values: [`:"${value}"`] };
        } else {
          return {
            state: "invalid",
            errors: {
              textValue: t(
                "guide-requests-app.filters-modal.no-text-value-error",
                "Insert a value"
              ),
            },
          };
        }
      }
    }
  };

  useEffect(() => {
    onSelect(validateForm(undefined, ""));
  }, []);

  const handleFilterTypeSelect = (filterType: FilterTypeValue) => {
    setSelectedFilter(filterType);
    onSelect(validateForm(filterType, value));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    onSelect(validateForm(selectedFilter, inputValue));
  };

  return (
    <>
      <FilterTypeDropdown
        onFilterTypeSelect={handleFilterTypeSelect}
        selectedFilter={selectedFilter}
        errors={errors}
      />
      <Gap />
      {selectedFilter === "exactMatch" && (
        <Field>
          <Field.Label>
            {t(
              "guide-requests-app.filters-modal.enter-field-value",
              "Enter {{field_name}}",
              {
                field_name: label,
              }
            )}
          </Field.Label>
          <Input
            value={value}
            onChange={handleChange}
            validation={errors["textValue"] ? "error" : undefined}
          />
          <FieldError errors={errors} field="textValue" />
        </Field>
      )}
    </>
  );
};
