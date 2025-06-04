
import { useFormSubmit } from "./useFormSubmit";

const props = {
requestForm: {{json new_request_form}},
newRequestPath: {{json (page_path 'new_request')}},
parentId: {{json parent.id}},
parentIdPath: {{json parent.url}},
locale: {{json help_center.locale}},
baseLocale: {{json help_center.base_locale}},
hasAtMentions: {{json help_center.at_mentions_enabled}},
userRole: {{json user.role}},
userId: {{json user.id}},
brandId: {{json brand.id}},
organizations: {{json user.organizations}},
wysiwyg: true,
answerBotModal: {
    answerBot: {{json answer_bot}},
    hasRequestManagement: {{json help_center.request_management_enabled}},
    isSignedIn: {{json signed_in}},
    helpCenterPath: {{json (page_path 'help_center')}},
    requestsPath: {{json (page_path 'requests')}},
    requestPath: {{json (page_path 'request' id=answer_bot.request_id)}}
},
};


const props = {
    requestForm: {
        "accept_charset": "UTF-8",
        "action": "/hc/en-gb/requests",
        "http_method": "POST",
        "errors": null,
        "ticket_form_field": {
            "name": "request[ticket_form_id]",
            "value": 14544888000796,
            "error": null,
            "label": "Please choose your ticket type below",
            "required": true,
            "description": null,
            "type": "ticket_form",
            "id": -1,
            "relationship_target_type": null,
            "relationship_filter": null,
            "options": [{
                "name": "Default Ticket Form",
                "value": 14544888000796
            }]
        },
        "parent_id_field": null,
        "email_field": null,
        "cc_field": {
            "name": "request[collaborators][]",
            "value": "",
            "error": null,
            "label": "CC",
            "required": false,
            "description": null,
            "type": "cc_email",
            "id": -1,
            "relationship_target_type": null,
            "relationship_filter": null,
            "options": null
        },
        "organization_field": null,
        "due_date_field": {
            "name": "request[due_at]",
            "value": null,
            "error": null,
            "label": "Task due date",
            "required": false,
            "description": null,
            "type": "due_at",
            "id": -1,
            "relationship_target_type": null,
            "relationship_filter": null,
            "options": null
        },
        "ticket_fields": [{
            "name": "request[subject]",
            "value": null,
            "error": null,
            "label": "Subject",
            "required": true,
            "description": null,
            "type": "subject",
            "id": 14544887997084,
            "relationship_target_type": null,
            "relationship_filter": null,
            "options": null
        }, {
            "name": "request[description]",
            "value": null,
            "error": null,
            "label": "Description",
            "required": true,
            "description": "Please enter the details of your request. A member of our support staff will respond as soon as possible.",
            "type": "description",
            "id": 14544875893532,
            "relationship_target_type": null,
            "relationship_filter": null,
            "options": null
        }],
        "end_user_conditions": [],
        "attachments_field": {
            "name": "request[attachments][]",
            "label": "Attachments",
            "attachments": [],
            "error": null
        },
        "inline_attachments_fields": [],
        "description_mimetype_field": {
            "type": "hidden",
            "name": "request[description_mimetype]",
            "value": ""
        }
    },
    newRequestPath: "/hc/en-gb/requests/new",
    parentId: null,
    parentIdPath: null,
    locale: "en-gb",
    baseLocale: "en-gb",
    hasAtMentions: true,
    userRole: "end_user",
    userId: 14544877034268,
    brandId: 14544875966236,
    organizations: [],
    wysiwyg: true,
    answerBotModal: {
        answerBot: {
            "auth_token": null,
            "interaction_access_token": null,
            "articles": [],
            "request_id": null
        },
        hasRequestManagement: true,
        isSignedIn: true,
        helpCenterPath: "/hc/en-gb",
        requestsPath: "/hc/en-gb/requests",
        requestPath: null
    },
};
  
function newRequestForm(properties) {

    var newForm = "";

    if (properties.parentId) {
        newForm += `<p>
          <a href=${properties.parentIdPath}>
            Follow-up to request ${properties.parentId}
          </a>
        </p>`;
    }
    
    newForm += `<p aria-hidden="true">
                    "Fields marked with an asterisk (*) are required."
                </p>`;

    var handleSubmit = "";

    newForm += `<form action="${properties.action}" method="${properties.method}" accept-charset="${properties.accept_charset}" onsubmit="useFormSubmit()">`;
  /*    <Form
        ref={formRefCallback}
        action={action}
        method={http_method}
        acceptCharset={accept_charset}
        noValidate
        onSubmit={handleSubmit}
      > */

    if (properties.errors) {
        newForm += `<div class="alert alert-danger">${properties.errors}</div>`;
    }

    if (properties.parent_id_field) {
        
    }
      /* {parent_id_field && <ParentTicketField field={parent_id_field} />}  */

    if (properties.ticket_form_field.options.length > 0) {
     /*   <TicketFormField
        field={ticket_form_field}
        newRequestPath={newRequestPath}
        /> */
    }
    
    if (properties.email_field) {
      /*   <Input key={emailField.name} field={emailField} /> */
    }

    if (properties.cc_field) {
        {ccField && <CcField field={ccField} />}
    }

    if (properties.organization_field) {
    /*    <DropDown
            key={organizationField.name}
            field={organizationField}
            onChange={(value) => {
              handleOrganizationChange(value);
            }}
          /> */
    }

    if (properties.ticket_fields) {
        properties.ticket_fields.map((field) => {
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
                    baseLocale={baseLocale}
                    hasAtMentions={hasAtMentions}
                    userRole={userRole}
                    brandId={brandId}
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
                  baseLocale={baseLocale}
                  hasAtMentions={hasAtMentions}
                  userRole={userRole}
                  brandId={brandId}
                  onChange={(value) => handleChange(field, value)}
                />
              );
            case "priority":
            case "basic_priority":
            case "tickettype":
              return (
                <>
                  <DropDown
                    key={field.name}
                    field={field}
                    onChange={(value) => handleChange(field, value)}
                  />
                  {field.value === "task" && (
                    <DatePicker
                      field={dueDateField}
                      locale={baseLocale}
                      valueFormat="dateTime"
                      onChange={(value) => {
                        handleDueDateChange(value);
                      }}
                    />
                  )}
                </>
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
                <DatePicker
                  field={field}
                  locale={baseLocale}
                  valueFormat="date"
                  onChange={(value) => handleChange(field, value)}
                />
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
            case "lookup":
              return (
                <LookupField
                  key={field.name}
                  field={field}
                  userId={userId}
                  organizationId={
                    organizationField !== null
                      ? (organizationField.value as string)
                      : defaultOrganizationId
                  }
                  onChange={(value) => handleChange(field, value)}
                />
              );
            default:
              return <></>;
          }
        })
    }

    if (properties.attachments_field) {
       /* <Attachments field={attachments_field} /> */
    }

    if (properties.inline_attachments_fields) {
        properties.inline_attachments_fields.map(({ type, name, value }, index) => (
          <input key={index} type={type} name={name} value={value} />
        ))
    }
    
    if (properties.ticket_form_field.options.length === 0 || properties.ticket_form_field.value) {
        <Button isPrimary type="submit">
              {t("new-request-form.submit", "Submit")}
            </Button>
        newForm += ""
    }
    
    
    newForm += "</form>"

    if (properties.answerBotModal.answerBot.auth_token &&
        properties.answerBotModal.answerBot.interaction_access_token &&
        properties.answerBotModal.answerBot.articles.length > 0 &&
        properties.answerBotModal.answerBot.request_id) {
            <AnswerBotModal
            authToken={answerBot.auth_token}
            interactionAccessToken={answerBot.interaction_access_token}
            articles={answerBot.articles}
            requestId={answerBot.request_id}
            {...answerBotModal}
          />
        }
}