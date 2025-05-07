import { memo } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { MD } from "@zendeskgarden/react-typography";
import { getColorV8 } from "@zendeskgarden/react-theming";
import { Grid } from "@zendeskgarden/react-grid";
import { Tag } from "@zendeskgarden/react-tags";
import type { ApprovalRequestTicket } from "../../types";

const TicketContainer = styled(Grid)`
  padding: ${(props) => props.theme.space.md}; /* 20px */
  border: ${(props) => props.theme.borders.sm}
    ${(props) => getColorV8("grey", 300, props.theme)};
  border-radius: ${(props) => props.theme.borderRadii.md}; /* 4px */
`;

const TicketDetailsHeader = styled(MD)`
  margin-bottom: ${(props) => props.theme.space.md}; /* 20px */
`;

const FieldLabel = styled(MD)`
  color: ${(props) => getColorV8("grey", 600, props.theme)};
`;

const MultiselectTag = styled(Tag)`
  margin-inline-end: ${(props) => props.theme.space.xxs}; /* 4px */
`;

const CustomFieldsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${(props) => props.theme.space.md}; /* 20px */
  margin-top: ${(props) => props.theme.space.md}; /* 20px */

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const NULL_VALUE_PLACEHOLDER = "-";

function CustomFieldValue({
  value,
}: {
  value: string | boolean | Array<string> | undefined;
}) {
  const { t } = useTranslation();

  if (Array.isArray(value) && value.length > 0) {
    return (
      <MD>
        {value.map((val) => (
          <MultiselectTag key={val} hue="grey">
            {val}
          </MultiselectTag>
        ))}
      </MD>
    );
  }

  if (typeof value === "boolean") {
    return (
      <MD>
        {value
          ? t(
              "approval-requests.request.ticket-details.checkbox-value.yes",
              "Yes"
            )
          : t(
              "approval-requests.request.ticket-details.checkbox-value.no",
              "No"
            )}
      </MD>
    );
  }

  if (!value || (Array.isArray(value) && value.length === 0)) {
    return <MD>{NULL_VALUE_PLACEHOLDER}</MD>;
  }

  return <MD>{value}</MD>;
}

interface ApprovalTicketDetailsProps {
  ticket: ApprovalRequestTicket;
}

const TicketPriorityKeys = {
  Low: "approval-requests.request.ticket-details.priority_low",
  Normal: "approval-requests.request.ticket-details.priority_normal",
  High: "approval-requests.request.ticket-details.priority_high",
  Urgent: "approval-requests.request.ticket-details.priority_urgent",
};

function ApprovalTicketDetails({ ticket }: ApprovalTicketDetailsProps) {
  const { t } = useTranslation();

  const displayPriority = TicketPriorityKeys[
    ticket.priority as keyof typeof TicketPriorityKeys
  ]
    ? t(
        TicketPriorityKeys[ticket.priority as keyof typeof TicketPriorityKeys],
        ticket.priority
      )
    : ticket.priority;

  return (
    <TicketContainer>
      <TicketDetailsHeader isBold>
        {t("approval-requests.request.ticket-details.header", "Ticket details")}
      </TicketDetailsHeader>
      <CustomFieldsGrid>
        <div>
          <FieldLabel>
            {t(
              "approval-requests.request.ticket-details.requester",
              "Requester"
            )}
          </FieldLabel>
          <MD>{ticket.requester.name}</MD>
        </div>
        <div>
          <FieldLabel>
            {t("approval-requests.request.ticket-details.id", "ID")}
          </FieldLabel>
          <MD>{ticket.id}</MD>
        </div>
        <div>
          <FieldLabel>
            {t("approval-requests.request.ticket-details.priority", "Priority")}
          </FieldLabel>
          <MD>{displayPriority}</MD>
        </div>
        {ticket.custom_fields.map((field) => (
          <div key={String(field.id)}>
            <FieldLabel>{field.title_in_portal}</FieldLabel>
            <CustomFieldValue value={field.value} />
          </div>
        ))}
      </CustomFieldsGrid>
    </TicketContainer>
  );
}

export default memo(ApprovalTicketDetails);
