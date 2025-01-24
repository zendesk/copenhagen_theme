import styled from "styled-components";
import { MD } from "@zendeskgarden/react-typography";
import { getColorV8 } from "@zendeskgarden/react-theming";
import { Grid, Row, Col } from "@zendeskgarden/react-grid";
import type { MockTicket } from "../../types";

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

const CustomFieldsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${(props) => props.theme.space.md}; /* 20px */
  margin-top: ${(props) => props.theme.space.md}; /* 20px */
`;

interface ApprovalTicketDetailsProps {
  ticket: MockTicket;
}

export function ApprovalTicketDetails({ ticket }: ApprovalTicketDetailsProps) {
  return (
    <TicketContainer>
      <TicketDetailsHeader isBold>Ticket Details</TicketDetailsHeader>
      <Row>
        <Col size={4}>
          <FieldLabel>Requester</FieldLabel>
          <MD>{ticket.requester.name}</MD>
        </Col>
        <Col size={4}>
          <FieldLabel>ID</FieldLabel>
          <MD>{ticket.id}</MD>
        </Col>
        <Col size={4}>
          <FieldLabel>Priority</FieldLabel>
          <MD>{ticket.priority}</MD>
        </Col>
      </Row>
      <CustomFieldsGrid>
        {ticket.custom_fields.map((field) => (
          <div key={field.id}>
            <FieldLabel>{field.title_in_portal}</FieldLabel>
            <MD>{field.value}</MD>
          </div>
        ))}
      </CustomFieldsGrid>
    </TicketContainer>
  );
}
