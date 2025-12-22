import type { FormEventHandler } from "react";
import { useState } from "react";
import {
  Modal,
  Header,
  Body,
  Footer,
  FooterItem,
  Close,
} from "@zendeskgarden/react-modals";
import { Button } from "@zendeskgarden/react-buttons";
import { useTranslation } from "react-i18next";
import type { FilterValuesMap } from "../../../data-types/FilterValue";
import styled from "styled-components";
import { FilterValueField } from "./FilterValueField";
import type { FilterProperty } from "./FilterPropertyDropdown";
import { FilterPropertyDropdown } from "./FilterPropertyDropdown";
import type { FormErrors, FormState } from "./FormState";
import { useModalContainer } from "../../../../shared/garden-theme/modal-container/useModalContainer";
import type { Organization, TicketField } from "../../../data-types";
import type { MultiSelectOption } from "./Multiselect";

export const Gap = styled.div`
  height: ${(p) => p.theme.space.md};
`;

interface FilterModalProps {
  onClose: () => void;
  ticketFields: TicketField[];
  organizations: Organization[];
  customStatusesEnabled: boolean;
  customStatusOptions: MultiSelectOption[];
  filterValuesMap: FilterValuesMap;
  onFiltersChanged: (filters: FilterValuesMap) => void;
}

const systemType = [
  "subject",
  "description",
  "status",
  "custom_status",
  "type",
  "priority",
  "basic_priority",
  "assignee",
  "group",
  "tickettype",
  "requester",
];

function isSystemFieldType(type: string): boolean {
  return systemType.includes(type);
}

export function FilterModal({
  onClose,
  ticketFields,
  organizations,
  filterValuesMap,
  onFiltersChanged,
  customStatusesEnabled,
  customStatusOptions,
}: FilterModalProps): JSX.Element {
  const { t } = useTranslation();

  const [selectedFilterProperty, setSelectedFilterProperty] = useState<
    FilterProperty | undefined
  >();
  const [formState, setFormState] = useState<FormState | null>();
  const [errors, setErrors] = useState<FormErrors>({});
  const modalContainer = useModalContainer();

  const handleSelectFilterProperty = (property: FilterProperty) => {
    setErrors({});
    setSelectedFilterProperty(property);
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (!selectedFilterProperty) {
      setErrors({
        ticketField: t(
          "guide-requests-app.filters-modal.select-filter-required",
          "Select a filter"
        ),
      });
      return;
    }

    if (formState?.state === "valid") {
      const filterKey =
        isSystemFieldType(selectedFilterProperty.identifier) ||
        selectedFilterProperty.identifier === "created_at" ||
        selectedFilterProperty.identifier === "updated_at" ||
        selectedFilterProperty.identifier === "organization" ||
        selectedFilterProperty.identifier === "custom_status_id"
          ? selectedFilterProperty.identifier
          : `custom_field_${selectedFilterProperty.identifier}`;

      onFiltersChanged({
        ...filterValuesMap,
        [filterKey]: formState.values,
      });
      onClose();
    } else if (formState?.state === "invalid") {
      setErrors(formState.errors);
    }
  };

  return (
    <Modal appendToNode={modalContainer} onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate>
        <Header>
          {t("guide-requests-app.filters-modal.title", "Filters")}
        </Header>
        <Body>
          <FilterPropertyDropdown
            ticketFields={ticketFields}
            organizations={organizations}
            hasCustomStatuses={customStatusesEnabled}
            selectedProperty={selectedFilterProperty}
            onSelect={handleSelectFilterProperty}
            errors={errors}
          />
          <Gap />
          {selectedFilterProperty && (
            <FilterValueField
              key={selectedFilterProperty.identifier}
              selectedFilterProperty={selectedFilterProperty}
              ticketFields={ticketFields}
              organizations={organizations}
              customStatusOptions={customStatusOptions}
              onSelect={setFormState}
              errors={errors}
            />
          )}
        </Body>
        <Footer>
          <FooterItem>
            <Button type="button" onClick={onClose} isBasic>
              {t("guide-requests-app.cancel", "Cancel")}
            </Button>
          </FooterItem>
          <FooterItem>
            <Button type="submit" isPrimary>
              {t(
                "guide-requests-app.filters-modal.apply-filter-button",
                "Apply filter"
              )}
            </Button>
          </FooterItem>
        </Footer>
        <Close aria-label={t("guide-requests-app.closeModal", "Close modal")} />
      </form>
    </Modal>
  );
}
