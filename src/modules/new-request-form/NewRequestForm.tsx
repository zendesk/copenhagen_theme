import type { Field, RequestForm, TicketForm } from "./data-types";
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
import { useFormSubmit } from "./useFormSubmit";
import { Suspense, lazy, useState } from "react";
import { usePrefilledTicketFields } from "./usePrefilledTicketFields";
import { Attachments } from "./fields/attachments/Attachments";
import { useEndUserConditions } from "./useEndUserConditions";
import { CreditCard } from "./fields/CreditCard";
import { Tagger } from "./fields/Tagger";
import { SuggestedArticles } from "./suggested-articles/SuggestedArticles";

export interface NewRequestFormProps {
  ticketForms: TicketForm[];
  requestForm: RequestForm;
  wysiwyg: boolean;
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
  wysiwyg,
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
    end_user_conditions,
    attachments_field,
    inline_attachments_fields,
    description_mimetype_field,
  } = requestForm;
  const prefilledTicketFields = usePrefilledTicketFields(fields);
  const [ticketFields, setTicketFields] = useState(prefilledTicketFields);
  const visibleFields = useEndUserConditions(ticketFields, end_user_conditions);
  const { formRefCallback, handleSubmit } = useFormSubmit(ticketFields);

  function handleChange(field: Field, value: Field["value"]) {
    setTicketFields(
      ticketFields.map((ticketField) =>
        ticketField.name === field.name
          ? { ...ticketField, value }
          : ticketField
      )
    );
  }

  return (
    <Form
      ref={formRefCallback}
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
      {visibleFields.map((field) => {
        switch (field.type) {
          case "subject":
            return (
              <>
                <Input
                  key={field.name}
                  field={field}
                  onChange={(value) => handleChange(field, value)}
                />
                <SuggestedArticles
                  query={field.value as string | undefined}
                  locale={locale}
                />
              </>
            );
          case "anonymous_requester_email":
          case "text":
          case "integer":
          case "decimal":
          case "regexp":
            return (
              <Input
                key={field.name}
                field={field}
                onChange={(value) => handleChange(field, value)}
              />
            );
          case "partialcreditcard":
            return (
              <CreditCard
                field={field}
                onChange={(value) => handleChange(field, value)}
              />
            );
          case "description":
            return (
              <>
                <TextArea
                  key={field.name}
                  field={field}
                  hasWysiwyg={wysiwyg}
                  onChange={(value) => handleChange(field, value)}
                />
                <input
                  type="hidden"
                  name={description_mimetype_field.name}
                  value={wysiwyg ? "text/html" : "text/plain"}
                />
              </>
            );
          case "textarea":
            return (
              <TextArea
                key={field.name}
                field={field}
                hasWysiwyg={false}
                onChange={(value) => handleChange(field, value)}
              />
            );
          case "organization_id":
          case "priority":
          case "tickettype":
            return (
              <DropDown
                key={field.name}
                field={field}
                onChange={(value) => handleChange(field, value)}
              />
            );
          case "due_at": {
            const isTask =
              ticketFields.find((field) => field.type === "tickettype")
                ?.value === "task";

            return (
              isTask && (
                <Suspense fallback={<></>}>
                  <DatePicker
                    field={field}
                    locale={locale}
                    valueFormat="dateTime"
                  />
                </Suspense>
              )
            );
          }
          case "cc_email":
            return (
              <Suspense fallback={<></>}>
                <CcField field={field} />
              </Suspense>
            );
          case "checkbox":
            return (
              <Checkbox
                field={field}
                onChange={(value: boolean) => handleChange(field, value)}
              />
            );
          case "date":
            return (
              <Suspense fallback={<></>}>
                <DatePicker field={field} locale={locale} valueFormat="date" />
              </Suspense>
            );
          case "multiselect":
            return <MultiSelect field={field} />;
          case "tagger":
            return (
              <Tagger
                key={field.name}
                field={field}
                onChange={(value) => handleChange(field, value)}
              />
            );
          default:
            return <></>;
        }
      })}
      {attachments_field && <Attachments field={attachments_field} />}
      {inline_attachments_fields.map(({ type, name, value }, index) => (
        <input key={index} type={type} name={name} value={value} />
      ))}
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
