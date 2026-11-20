import { Span } from "@zendeskgarden/react-typography";
import { useTranslation } from "react-i18next";
import type { Organization } from "../../../data-types";
import type { FilterValue } from "../../../data-types/FilterValue";
import { useAccessibleOrganization } from "../../../hooks/useAccessibleOrganization";
import { FilterTagWrapper } from "./FilterTagWrapper";

export function OrganizationTag({
  value,
  organization,
  onRemove,
}: {
  value: FilterValue;
  organization?: Organization;
  onRemove: () => void;
}): JSX.Element {
  const { t } = useTranslation();
  const id = Number(value.substring(1));
  const { organization: fetchedOrganization } = useAccessibleOrganization(
    !organization && Number.isSafeInteger(id) && id > 0 ? id : undefined
  );

  return (
    <FilterTagWrapper
      field="organization"
      values={[value]}
      onFilterRemoved={onRemove}
    >
      <span>
        <Span isBold>
          {t("guide-requests-app.organization", "Organization")}
        </Span>{" "}
        {organization?.name ??
          fetchedOrganization?.name ??
          `#${value.substring(1)}`}
      </span>
    </FilterTagWrapper>
  );
}
