import { Button } from "@zendeskgarden/react-buttons";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import type {
  FilterValuesMap,
  FilterValue,
} from "../../../data-types/FilterValue";
import { FieldTags } from "./FieldTags";
import type { Organization, TicketField } from "../../../data-types";
import type { MultiSelectOption } from "../filter-modal/Multiselect";
import { removeFilterValuesFromMap } from "./removeFilterValuesFromMap";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  min-height: 32px;
  margin-bottom: 28px;
`;

interface FilterTagsProps {
  filters: FilterValuesMap;
  ticketFields: TicketField[];
  organizations: Organization[];
  customStatusOptions: MultiSelectOption[];
  onFiltersChanged: (filters: FilterValuesMap) => void;
}

export function FilterTags({
  filters,
  ticketFields,
  organizations,
  customStatusOptions,
  onFiltersChanged,
}: FilterTagsProps): JSX.Element {
  const { t } = useTranslation();

  function removeFilter(field: string, values: FilterValue[]) {
    onFiltersChanged(removeFilterValuesFromMap(filters, field, values));
  }

  return (
    <Container>
      {Object.entries(filters).map(([field, values]) => {
        return (
          <FieldTags
            key={field}
            ticketFields={ticketFields}
            organizations={organizations}
            customStatusOptions={customStatusOptions}
            values={values}
            identifier={field}
            onFilterRemoved={(values) => removeFilter(field, values)}
          />
        );
      })}
      {Object.keys(filters).length > 0 && (
        <Button
          isBasic
          size="small"
          data-test-id={"button-clear-filters"}
          onClick={() => onFiltersChanged({})}
        >
          {t("guide-requests-app.clearFilters", "Clear filters")}
        </Button>
      )}
    </Container>
  );
}
