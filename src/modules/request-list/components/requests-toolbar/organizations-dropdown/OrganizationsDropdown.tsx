import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Combobox, Field, Option } from "@zendeskgarden/react-dropdowns";
import type { Organization } from "../../../data-types";
import { useOrganizationSearch } from "../../../hooks/useOrganizationSearch";

interface OrganizationsDropdownProps {
  organizations: Organization[];
  currentOrganizationId: number;
  currentOrganizationQuery?: string;
  onOrganizationSelected: (
    organizationId: number,
    organizationQuery?: string
  ) => void;
  onOrganizationQueryChanged?: (organizationQuery: string) => void;
}

const StyledField = styled(Field)`
  width: 200px;
`;

export default function OrganizationsDropdown({
  organizations,
  currentOrganizationId,
  currentOrganizationQuery,
  onOrganizationSelected,
  onOrganizationQueryChanged,
}: OrganizationsDropdownProps): JSX.Element {
  const { t } = useTranslation();

  const { searchResults, isSearching, search, clearSearch } =
    useOrganizationSearch();

  const [filterQuery, setFilterQuery] = useState(
    currentOrganizationQuery ?? ""
  );
  const inputWasEditedRef = useRef(false);
  const selectedOrganizationIdRef = useRef(currentOrganizationId);

  const [inputValue, setInputValue] = useState(() => {
    const selectedOrganization = organizations.find(
      (organization) => organization.id === currentOrganizationId
    );
    return currentOrganizationQuery ?? selectedOrganization?.name ?? "";
  });

  // An organization picked from search results may not be in the loaded
  // first page, so its name is remembered when it is selected.
  const pickedOrganizationRef = useRef<Organization | null>(null);

  // Keep the search input in sync with the URL while preserving the selected
  // organization's label when no search is active.
  useEffect(() => {
    if (selectedOrganizationIdRef.current !== currentOrganizationId) {
      selectedOrganizationIdRef.current = currentOrganizationId;
      inputWasEditedRef.current = false;
    }

    if (currentOrganizationQuery) {
      if (!inputWasEditedRef.current) {
        setInputValue(currentOrganizationQuery);
      }
      return;
    }

    const selectedOrganization =
      organizations.find(
        (organization) => organization.id === currentOrganizationId
      ) ??
      (pickedOrganizationRef.current?.id === currentOrganizationId
        ? pickedOrganizationRef.current
        : undefined);
    if (!inputWasEditedRef.current) {
      setInputValue(selectedOrganization?.name ?? "");
    }
  }, [organizations, currentOrganizationId, currentOrganizationQuery]);

  // Re-run the same server search when a URL with an active query is opened.
  useEffect(() => {
    const query = currentOrganizationQuery ?? "";
    setFilterQuery(query);
    if (query) {
      setInputValue(query);
      search(query);
    } else {
      clearSearch();
    }
  }, [currentOrganizationQuery, search, clearSearch]);

  const normalizedQuery = filterQuery.trim().toLowerCase();
  const selectedOrganization =
    organizations.find(
      (organization) => organization.id === currentOrganizationId
    ) ??
    (pickedOrganizationRef.current?.id === currentOrganizationId
      ? pickedOrganizationRef.current
      : undefined);
  const availableOrganizations =
    selectedOrganization &&
    !organizations.some(
      (organization) => organization.id === selectedOrganization.id
    )
      ? [...organizations, selectedOrganization].sort((a, b) =>
          a.name.localeCompare(b.name)
        )
      : organizations;

  // Use the server's name matching for every account size so the results do
  // not change depending on whether the list fits on one page.
  const displayedOrganizations =
    normalizedQuery === "" ? availableOrganizations : searchResults ?? [];

  const handleChange = useCallback(
    (changes: {
      selectionValue?: string | string[] | null;
      inputValue?: string;
    }) => {
      const { inputValue, selectionValue } = changes;
      const hasSelection =
        selectionValue !== undefined && selectionValue !== null;

      if (inputValue !== undefined) {
        setInputValue(inputValue);
      }

      if (hasSelection) {
        inputWasEditedRef.current = false;

        // Handle both string and string[] types for selectionValue
        const value = Array.isArray(selectionValue)
          ? selectionValue[0]
          : selectionValue;

        if (typeof value === "string") {
          const organizationId = Number(value);
          pickedOrganizationRef.current =
            displayedOrganizations.find(
              (organization) => organization.id === organizationId
            ) ?? null;
          const organizationQuery = filterQuery.trim();
          setInputValue(
            organizationQuery || pickedOrganizationRef.current?.name || ""
          );
          onOrganizationSelected(
            organizationId,
            organizationQuery || undefined
          );
        }
      } else if (inputValue !== undefined) {
        inputWasEditedRef.current = true;
        setFilterQuery(inputValue);
        search(inputValue);
        onOrganizationQueryChanged?.(inputValue);
      }
    },
    [
      search,
      onOrganizationSelected,
      onOrganizationQueryChanged,
      displayedOrganizations,
      filterQuery,
    ]
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
        {displayedOrganizations.length === 0 && !isSearching ? (
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
