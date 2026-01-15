import {
  Dropdown,
  Item,
  Field,
  Select,
  Label,
} from "@zendeskgarden/react-dropdowns.legacy";
import styled from "styled-components";
import { useFilterTranslations } from "../i18n";
import { FieldError } from "./FieldError";
import type { FormErrors } from "./FormState";
import { useTranslation } from "react-i18next";
import { ModalMenu } from "../../modal-menu/ModalMenu";

export type FilterTypeValue = "anyValue" | "exactMatch";

export type FilterTypeKey = "filterType";

interface FilterTypeDropdownProps {
  onFilterTypeSelect: (value: FilterTypeValue) => void;
  selectedFilter: undefined | FilterTypeValue;
  errors: FormErrors<FilterTypeKey>;
}

const StyledSelect = styled(Select)`
  margin-top: ${(p) => p.theme.space.xs};
`;

export const FilterTypeDropdown = (
  props: FilterTypeDropdownProps
): JSX.Element => {
  const { t } = useTranslation();

  const { onFilterTypeSelect, selectedFilter, errors } = props;
  const { filterTypeDropdownI18N } = useFilterTranslations();

  return (
    <Dropdown onSelect={onFilterTypeSelect} selectedItem={selectedFilter}>
      <Field>
        <Label>
          {t("guide-requests-app.filter-modal.filterTypeLabel", "Filter type")}
        </Label>
        <StyledSelect validation={errors["filterType"] ? "error" : undefined}>
          {selectedFilter ? filterTypeDropdownI18N[selectedFilter] : ""}
        </StyledSelect>
        <FieldError errors={errors} field="filterType" />
      </Field>
      <ModalMenu>
        <Item value="anyValue">{filterTypeDropdownI18N.anyValue}</Item>
        <Item value="exactMatch">{filterTypeDropdownI18N.exactMatch}</Item>
      </ModalMenu>
    </Dropdown>
  );
};
