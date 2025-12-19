import type { MouseEvent, ReactChild } from "react";
import { Anchor } from "@zendeskgarden/react-buttons";
import { Table } from "@zendeskgarden/react-tables";
import styled from "styled-components";
import location from "../../../utils/location";
import { useTranslation } from "react-i18next";
import RelativeTime from "../../relative-time/RelativeTime";
import { Tag } from "@zendeskgarden/react-tags";
import type {
  CustomStatus,
  Request,
  RequestUser,
  TicketField,
} from "../../../data-types";
import { Multiselect } from "./Multiselect";
import { TruncatedText } from "../TruncatedText";

const Subject = styled(Anchor)`
  word-break: break-word;
`;

interface RequestsTableCellProps {
  ticketFields: TicketField[];
  identifier: string;
  request: Request;
  customStatuses: CustomStatus[];
  customStatusesEnabled: boolean;
  user?: RequestUser;
}

interface TruncatedTableCellProps {
  children?: ReactChild;
  identifier: string;
}

const TruncatedTableCell = ({
  children,
  identifier,
}: TruncatedTableCellProps) => (
  <Table.Cell data-test-id={`table-cell-${identifier}`}>
    {children ? <TruncatedText>{children}</TruncatedText> : "-"}
  </Table.Cell>
);

export function RequestsTableCell({
  ticketFields,
  identifier,
  request,
  customStatuses,
  customStatusesEnabled,
  user,
}: RequestsTableCellProps): JSX.Element | null {
  const {
    id,
    created_at,
    updated_at,
    subject,
    description,
    status,
    priority,
    type,
  } = request;

  const { t, i18n } = useTranslation();
  const currentLocale = i18n.language;
  const mediumDate = new Intl.DateTimeFormat(currentLocale, {
    dateStyle: "medium",
  });

  interface StatusColorLabel {
    color: string;
    label: string;
  }

  const open: StatusColorLabel = {
    color: "red",
    label: t("guide-requests-app.statusOpen", "Open"),
  };

  const pending: StatusColorLabel = {
    color: "#038153",
    label: t("guide-requests-app.statusPending", "Awaiting reply"),
  };

  const solved: StatusColorLabel = {
    color: "#68737d",
    label: t("guide-requests-app.statusSolved", "Solved"),
  };

  const STATUS_MAPPING = {
    new: open,
    open: open,
    hold: open,
    pending: pending,
    solved: solved,
    closed: solved,
  };

  const getCustomFieldValue = (identifier: string) =>
    request.custom_fields.find((field) => field.id.toString() === identifier)
      ?.value;

  const getCheckboxLabel = (identifier: string): string | undefined => {
    const value = getCustomFieldValue(identifier);

    switch (value) {
      case true:
        return t("guide-requests-app.checkbox-filter.selected", "Selected");
      case false:
        return t(
          "guide-requests-app.checkbox-filter.not-selected",
          "Not selected"
        );
      default:
        return undefined;
    }
  };

  const getStatusLabel = () => {
    if (!customStatusesEnabled) {
      return {
        label: STATUS_MAPPING[status].label,
        tooltip: undefined,
      };
    }

    const customStatus = customStatuses.find(
      (customStatus) => customStatus.id === request.custom_status_id
    );

    /* We want to always show the end-user label. 
This is exposed in the API as `label` for end-users and `end_user_label` for agents/admins.
The same applies for the description. */
    const label =
      customStatus?.label ||
      customStatus?.end_user_label ||
      STATUS_MAPPING[status].label;
    const description =
      customStatus?.description || customStatus?.end_user_description;
    return {
      label,
      tooltip: description ? `${label} - ${description}` : label,
    };
  };

  if (identifier === "id") {
    return (
      <TruncatedTableCell
        identifier={identifier}
      >{`#${id}`}</TruncatedTableCell>
    );
  }

  if (identifier === "created_at") {
    return (
      <TruncatedTableCell identifier={identifier}>
        {mediumDate.format(new Date(created_at))}
      </TruncatedTableCell>
    );
  }

  if (identifier === "updated_at") {
    return (
      <TruncatedTableCell identifier={identifier}>
        <RelativeTime date={new Date(updated_at)} locale={currentLocale} />
      </TruncatedTableCell>
    );
  }

  if (identifier === "status") {
    const { label, tooltip } = getStatusLabel();
    return (
      <Table.Cell data-test-id={`table-cell-${identifier}`}>
        <Tag hue={STATUS_MAPPING[status].color}>
          <TruncatedText tooltip={tooltip}>{label || ""}</TruncatedText>
        </Tag>
      </Table.Cell>
    );
  }

  if (identifier === "requester") {
    const nameOrAlias = user?.alias === undefined ? user?.name : user?.alias;

    return (
      <TruncatedTableCell identifier={identifier}>
        {nameOrAlias}
      </TruncatedTableCell>
    );
  }

  const ticketField = ticketFields.find(
    (field) => String(field.id) === identifier || field.type === identifier
  );

  if (ticketField === undefined) {
    return null;
  }

  switch (ticketField.type) {
    case "subject": {
      const requestUrl = `/hc/requests/${id}`;

      const navigateToRequestPage = (e: MouseEvent) => {
        e.preventDefault();
        location.assign(requestUrl);
      };

      return (
        <Table.Cell role="rowheader" data-test-id={`table-cell-${identifier}`}>
          <Subject href={requestUrl} onClick={navigateToRequestPage}>
            <TruncatedText>{subject || description}</TruncatedText>
          </Subject>
        </Table.Cell>
      );
    }

    case "priority":
      return (
        <TruncatedTableCell identifier={identifier}>
          {priority}
        </TruncatedTableCell>
      );

    case "tickettype":
      return (
        <TruncatedTableCell identifier={identifier}>{type}</TruncatedTableCell>
      );

    case "checkbox": {
      return (
        <TruncatedTableCell identifier={identifier}>
          {getCheckboxLabel(identifier)}
        </TruncatedTableCell>
      );
    }

    case "regexp":
    case "partialcreditcard":
    case "text":
    case "textarea":
    case "integer":
    case "decimal": {
      const value = getCustomFieldValue(identifier);

      return (
        <TruncatedTableCell identifier={identifier}>
          {value ? value.toString() : undefined}
        </TruncatedTableCell>
      );
    }

    case "date": {
      const value = getCustomFieldValue(identifier);

      return (
        <TruncatedTableCell identifier={identifier}>
          {value ? (
            <RelativeTime
              date={new Date(value as string)}
              locale={currentLocale}
            />
          ) : (
            <span>-</span>
          )}
        </TruncatedTableCell>
      );
    }

    case "tagger": {
      const value = getCustomFieldValue(identifier);
      const name = ticketField.custom_field_options?.find(
        (field) => field.value === value
      )?.name;

      return (
        <TruncatedTableCell identifier={identifier}>{name}</TruncatedTableCell>
      );
    }
    case "multiselect": {
      const value = getCustomFieldValue(identifier) || [];
      const tags = (value as string[]).map(
        (value) =>
          ticketField.custom_field_options?.find(
            (field) => field.value === value
          )?.name
      );

      return (
        <Table.Cell data-test-id={`table-cell-${identifier}`}>
          <Multiselect tags={tags as string[]} />
        </Table.Cell>
      );
    }
    default:
      return <Table.Cell />;
  }
}
