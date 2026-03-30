import { Table } from "@zendeskgarden/react-tables";
import type {
  CustomStatus,
  Request,
  TicketField,
  RequestUser,
} from "../../../data-types";
import type { RequestAttribute } from "../RequestAttribute";
import { RequestsTableCell } from "./RequestsTableCell";

interface Props {
  request: Request;
  ticketFields: TicketField[];
  selectedAttributes: RequestAttribute[];
  customStatuses: CustomStatus[];
  customStatusesEnabled: boolean;
  user: RequestUser;
}

export function RequestsTableRow({
  request,
  ticketFields,
  selectedAttributes,
  customStatuses,
  customStatusesEnabled,
  user,
}: Props): JSX.Element {
  return (
    <Table.Row key={request.id}>
      {selectedAttributes.map(({ identifier }) => {
        return (
          <RequestsTableCell
            key={`request-${request.id}-field-${identifier}`}
            request={request}
            ticketFields={ticketFields}
            identifier={identifier}
            customStatuses={customStatuses}
            customStatusesEnabled={customStatusesEnabled}
            user={user}
          />
        );
      })}
      <Table.Cell />
    </Table.Row>
  );
}
