import { Anchor } from "@zendeskgarden/react-buttons";
import { Paragraph } from "@zendeskgarden/react-typography";
import { useTranslation } from "react-i18next";
import type { OrganizationPagination } from "../../hooks/useOrganizations";

export function OrganizationLoadMore({
  pagination,
}: {
  pagination?: OrganizationPagination;
}): JSX.Element {
  const { t } = useTranslation();
  return (
    <>
      {pagination?.error && (
        <Paragraph role="alert">
          {t(
            "guide-requests-app.giveItAMomentAndTryAgain",
            "Give it a moment and try again"
          )}
        </Paragraph>
      )}
      {pagination?.hasMore && (
        <Anchor
          href="#"
          aria-disabled={pagination.isLoading}
          aria-busy={pagination.isLoading}
          onClick={(event) => {
            event.preventDefault();
            if (!pagination.isLoading) pagination.loadMore();
          }}
        >
          {t("guide-requests-app.showMore", "Show more")}
        </Anchor>
      )}
    </>
  );
}
