import { screen, waitFor } from "@testing-library/react";
import { NewRequestForm } from "./NewRequestForm";
import type { NewRequestFormProps } from "./NewRequestForm";
import type { RequestForm } from "./data-types";
import { render } from "../test/render";
import type { TicketFieldObject } from "../ticket-fields/data-types/TicketFieldObject";

const ticketField = (
  overrides: Partial<TicketFieldObject>
): TicketFieldObject => ({
  id: 1,
  name: "request[custom_fields][1]",
  type: "text",
  description: "",
  label: "Custom text",
  required: false,
  error: null,
  options: [],
  value: null,
  ...overrides,
});

const subjectField = ticketField({
  id: 2,
  name: "request[subject]",
  label: "Subject",
});

const descriptionField = ticketField({
  id: 3,
  name: "request[description]",
  type: "textarea",
  label: "Description",
});

const requestForm = (overrides: Partial<RequestForm> = {}): RequestForm => ({
  accept_charset: "UTF-8",
  action: "/api/v2/requests",
  http_method: "post",
  errors: null,
  ticket_form_field: ticketField({
    id: 0,
    name: "ticket_form_id",
    type: "ticket_form",
    label: "Ticket form",
  }),
  parent_id_field: null,
  email_field: null,
  cc_field: null,
  organization_field: null,
  due_date_field: ticketField({
    id: 4,
    name: "request[due_date]",
    type: "date",
    label: "Due date",
  }),
  ticket_fields: [subjectField, descriptionField],
  end_user_conditions: [],
  attachments_field: null,
  inline_attachments_fields: [],
  description_mimetype_field: {
    type: "hidden",
    name: "request[description_mimetype]",
    value: "text/plain",
  },
  ...overrides,
});

const baseProps = {
  requestForm: requestForm(),
  wysiwyg: false,
  newRequestPath: "/hc/en-us/requests/new",
  parentId: "",
  parentIdPath: "",
  locale: "en-us",
  baseLocale: "en-us",
  hasAtMentions: false,
  userRole: "end_user",
  userId: 1,
  brandId: 1,
  showSuggestedArticles: false,
  organizations: [],
  answerBotModal: {
    answerBot: null,
    answerBotGenerativeExperience: null,
    hasRequestManagement: false,
    isSignedIn: true,
    helpCenterPath: "/hc/en-us",
    requestsPath: "/hc/en-us/requests",
    requestPath: "/hc/en-us/requests/1",
  },
} as NewRequestFormProps;

describe("NewRequestForm focus management on validation errors", () => {
  /* Focus is deferred until after the page load to work around VoiceOver
     resetting its cursor to the top of the page, hence the waitFor. */
  test("moves focus to the first field in error", async () => {
    const firstError = "First field error";
    const secondError = "Second field error";

    render(
      <NewRequestForm
        {...baseProps}
        requestForm={requestForm({
          ticket_fields: [
            ticketField({ label: "First field", error: firstError }),
            ticketField({
              id: 5,
              name: "request[custom_fields][5]",
              label: "Second field",
              error: secondError,
            }),
          ],
        })}
      />
    );

    await waitFor(() =>
      expect(document.activeElement).toBe(
        screen.getByLabelText("First field", { exact: false })
      )
    );
    expect(
      screen.getByLabelText("Second field", { exact: false })
    ).not.toHaveFocus();
  });

  test("does not move focus when the user already started interacting", async () => {
    render(
      <NewRequestForm
        {...baseProps}
        requestForm={requestForm({
          ticket_fields: [
            ticketField({ label: "First field", error: "Error" }),
          ],
        })}
      />
    );

    const submitButton = screen.getByText("Submit");
    submitButton.focus();

    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(document.activeElement).toBe(submitButton);
    expect(
      screen.getByLabelText("First field", { exact: false })
    ).not.toHaveFocus();
  });

  test("associates the error message with the field via aria-describedby", () => {
    render(
      <NewRequestForm
        {...baseProps}
        requestForm={requestForm({
          ticket_fields: [
            ticketField({ label: "First field", error: "Error" }),
          ],
        })}
      />
    );

    const input = screen.getByLabelText("First field", { exact: false });
    const describedById = input.getAttribute("aria-describedby");

    expect(describedById).not.toBeNull();

    const describedByElement = document.getElementById(describedById!);

    expect(describedByElement).not.toBeNull();
    expect(describedByElement).toHaveAttribute("role", "alert");
    expect(describedByElement).toHaveTextContent("Error");
  });

  test("moves focus to the form-level error alert when there are no field errors", async () => {
    render(
      <NewRequestForm
        {...baseProps}
        requestForm={requestForm({ errors: "Form level error" })}
      />
    );

    await waitFor(() =>
      expect(document.activeElement).toHaveTextContent("Form level error")
    );
  });

  test("does not move focus when there are no errors", async () => {
    render(<NewRequestForm {...baseProps} />);

    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(document.activeElement).toBe(document.body);
  });
});
