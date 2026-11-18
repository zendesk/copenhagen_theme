import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Paragraph } from "@zendeskgarden/react-typography";
import type { Organization } from "../../../data-types";
import { useOrganizationSearch } from "../../../hooks/useOrganizationSearch";
import type { FormErrors, FormState } from "./FormState";
import { Multiselect } from "./Multiselect";

export function OrganizationMultiselect({
  organizations,
  onSelect,
  errors,
}: {
  organizations: Organization[];
  onSelect: (state: FormState<string>) => void;
  errors: FormErrors;
}): JSX.Element {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const { searchResults, search, isSearching, error } = useOrganizationSearch();
  const isSearchingByName = query.trim() !== "";
  const displayedOrganizations = isSearchingByName
    ? searchResults ?? []
    : organizations;

  return (
    <>
      <Multiselect
        label={t("guide-requests-app.organization", "Organization")}
        options={displayedOrganizations.map((organization) => ({
          label: organization.name,
          value: `:${organization.id}`,
        }))}
        errors={errors}
        onSelect={onSelect}
        isLoading={isSearching}
        onSearch={(value) => {
          setQuery(value);
          search(value);
        }}
      />
      {error && (
        <Paragraph role="alert">
          {t(
            "guide-requests-app.giveItAMomentAndTryAgain",
            "Give it a moment and try again"
          )}
        </Paragraph>
      )}
    </>
  );
}
