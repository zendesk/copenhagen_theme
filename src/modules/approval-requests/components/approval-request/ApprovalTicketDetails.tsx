import { memo } from "react";
import styled from "styled-components";
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
  margin-right: ${(props) => props.theme.space.xxs}; /* 4px */
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
  if (!value) {
    return <MD>{NULL_VALUE_PLACEHOLDER}</MD>;
  }
  if (Array.isArray(value)) {
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
    return <MD>{value ? "Yes" : "No"}</MD>;
  }

  return <MD>{value}</MD>;
}

interface ApprovalTicketDetailsProps {
  ticket: ApprovalRequestTicket;
}

function ApprovalTicketDetails({ ticket }: ApprovalTicketDetailsProps) {
  return (
    <TicketContainer>
      <TicketDetailsHeader isBold>Ticket Details</TicketDetailsHeader>
      <CustomFieldsGrid>
        <div>
          <FieldLabel>Requester</FieldLabel>
          <MD>{ticket.requester.name}</MD>
        </div>
        <div>
          <FieldLabel>ID</FieldLabel>
          <MD>{ticket.id}</MD>
        </div>
        <div>
          <FieldLabel>Priority</FieldLabel>
          <MD>{ticket.priority}</MD>
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
