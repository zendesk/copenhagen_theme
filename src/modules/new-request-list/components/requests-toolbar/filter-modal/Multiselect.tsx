import { useEffect, useState } from "react";
import {
  Item,
  Label,
  Field,
  Dropdown,
  Multiselect as GardenMultiselect,
} from "@zendeskgarden/react-dropdowns.legacy";
import { Tag } from "@zendeskgarden/react-tags";
import { useDropdownFilter } from "../../../hooks/useDropdownFilter";
import type { FilterValue } from "../../../data-types/FilterValue";
import { FieldError } from "./FieldError";
import type { FormErrors, FormState } from "./FormState";
import { useTranslation } from "react-i18next";
import { ModalMenu } from "../../modal-menu/ModalMenu";

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

  const validateForm = (
    selectedOptions: MultiSelectOption[]
  ): FormState<FormFieldKey> => {
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

  const [selectedOptions, setSelectedOptions] = useState<MultiSelectOption[]>(
    []
  );
  const { dropdownProps, renderItems } = useDropdownFilter(options, "value");

  useEffect(() => {
    onSelect(validateForm([]));
  }, []);

  function handleSelect(items: MultiSelectOption[]) {
    setSelectedOptions(items);
    onSelect(validateForm(items));
  }

  return (
    <Dropdown
      {...dropdownProps}
      selectedItems={selectedOptions}
      onSelect={handleSelect}
      downshiftProps={{
        defaultHighlightedIndex: 0,
        itemToString: (option: MultiSelectOption) => option?.value,
      }}
    >
      <Field>
        <Label>{label}</Label>
        <GardenMultiselect
          renderItem={({ value, removeValue }) => (
            <Tag>
              <span>{(value as MultiSelectOption).label}</span>
              <Tag.Close onClick={() => removeValue()} />
            </Tag>
          )}
          validation={errors.selectedOptions ? "error" : undefined}
        />
        <FieldError errors={errors} field="selectedOptions" />
      </Field>
      <ModalMenu>
        {renderItems((option) => (
          <Item key={option.value} value={option}>
            {option.label}
          </Item>
        ))}
      </ModalMenu>
    </Dropdown>
  );
}
