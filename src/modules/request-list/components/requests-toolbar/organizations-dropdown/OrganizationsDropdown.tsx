import { useCallback, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Combobox, Field, Option } from "@zendeskgarden/react-dropdowns";
import type { Organization } from "../../../data-types";

interface OrganizationsDropdownProps {
  organizations: Organization[];
  currentOrganizationId: number;
  onOrganizationSelected: (organizationId: number) => void;
}

const StyledField = styled(Field)`
  width: 200px;
`;

export default function OrganizationsDropdown({
  organizations,
  currentOrganizationId,
  onOrganizationSelected,
}: OrganizationsDropdownProps): JSX.Element {
  const { t } = useTranslation();

  const [filteredOrganizations, setFilteredOrganizations] =
    useState(organizations);

  const [inputValue, setInputValue] = useState(() => {
    const selectedOrganization = organizations.find(
      (organization) => organization.id === currentOrganizationId
    );
    return selectedOrganization?.name ?? "";
  });

  const handleChange = useCallback(
    (changes: {
      selectionValue?: string | string[] | null;
      inputValue?: string;
    }) => {
      const { inputValue, selectionValue } = changes;

      if (inputValue !== undefined) {
        setInputValue(inputValue);

        if (inputValue === "") {
          setFilteredOrganizations(organizations);
        } else {
          const matchedOrganizations = organizations.filter((organization) => {
            return organization.name
              .trim()
              .toLowerCase()
              .includes(inputValue.trim().toLowerCase());
          });

          setFilteredOrganizations(matchedOrganizations);
        }
      }

      if (selectionValue !== undefined && selectionValue !== null) {
        // Handle both string and string[] types for selectionValue
        const value = Array.isArray(selectionValue)
          ? selectionValue[0]
          : selectionValue;

        if (typeof value === "string") {
          onOrganizationSelected(Number(value));
        }
      }
    },
    [organizations, onOrganizationSelected]
  );

  return (
    <StyledField>
      <Field.Label>
        {t("guide-requests-app.organization", "Organization")}
      </Field.Label>
      <Combobox
        isAutocomplete
        selectionValue={String(currentOrganizationId)}
        inputValue={inputValue}
        data-test-id="organizations-menu"
        onChange={handleChange}
      >
        {filteredOrganizations.length === 0 ? (
          <Option
            isDisabled
            label={t(
              "guide-requests-app.filters-modal.no-matches-found",
              "No matches found"
            )}
            value=""
          />
        ) : (
          filteredOrganizations.map((organization) => (
            <Option
              key={organization.id}
              label={organization.name}
              value={String(organization.id)}
              data-test-id={`organization-${organization.id}`}
            />
          ))
        )}
      </Combobox>
    </StyledField>
  );
}
