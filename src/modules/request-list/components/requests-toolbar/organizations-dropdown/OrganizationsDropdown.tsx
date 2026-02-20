import { useState } from "react";
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

  const [inputValue, setInputValue] = useState<string>("");

  const selectedOrganization = organizations.find(
    (organization) => organization.id === currentOrganizationId
  );

  const filteredOrganizations = organizations.filter((organization) =>
    organization.name
      .trim()
      .toLowerCase()
      .includes(inputValue.trim().toLowerCase())
  );

  return (
    <StyledField>
      <Field.Label>
        {t("guide-requests-app.organization", "Organization")}
      </Field.Label>
      <Combobox
        isAutocomplete
        selectionValue={String(currentOrganizationId)}
        inputValue={selectedOrganization?.name ?? inputValue}
        data-test-id="organizations-menu"
        onChange={(changes) => {
          if (
            changes.selectionValue !== undefined &&
            changes.selectionValue !== null
          ) {
            onOrganizationSelected(Number(changes.selectionValue));
          }
          if (changes.inputValue !== undefined) {
            setInputValue(changes.inputValue);
          }
        }}
      >
        {filteredOrganizations.map((organization) => (
          <Option
            key={organization.id}
            label={organization.name}
            value={String(organization.id)}
            data-test-id={`organization-${organization.id}`}
          />
        ))}
      </Combobox>
    </StyledField>
  );
}
