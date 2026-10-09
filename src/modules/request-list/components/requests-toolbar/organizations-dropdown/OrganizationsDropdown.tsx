import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Combobox, Field, Option } from "@zendeskgarden/react-dropdowns";
import type { Organization } from "../../../data-types";
import { useOrganizationSearch } from "../../../hooks/useOrganizationSearch";

interface OrganizationsDropdownProps {
  organizations: Organization[];
  // True when the loaded organizations are only the first page of results
  hasMore?: boolean;
  currentOrganizationId: number;
  onOrganizationSelected: (organizationId: number) => void;
}

const StyledField = styled(Field)`
  width: 200px;
`;

export default function OrganizationsDropdown({
  organizations,
  hasMore = false,
  currentOrganizationId,
  onOrganizationSelected,
}: OrganizationsDropdownProps): JSX.Element {
  const { t } = useTranslation();

  const { searchResults, search } = useOrganizationSearch();

  const [filterQuery, setFilterQuery] = useState("");

  const [inputValue, setInputValue] = useState(() => {
    const selectedOrganization = organizations.find(
      (organization) => organization.id === currentOrganizationId
    );
    return selectedOrganization?.name ?? "";
  });

  // Organizations load asynchronously, so the name of the selected
  // organization is not available on mount. Re-sync when it arrives or
  // when the selection changes. It does not run while the user is
  // typing, since typing changes neither the list nor the selection.
  useEffect(() => {
    const selectedOrganization = organizations.find(
      (organization) => organization.id === currentOrganizationId
    );
    setInputValue(selectedOrganization?.name ?? "");
  }, [organizations, currentOrganizationId]);

  const normalizedQuery = filterQuery.trim().toLowerCase();
  const filteredOrganizations =
    normalizedQuery === ""
      ? organizations
      : organizations.filter((organization) =>
          organization.name.trim().toLowerCase().includes(normalizedQuery)
        );

  // When only the first page is loaded, server results replace the local list
  const displayedOrganizations =
    hasMore && searchResults !== null ? searchResults : filteredOrganizations;

  const handleChange = useCallback(
    (changes: {
      selectionValue?: string | string[] | null;
      inputValue?: string;
    }) => {
      const { inputValue, selectionValue } = changes;

      if (inputValue !== undefined) {
        setInputValue(inputValue);
        setFilterQuery(inputValue);

        if (hasMore) {
          search(inputValue);
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
    [hasMore, search, onOrganizationSelected]
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
        {displayedOrganizations.length === 0 ? (
          <Option
            isDisabled
            label={t(
              "guide-requests-app.filters-modal.no-matches-found",
              "No matches found"
            )}
            value=""
          />
        ) : (
          displayedOrganizations.map((organization) => (
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
