import { CursorPagination } from "@zendeskgarden/react-pagination";
import { useTranslation } from "react-i18next";
import { useParams } from "../../hooks/useParams";
import RequestsToolbar from "../requests-toolbar/RequestsToolbar";
import { RequestsTable } from "../requests-table/RequestsTable";
import RequestsTabs from "../requests-tabs/RequestsTabs";
import type { FilterValuesMap } from "../../data-types/FilterValue";
import type {
  RequestListParams,
  SelectedTab,
} from "../../data-types/request-list-params";

import {
  MY_REQUESTS_TAB_NAME,
  ORG_REQUESTS_TAB_NAME,
} from "../../data-types/request-list-params";

import { serializeRequestListParams } from "../../utils/serializeRequestListParams";
import { deserializeRequestListParams } from "../../utils/deserializeRequestListParams";

import { useUser } from "../../hooks/useUser";
import { useOrganizations } from "../../hooks/useOrganizations";
import { useRequests } from "../../hooks/useRequests";
import { useTicketFields } from "../../hooks/useTicketFields";
import { useCustomStatuses } from "../../hooks/useCustomStatuses";
import { RequestLoadingState } from "./RequestLoadingState";
import { useShowManyUsers } from "../../hooks/useShowManyUsers";
export interface RequestsListProps {
  locale: string;
  customStatusesEnabled: boolean;
}

export function RequestsList({
  locale,
  customStatusesEnabled,
}: RequestsListProps): JSX.Element {
  const { t } = useTranslation();

  const { params, push } = useParams<RequestListParams>(
    {
      query: "",
      page: 1,
      sort: { order: "desc", by: "updated_at" },
      selectedTab: { name: MY_REQUESTS_TAB_NAME },
      filters: {},
    },
    serializeRequestListParams,
    deserializeRequestListParams
  );

  const { query, page, sort, selectedTab, filters } = params;

  const { user, isLoading: isLoadingUser, error: userError } = useUser();
  const { organizations } = useOrganizations(user);
  const {
    requests,
    users,
    hasNextPage,
    hasPreviousPage,
    requestsCount,
    requestsPerPage,
    isLoading: isLoadingRequests,
    error: requestsError,
  } = useRequests(params, push);

  const {
    ticketFields,
    isLoading: isLoadingTicketFields,
    error: ticketFieldsError,
  } = useTicketFields(locale);

  const loadingError = requestsError || ticketFieldsError || userError;

  const isEndUser = !isLoadingUser && user?.role === "end-user";

  const userIds =
    !isLoadingRequests && !isEndUser
      ? requests.map((request) => request.requester_id)
      : [];

  const { users: usersWithAliases, isLoading: usersLoading } =
    useShowManyUsers(userIds);

  const isLoading =
    isLoadingRequests || isLoadingTicketFields || isLoadingUser || usersLoading;

  if (loadingError) {
    throw loadingError;
  }

  const { customStatuses } = useCustomStatuses(customStatusesEnabled, locale);

  const handleTabSelected = (newSelectedTab: SelectedTab): void => {
    push({
      page: 1,
      selectedTab: newSelectedTab,
      filters: {},
    });
  };

  const handleOrganizationSelected = (selectedOrgId: number) => {
    if (selectedTab.name === ORG_REQUESTS_TAB_NAME) {
      push({
        page: 1,
        selectedTab: {
          name: ORG_REQUESTS_TAB_NAME,
          organizationId: selectedOrgId,
        },
      });
    }
  };

  const handleFiltersChanged = (newFilters: FilterValuesMap) => {
    push({ page: 1, filters: newFilters });
  };

  const onSort = (name: string): void => {
    if (sort?.by === name) {
      if (sort.order === "asc") {
        push({
          page: 1,
          sort: {
            by: sort.by,
            order: "desc",
          },
        });
      } else {
        push({
          page: 1,
          sort: null,
        });
      }
    } else {
      push({
        page: 1,
        sort: {
          by: name,
          order: "asc",
        },
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <RequestLoadingState />
      ) : (
        <>
          <RequestsTabs
            organizations={organizations}
            selectedTab={selectedTab}
            onTabSelected={handleTabSelected}
          />
          <RequestsToolbar
            hasPagination={hasNextPage || hasPreviousPage}
            page={page}
            requestsCount={requestsCount}
            requestsPerPage={requestsPerPage}
            query={query}
            onSearchSubmit={(value) => push({ page: 1, query: value })}
            filters={filters}
            ticketFields={ticketFields}
            onFiltersChanged={handleFiltersChanged}
            organizations={organizations}
            selectedTab={selectedTab}
            onOrganizationSelected={handleOrganizationSelected}
            user={user}
            customStatusesEnabled={customStatusesEnabled}
            customStatuses={customStatuses}
          />
          <RequestsTable
            onSort={onSort}
            requests={requests}
            users={usersWithAliases || users}
            sort={sort}
            ticketFields={ticketFields}
            customStatuses={customStatuses}
            customStatusesEnabled={customStatusesEnabled}
          />
        </>
      )}
      {!isLoading && (hasPreviousPage || hasNextPage) && (
        <CursorPagination>
          <CursorPagination.Previous
            onClick={() => push({ page: page - 1 })}
            disabled={!hasPreviousPage}
          >
            {t("guide-requests-app.previous", "Previous")}
          </CursorPagination.Previous>
          <CursorPagination.Next
            onClick={() => push({ page: page + 1 })}
            disabled={!hasNextPage}
          >
            {t("guide-requests-app.next", "Next")}
          </CursorPagination.Next>
        </CursorPagination>
      )}
    </>
  );
}
