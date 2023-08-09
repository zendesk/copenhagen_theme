import type { RequestForm, TicketForm } from "./data-types";
import { TextInput } from "./fields/TextInput";
import { TextArea } from "./fields/TextArea";
import { DropDown } from "./fields/DropDown";
import { TicketFormField } from "./ticket-form-field/TicketFormField";
import { Button } from "@zendeskgarden/react-buttons";
import styled from "styled-components";
import { Alert } from "@zendeskgarden/react-notifications";
import { useSubmitHandler } from "./useSubmitHandler";
import { CcField } from "./fields/CcField";

export interface NewRequestFormProps {
  ticketForms: TicketForm[];
  requestForm: RequestForm;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.md};
`;

const Footer = styled.div`
  margin-top: ${(props) => props.theme.space.md};
`;

export function NewRequestForm({
  ticketForms,
  requestForm,
}: NewRequestFormProps) {
  const {
    fields,
    action,
    http_method,
    accept_charset,
    errors,
    ticket_form_field,
    ticket_forms_instructions,
  } = requestForm;
  const handleSubmit = useSubmitHandler();

  return (
    <Form
      action={action}
      method={http_method}
      acceptCharset={accept_charset}
      noValidate
      onSubmit={handleSubmit}
    >
      {errors && <Alert type="error">{errors}</Alert>}
      {ticketForms.length > 0 && (
        <TicketFormField
          label={ticket_forms_instructions}
          ticketFormField={ticket_form_field}
          ticketForms={ticketForms}
        />
      )}
      {fields.map((field) => {
        switch (field.type) {
          case "anonymous_requester_email":
          case "subject":
          case "regexp":
            return <TextInput field={field} />;
          case "description":
          case "textarea":
            return <TextArea field={field} />;
          case "priority":
          case "organization_id":
          case "tickettype":
            return <DropDown field={field} />;
          case "cc_email":
            return <CcField field={field} />;
          default:
            return <></>;
        }
      })}
      <Footer>
        {(ticketForms.length === 0 || ticket_form_field.value) && (
          <Button isPrimary type="submit">
            Submit
          </Button>
        )}
      </Footer>
    </Form>
  );
}
