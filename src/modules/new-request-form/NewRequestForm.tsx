import type { RequestForm, TicketForm } from "./data-types";
import { TextInput } from "./fields/TextInput";
import { TextArea } from "./fields/TextArea";
import { DropDown } from "./fields/DropDown";
import { TicketFormField } from "./ticket-form-field/TicketFormField";
import type { FormEventHandler } from "react";
import { Button } from "@zendeskgarden/react-buttons";
import styled from "styled-components";
import { Alert } from "@zendeskgarden/react-notifications";

export interface NewRequestFormProps {
  ticketForms: TicketForm[];
  requestForm: RequestForm;
}

const StyledForm = styled.form`
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

  // NOTE: This is a temporary handling of the CSRF token
  const fetchCsrfToken = async () => {
    const response = await fetch("/hc/api/internal/csrf_token.json");
    const { current_session } = await response.json();
    return current_session.csrf_token as string;
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    fetchCsrfToken().then((token) => {
      const hiddenInput = document.createElement("input");
      hiddenInput.type = "hidden";
      hiddenInput.name = "authenticity_token";
      hiddenInput.value = token;
      form.appendChild(hiddenInput);
      form.submit();
      form.removeChild(hiddenInput);
    });
  };

  return (
    <StyledForm
      action={action}
      method={http_method}
      acceptCharset={accept_charset}
      noValidate
      onSubmit={handleSubmit}
    >
      {errors && <Alert type="error">{errors}</Alert>}
      <TicketFormField
        label={ticket_forms_instructions}
        ticketFormField={ticket_form_field}
        ticketForms={ticketForms}
      />
      {fields.map((field) => {
        switch (field.type) {
          case "anonymous_requester_email":
          case "subject":
            return <TextInput field={field} />;
          case "description":
          case "textarea":
            return <TextArea field={field} />;
          case "priority":
            return <DropDown field={field} />;
          default:
            return <></>;
        }
      })}
      <Footer>
        {ticket_form_field.value && (
          <Button isPrimary type="submit">
            Submit
          </Button>
        )}
      </Footer>
    </StyledForm>
  );
}
