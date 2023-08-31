import type { RequestForm, TicketForm } from "./data-types";
import { Input } from "./fields/Input";
import { TextArea } from "./fields/TextArea";
import { DropDown } from "./fields/DropDown";
import { Checkbox } from "./fields/Checkbox";
import { MultiSelect } from "./fields/MultiSelect";
import { TicketFormField } from "./ticket-form-field/TicketFormField";
import { ParentTicketField } from "./parent-ticket-field/ParentTicketField";
import { Button } from "@zendeskgarden/react-buttons";
import styled from "styled-components";
import { Alert } from "@zendeskgarden/react-notifications";
import { useSubmitHandler } from "./useSubmitHandler";
import { Suspense, lazy, useState } from "react";
import { usePrefilledTicketFields } from "./usePrefilledTicketFields";

export interface NewRequestFormProps {
  ticketForms: TicketForm[];
  requestForm: RequestForm;
  parentId: string;
  locale: string;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.md};
`;

const Footer = styled.div`
  margin-top: ${(props) => props.theme.space.md};
`;

const DatePicker = lazy(() => import("./fields/DatePicker"));
const CcField = lazy(() => import("./fields/cc-field/CcField"));

export function NewRequestForm({
  ticketForms,
  requestForm,
  parentId,
  locale,
}: NewRequestFormProps) {
  const {
    fields,
    action,
    http_method,
    accept_charset,
    errors,
    ticket_form_field,
    ticket_forms_instructions,
    parent_id_field,
  } = requestForm;
  const handleSubmit = useSubmitHandler();
  const ticketFields = usePrefilledTicketFields(fields);
  const ticketTypeField = ticketFields.find(
    (field) => field.type === "tickettype"
  );
  const [showDueDate, setShowDueDate] = useState(
    ticketTypeField && ticketTypeField.value === "task"
  );

  return (
    <Form
      action={action}
      method={http_method}
      acceptCharset={accept_charset}
      noValidate
      onSubmit={handleSubmit}
    >
      {errors && <Alert type="error">{errors}</Alert>}
      {parentId && <ParentTicketField field={parent_id_field} />}
      {ticketForms.length > 0 && (
        <TicketFormField
          label={ticket_forms_instructions}
          ticketFormField={ticket_form_field}
          ticketForms={ticketForms}
        />
      )}
      {ticketFields.map((field) => {
        switch (field.type) {
          case "anonymous_requester_email":
          case "subject":
          case "text":
          case "integer":
          case "decimal":
          case "regexp":
          case "partialcreditcard":
            return <Input field={field} />;
          case "description":
          case "textarea":
            return <TextArea field={field} />;
          case "priority":
          case "organization_id":
            return <DropDown field={field} />;
          case "tickettype":
            return (
              <DropDown
                field={field}
                onChange={(value) => {
                  setShowDueDate(value === "task");
                }}
              />
            );
          case "cc_email":
            return (
              <Suspense fallback={<></>}>
                <CcField field={field} />
              </Suspense>
            );
          case "checkbox":
            return <Checkbox field={field} />;
          case "date":
            return (
              <Suspense fallback={<></>}>
                <DatePicker field={field} locale={locale} valueFormat="date" />
              </Suspense>
            );
          case "multiselect":
            return <MultiSelect field={field} />;
          case "tagger":
            return <div>tagger</div>;
          case "due_at":
            return (
              showDueDate && (
                <Suspense fallback={<></>}>
                  <DatePicker
                    field={field}
                    locale={locale}
                    valueFormat="dateTime"
                  />
                </Suspense>
              )
            );
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
