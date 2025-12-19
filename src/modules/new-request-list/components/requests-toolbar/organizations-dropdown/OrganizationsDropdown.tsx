import { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import {
  Dropdown,
  Label,
  Menu,
  Field,
  Item,
  Autocomplete,
} from "@zendeskgarden/react-dropdowns.legacy";
import { useDownshiftEnvironment } from "../../../../shared/garden-shadow/src/useDownshiftEnvironment";
import type { Organization } from "../../../data-types";

interface OrganizationsDropdownProps {
  organizations: Organization[];
  currentOrganizationId: number;
  onOrganizationSelected: (organizationId: number) => void;
}

const StyledMenu = styled(Menu)`
  max-height: 100%;
  overflow-y: visible;
`;

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
  const downshiftEnvironment = useDownshiftEnvironment();

  const selectedOrganization = organizations.find(
    (organization) => organization.id === currentOrganizationId
  );

  const onSelect = (orgId: number) => {
    onOrganizationSelected(orgId);
  };

  return (
    <Dropdown
      inputValue={inputValue}
      onInputValueChange={setInputValue}
      selectedItem={currentOrganizationId}
      onSelect={onSelect}
      downshiftProps={{ environment: downshiftEnvironment }}
    >
      <StyledField>
        <Label>{t("guide-requests-app.organization", "Organization")}</Label>
        <Autocomplete data-test-id="organizations-menu">
          {selectedOrganization?.name}
        </Autocomplete>
      </StyledField>
      <StyledMenu placement="bottom-start">
        {organizations
          .filter((organization) =>
            organization.name
              .trim()
              .toLowerCase()
              .includes(inputValue.trim().toLowerCase())
          )
          .map((organization) => (
            <Item
              key={organization.id}
              value={organization.id}
              data-test-id={`organization-${organization.id}`}
            >
              {organization.name}
            </Item>
          ))}
      </StyledMenu>
    </Dropdown>
  );
}
