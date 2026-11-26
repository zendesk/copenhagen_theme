import { useCallback, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Combobox, Field, Option } from "@zendeskgarden/react-dropdowns";
import type { Organization } from "../../../data-types";
import { useOrganizationSearch } from "../../../hooks/useOrganizationSearch";
import { useAccessibleOrganization } from "../../../hooks/useAccessibleOrganization";

interface OrganizationsDropdownProps {
  // The first page of accessible organizations
  organizations: Organization[];
  // True while that first page is still loading
  isLoadingOrganizations?: boolean;
  currentOrganizationId: number;
  onOrganizationSelected: (organizationId: number) => void;
}

const StyledField = styled(Field)`
  width: 200px;
`;

export default function OrganizationsDropdown({
  organizations,
  isLoadingOrganizations = false,
  currentOrganizationId,
  onOrganizationSelected,
}: OrganizationsDropdownProps): JSX.Element {
  const { t } = useTranslation();

  const { searchResults, isSearching, search, clearSearch } =
    useOrganizationSearch();

  // The text typed in the input. Typing stays local to the dropdown: it
  // searches organizations but never changes the selection or the URL.
  const [filterQuery, setFilterQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // An organization picked from search results may not be in the first page,
  // so it is kept to show its name without looking it up again.
  const [pickedOrganization, setPickedOrganization] =
    useState<Organization | null>(null);

  const knownSelectedOrganization =
    organizations.find(
      (organization) => organization.id === currentOrganizationId
    ) ??
    (pickedOrganization?.id === currentOrganizationId
      ? pickedOrganization
      : undefined);

  // Any other selection (e.g. an organization id from a link) is looked up by
  // id, once the first page has loaded and does not contain it.
  const { organization: fetchedOrganization } = useAccessibleOrganization(
    knownSelectedOrganization || isLoadingOrganizations
      ? undefined
      : currentOrganizationId
  );

  const selectedOrganization =
    knownSelectedOrganization ?? fetchedOrganization ?? undefined;

  const inputValue = isEditing ? filterQuery : selectedOrganization?.name ?? "";

  // The unfiltered list keeps the selected organization even when it is not
  // in the first page.
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
    filterQuery.trim() === "" ? availableOrganizations : searchResults ?? [];

  const stopEditing = useCallback(() => {
    setIsEditing(false);
    setFilterQuery("");
    clearSearch();
  }, [clearSearch]);

  const handleChange = useCallback(
    (changes: {
      selectionValue?: string | string[] | null;
      inputValue?: string;
      isExpanded?: boolean;
      type?: string;
    }) => {
      const { inputValue, selectionValue, isExpanded, type } = changes;

      if (selectionValue !== undefined && selectionValue !== null) {
        // Handle both string and string[] types for selectionValue
        const value = Array.isArray(selectionValue)
          ? selectionValue[0]
          : selectionValue;

        stopEditing();

        if (typeof value === "string") {
          const organizationId = Number(value);
          const organization = displayedOrganizations.find(
            ({ id }) => id === organizationId
          );
          if (organization) {
            setPickedOrganization(organization);
          }
          if (organizationId !== currentOrganizationId) {
            onOrganizationSelected(organizationId);
          }
        }
        return;
      }

      if (inputValue !== undefined) {
        setIsEditing(true);
        setFilterQuery(inputValue);
        search(inputValue);
      }

      // Closing the list without picking an option (Escape, or focus leaving
      // the field) shows the selected name again. Clicking the input also
      // closes the list, but keeps the typed text.
      if (isExpanded === false && type !== "input:click") {
        stopEditing();
      }
    },
    [
      search,
      stopEditing,
      onOrganizationSelected,
      displayedOrganizations,
      currentOrganizationId,
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
