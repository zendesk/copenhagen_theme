import styled from "styled-components";
import { Table } from "@zendeskgarden/react-tables";
import { RequestsTableRow } from "./requests-table-row/RequestsTableRow";
import { RequestsColumnFilter } from "./requests-column-filter/RequestsColumnFilter";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { isMobile } from "../../utils/mediaQuery";
import type { Sort } from "../../data-types/request-list-params";
import type {
  CustomStatus,
  Request,
  TicketField,
  RequestUser,
} from "../../data-types";
import { TruncatedText } from "./TruncatedText";
import type { RequestAttribute } from "./RequestAttribute";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  margin-bottom: 24px;
`;

const StyledSortableCell = styled(Table.SortableCell)`
  display: grid; // Without it Ellipsis won't work
`;

const SORTABLE_FIELDS = ["created_at", "updated_at", "status"];
const HIDDEN_FIELDS = [
  "description",
  "group",
  "assignee",
  "custom_status",
  "lookup",
];
const NON_REMOVABLE_FIELDS = ["subject"];

export const DEFAULT_DESKTOP_COLUMNS = [
  "subject",
  "id",
  "created_at",
  "updated_at",
  "status",
];

const DEFAULT_MOBILE_COLUMNS = ["subject", "updated_at", "status"];

const LOCAL_STORAGE_KEY = "GUIDE_REQUESTS_APP_COLUMN_CONFIG";

interface RequestsTableProps {
  onSort: (string: string) => void;
  sort: Sort | null;
  requests: readonly Request[];
  users: readonly RequestUser[];
  ticketFields: TicketField[];
  customStatuses: CustomStatus[];
  customStatusesEnabled: boolean;
}

export function RequestsTable({
  onSort,
  sort,
  requests,
  users,
  ticketFields,
  customStatuses,
  customStatusesEnabled,
}: RequestsTableProps): JSX.Element {
  const { t } = useTranslation();

  const requestAttributesLabels: Record<string, string> = {
    id: t("guide-requests-app.id", "ID"),
    created_at: t("guide-requests-app.createdDate", "Created date"),
    updated_at: t("guide-requests-app.updatedDate", "Updated date"),
    status: t("guide-requests-app.status", "Status"),
    requester: t("guide-requests-app.requester", "Requester"),
  };

  const defaultColumns = isMobile()
    ? DEFAULT_MOBILE_COLUMNS
    : DEFAULT_DESKTOP_COLUMNS;

  const [selectedColumns, setSelectedColumns] = useLocalStorage<string[]>(
    LOCAL_STORAGE_KEY,
    defaultColumns,
    "v4"
  );

  const SELECTABLE_COLUMNS = [...DEFAULT_DESKTOP_COLUMNS, "requester"];

  const requestAttributes: RequestAttribute[] = useMemo(() => {
    if (ticketFields.length === 0) {
      return [];
    }

    return [
      ...SELECTABLE_COLUMNS.map((identifier) => {
        const label =
          requestAttributesLabels[identifier] ??
          ticketFields.find((field) => field.type === identifier)
            ?.title_in_portal ??
          identifier;
        return { identifier, label };
      }),
      ...ticketFields
        .filter((field) => !SELECTABLE_COLUMNS.includes(field.type))
        .filter((field) => !HIDDEN_FIELDS.includes(field.type))
        .map(({ id, title_in_portal }) => ({
          identifier: String(id),
          label: title_in_portal,
        })),
    ];
  }, [ticketFields]);

  const selectedAttributes = requestAttributes.filter((attribute) =>
    selectedColumns.includes(attribute.identifier)
  );

  const selectedRemovableColumns = selectedColumns.filter(
    (identifier) => !NON_REMOVABLE_FIELDS.includes(identifier)
  );

  const selectableAttributes = requestAttributes.filter(
    ({ identifier }) => !NON_REMOVABLE_FIELDS.includes(identifier)
  );

  function handleSelectedColumnsChanged(columns: string[]) {
    setSelectedColumns([...NON_REMOVABLE_FIELDS, ...columns]);
  }

  function getHeaderCellWidth(identifier: string): string {
    const columns = selectedColumns.length;

    if (isMobile()) return "auto";

    if (identifier === "subject") {
      if (columns === 1) return "auto";
      if (columns <= 2) return "80%";
      if (columns <= 3) return "60%";
      if (columns <= 6) return "40%";
      if (columns <= 8) return "30%";
      return "20%";
    } else return "auto";
  }

  const requestUser = (userId: number): RequestUser => {
    return users.find((user) => user.id === userId)!;
  };

  return (
    <Container aria-live="polite">
      {requests.length === 0 ? (
        t("guide-requests-app.requests-empty-state", "No requests found")
      ) : (
        <Table isReadOnly>
          <Table.Head>
            <Table.HeaderRow>
              {selectedAttributes.map(({ identifier, label }) => {
                return (SORTABLE_FIELDS as string[]).includes(identifier) ? (
                  <StyledSortableCell
                    data-test-id={`sortable-cell-${identifier}`}
                    key={identifier}
                    sort={sort?.by === identifier ? sort?.order : undefined}
                    onClick={() => onSort(identifier)}
                    width={isMobile() ? "auto" : ""}
                  >
                    <TruncatedText>{label}</TruncatedText>
                  </StyledSortableCell>
                ) : (
                  <Table.HeaderCell
                    data-test-id={`header-cell-${identifier}`}
                    key={identifier}
                    width={getHeaderCellWidth(identifier)}
                  >
                    <TruncatedText>{label}</TruncatedText>
                  </Table.HeaderCell>
                );
              })}
              <Table.HeaderCell hasOverflow>
                <RequestsColumnFilter
                  selectedColumns={selectedRemovableColumns}
                  onSelectedColumnsChanged={handleSelectedColumnsChanged}
                  requestAttributes={selectableAttributes}
                  defaultDesktopColumns={DEFAULT_DESKTOP_COLUMNS}
                />
              </Table.HeaderCell>
            </Table.HeaderRow>
          </Table.Head>
          <Table.Body>
            {requests.map((request) => (
              <RequestsTableRow
                key={request.id}
                request={request}
                ticketFields={ticketFields}
                selectedAttributes={selectedAttributes}
                customStatuses={customStatuses}
                customStatusesEnabled={customStatusesEnabled}
                user={requestUser(request.requester_id)}
              />
            ))}
          </Table.Body>
        </Table>
      )}
    </Container>
  );
}
