import { Combobox, Field, Option } from "@zendeskgarden/react-dropdowns";
import styled from "styled-components";
import { useFilterTranslations } from "../i18n";
import { FieldError } from "./FieldError";
import type { FormErrors } from "./FormState";
import { useTranslation } from "react-i18next";
import { useModalContainer } from "../../../../shared/garden-theme/modal-container/useModalContainer";

export type FilterTypeValue = "anyValue" | "exactMatch";

export type FilterTypeKey = "filterType";

interface FilterTypeDropdownProps {
  onFilterTypeSelect: (value: FilterTypeValue) => void;
  selectedFilter: undefined | FilterTypeValue;
  errors: FormErrors<FilterTypeKey>;
}

const StyledCombobox = styled(Combobox)`
  margin-top: ${(p) => p.theme.space.xs};
`;

export const FilterTypeDropdown = (
  props: FilterTypeDropdownProps
): JSX.Element => {
  const { t } = useTranslation();

  const { onFilterTypeSelect, selectedFilter, errors } = props;
  const { filterTypeDropdownI18N } = useFilterTranslations();
  const modalContainer = useModalContainer();

  const formatDisplayValue = (value: string | null): string => {
    if (!value) return "";
    return filterTypeDropdownI18N[value as FilterTypeValue] || "";
  };

  return (
    <Field>
      <Field.Label>
        {t("guide-requests-app.filter-modal.filterTypeLabel", "Filter type")}
      </Field.Label>
      <StyledCombobox
        isEditable={false}
        selectionValue={selectedFilter ?? null}
        inputValue={formatDisplayValue(selectedFilter ?? null)}
        onChange={(changes) => {
          if (changes.selectionValue !== undefined) {
            onFilterTypeSelect(changes.selectionValue as FilterTypeValue);
          }
        }}
        validation={errors["filterType"] ? "error" : undefined}
        listboxAppendToNode={modalContainer}
      >
        <Option label={filterTypeDropdownI18N.anyValue} value="anyValue" />
        <Option label={filterTypeDropdownI18N.exactMatch} value="exactMatch" />
      </StyledCombobox>
      <FieldError errors={errors} field="filterType" />
    </Field>
  );
};
