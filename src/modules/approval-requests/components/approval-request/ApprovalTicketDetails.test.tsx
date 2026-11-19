import { render } from "../../../test/render";
import { screen } from "@testing-library/react";
import ApprovalTicketDetails from "./ApprovalTicketDetails";
import type { ApprovalRequestTicket } from "../../types";

jest.mock(
  "@zendeskgarden/svg-icons/src/16/download-stroke.svg",
  () => "svg-mock"
);
jest.mock("@zendeskgarden/svg-icons/src/16/eye-stroke.svg", () => "svg-mock");
jest.mock(
  "@zendeskgarden/svg-icons/src/16/file-generic-stroke.svg",
  () => "svg-mock"
);

const mockTicket: ApprovalRequestTicket = {
  id: "123",
  priority: "normal",
  requester: {
    id: 456,
    name: "John Requester",
    photo: {
      content_url: null,
    },
  },
  custom_fields: [],
};

describe("ApprovalTicketDetails", () => {
  it("renders basic ticket details", () => {
    render(<ApprovalTicketDetails ticket={mockTicket} />);

    expect(screen.getByText("Ticket details")).toBeInTheDocument();
    expect(screen.getByText("John Requester")).toBeInTheDocument();
    expect(screen.getByText("123")).toBeInTheDocument();
    expect(screen.getByText("normal")).toBeInTheDocument();
  });

  it("renders custom fields with string values", () => {
    const ticketWithCustomFields: ApprovalRequestTicket = {
      ...mockTicket,
      custom_fields: [
        { id: "field1", title_in_portal: "Department", value: "IT" },
        { id: "field2", title_in_portal: "Cost Center", value: "123-45" },
      ],
    };

    render(<ApprovalTicketDetails ticket={ticketWithCustomFields} />);

    expect(screen.getByText("Department")).toBeInTheDocument();
    expect(screen.getByText("IT")).toBeInTheDocument();
    expect(screen.getByText("Cost Center")).toBeInTheDocument();
    expect(screen.getByText("123-45")).toBeInTheDocument();
  });

  it("renders custom fields with boolean values", () => {
    const ticketWithBooleanFields: ApprovalRequestTicket = {
      ...mockTicket,
      custom_fields: [
        { id: "field1", title_in_portal: "Urgent", value: true },
        { id: "field2", title_in_portal: "Reviewed", value: false },
      ],
    };

    render(<ApprovalTicketDetails ticket={ticketWithBooleanFields} />);

    expect(screen.getByText("Urgent")).toBeInTheDocument();
    expect(screen.getByText("Yes")).toBeInTheDocument();
    expect(screen.getByText("Reviewed")).toBeInTheDocument();
    expect(screen.getByText("No")).toBeInTheDocument();
  });

  it("renders custom fields with array values", () => {
    const ticketWithArrayFields: ApprovalRequestTicket = {
      ...mockTicket,
      custom_fields: [
        {
          id: "field1",
          title_in_portal: "Categories",
          value: ["Hardware", "Software"],
        },
      ],
    };

    render(<ApprovalTicketDetails ticket={ticketWithArrayFields} />);

    expect(screen.getByText("Categories")).toBeInTheDocument();
    expect(screen.getByText("Hardware")).toBeInTheDocument();
    expect(screen.getByText("Software")).toBeInTheDocument();
  });

  it("renders placeholder for empty or undefined custom field values", () => {
    const ticketWithEmptyFields: ApprovalRequestTicket = {
      ...mockTicket,
      custom_fields: [
        { id: "field1", title_in_portal: "Empty Field", value: undefined },
        { id: "field2", title_in_portal: "Empty Array", value: [] },
      ],
    };

    render(<ApprovalTicketDetails ticket={ticketWithEmptyFields} />);

    expect(screen.getByText("Empty Field")).toBeInTheDocument();
    expect(screen.getAllByText("-")).toHaveLength(2);
  });

  it("renders the attachments section when the request has attachments", () => {
    render(
      <ApprovalTicketDetails
        ticket={mockTicket}
        attachments={[
          {
            id: "01M73KGZ2HQ94KS171HQJ6EXCH",
            filename: "generic file",
            content_url: "https://example.com/generic",
            content_type: "application/pdf",
            size: 24,
            created_at: "2026-11-10T20:48:50Z",
            created_by: "approver",
            malware_scan_status: "malware_not_found",
          },
          {
            id: "01M73KGZ2HQ94KS171HQJ6EXCI",
            filename: "document.doc",
            content_url: "https://example.com/document.doc",
            content_type: "application/msword",
            size: 1200,
            created_at: "2026-11-10T20:48:50Z",
            created_by: "approver",
            malware_scan_status: "malware_not_found",
          },
        ]}
      />
    );

    expect(screen.getByText("Attachments")).toBeInTheDocument();
    expect(screen.getByText("generic file")).toBeInTheDocument();
    expect(screen.getByText("document.doc")).toBeInTheDocument();
  });

  it("does not render the attachments section when attachments is absent (effectively approvals_attachments arturo disabled)", () => {
    render(<ApprovalTicketDetails ticket={mockTicket} />);

    expect(screen.queryByText("Attachments")).not.toBeInTheDocument();
  });

  it("does not render the attachments section when attachments is empty (feature on, no files)", () => {
    render(<ApprovalTicketDetails ticket={mockTicket} attachments={[]} />);

    expect(screen.queryByText("Attachments")).not.toBeInTheDocument();
  });
});
