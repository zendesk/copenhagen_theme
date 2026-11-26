import { Span } from "@zendeskgarden/react-typography";
import { Dots } from "@zendeskgarden/react-loaders";
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
  const { organization: fetchedOrganization, isLoading } =
    useAccessibleOrganization(
      !organization && Number.isSafeInteger(id) && id > 0 ? id : undefined
    );

  return (
    <FilterTagWrapper
      field="organization"
      values={[value]}
      onFilterRemoved={onRemove}
    >
      <span aria-busy={isLoading}>
        <Span isBold>
          {t("guide-requests-app.organization", "Organization")}
        </Span>{" "}
        {isLoading ? (
          <Dots size={16} delayMS={0} aria-hidden="true" />
        ) : (
          organization?.name ??
          fetchedOrganization?.name ??
          `#${value.substring(1)}`
        )}
      </span>
    </FilterTagWrapper>
  );
}
