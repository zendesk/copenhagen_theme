import { screen, render } from "@testing-library/react";
import type { ReactElement } from "react";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import ApprovalTicketDetails from "./ApprovalTicketDetails";
import type { ApprovalRequestTicket } from "../../types";

const renderWithTheme = (ui: ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

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
    renderWithTheme(<ApprovalTicketDetails ticket={mockTicket} />);

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

    renderWithTheme(<ApprovalTicketDetails ticket={ticketWithCustomFields} />);

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

    renderWithTheme(<ApprovalTicketDetails ticket={ticketWithBooleanFields} />);

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

    renderWithTheme(<ApprovalTicketDetails ticket={ticketWithArrayFields} />);

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

    renderWithTheme(<ApprovalTicketDetails ticket={ticketWithEmptyFields} />);

    expect(screen.getByText("Empty Field")).toBeInTheDocument();
    expect(screen.getAllByText("-")).toHaveLength(2);
  });
});
