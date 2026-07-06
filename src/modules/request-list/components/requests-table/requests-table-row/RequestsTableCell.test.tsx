import { render, screen } from "@testing-library/react";
import { RequestsTableCell } from "./RequestsTableCell";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import type {
  Request,
  TicketField,
  CustomStatus,
  RequestUser,
} from "../../../data-types";

describe("RequestsTableCell", () => {
  const mockRequest: Request = {
    id: 123,
    created_at: "2023-01-01T10:00:00Z",
    updated_at: "2023-01-02T15:30:00Z",
    subject: "Test Subject",
    description: "No Jenny uhuh",
    status: "open",
    priority: "high",
    type: "question",
    requester_id: 456,
    custom_status_id: 1,
    custom_fields: [
      { id: 100, value: "custom text value" },
      { id: 101, value: true },
      { id: 102, value: ["option1", "option2"] },
      { id: 103, value: "2023-06-15" },
    ],
  };

  const mockUser: RequestUser = {
    id: 456,
    name: "Jenny Don't be Hasty",
  };

  const mockAliasUser: RequestUser = {
    id: 456,
    name: "Paolo",
    alias: "Baby",
  };

  const mockTicketFields: TicketField[] = [
    {
      id: 1,
      type: "subject",
      title_in_portal: "Subject",
      custom_field_options: [],
      active: true,
      title: "Subject",
      description: "Subject field description",
    },
    {
      id: 2,
      type: "priority",
      title_in_portal: "Priority",
      custom_field_options: [],
      active: true,
      title: "Priority",
      description: "Priority field description",
    },
    {
      id: 3,
      type: "tickettype",
      title_in_portal: "Type",
      custom_field_options: [],
      active: true,
      title: "Type",
      description: "Type field description",
    },
    {
      id: 100,
      type: "text",
      title_in_portal: "Custom Text Field",
      custom_field_options: [],
      active: true,
      title: "Custom Text Field",
      description: "Custom text field description",
    },
    {
      id: 101,
      type: "checkbox",
      title_in_portal: "Custom Checkbox",
      custom_field_options: [],
      active: true,
      title: "Custom Checkbox",
      description: "Custom checkbox field description",
    },
    {
      id: 102,
      type: "multiselect",
      title_in_portal: "Multi Select",
      active: true,
      title: "Multi Select",
      description: "Multi select field description",
      custom_field_options: [
        { id: 1, name: "Option 1", value: "option1" },
        { id: 2, name: "Option 2", value: "option2" },
      ],
    },
    {
      id: 103,
      type: "date",
      active: true,
      title: "Date Field",
      title_in_portal: "Date Field",
      custom_field_options: [],
      description: "Date field description",
    },
  ];

  const mockCustomStatuses: CustomStatus[] = [
    {
      id: 1,
      label: "Custom Open",
      end_user_label: "Custom Open",
      description: "Custom open status",
      status_category: "open",
      end_user_description: "Custom open status description",
    },
  ];

  const defaultProps = {
    ticketFields: mockTicketFields,
    request: mockRequest,
    customStatuses: mockCustomStatuses,
    customStatusesEnabled: false,
    user: mockUser,
  };

  const renderCell = (
    props: Partial<typeof defaultProps> & { identifier: string }
  ) => {
    return render(
      <ThemeProvider>
        <table>
          <tbody>
            <tr>
              <RequestsTableCell {...defaultProps} {...props} />
            </tr>
          </tbody>
        </table>
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Built-in field rendering", () => {
    test.each([
      ["id", "#123"],
      ["created_at", "Jan 1, 2023"],
      ["updated_at", "Jan 2, 2023"],
      ["status", "Open"],
    ])("renders %s field correctly", (identifier, expectedText) => {
      renderCell({ identifier });
      expect(
        screen.getAllByText(expectedText, { exact: false })[0]
      ).toBeInTheDocument();
    });

    it("renders status field with custom status when enabled", () => {
      renderCell({ identifier: "status", customStatusesEnabled: true });
      expect(screen.getAllByText("Custom Open")[0]).toBeInTheDocument();
    });
  });

  describe("Requester column", () => {
    test("renders requester name when alias is not provided", () => {
      renderCell({ identifier: "requester" });
      expect(
        screen.getAllByText("Jenny Don't be Hasty", { exact: false })[0]
      ).toBeInTheDocument();
    });

    test("renders requester alias when provided", () => {
      renderCell({ identifier: "requester", user: mockAliasUser });
      expect(
        screen.getAllByText("Baby", { exact: false })[0]
      ).toBeInTheDocument();
    });

    test("renders requester name when alias is empty", () => {
      const userWithEmptyAlias = { ...mockAliasUser, alias: "" };
      renderCell({ identifier: "requester", user: userWithEmptyAlias });

      expect(
        screen.getAllByText("Paolo", { exact: false })[0]
      ).toBeInTheDocument();
    });
  });

  describe("Custom field rendering", () => {
    test.each([
      ["100", "custom text value"],
      ["101", "Selected"],
      ["102", "Option 1"],
      ["102", "Option 2"],
      ["103", "Jun 15, 2023"],
      ["2", "high"],
      ["3", "question"],
    ])("renders field %s correctly", (identifier, expectedText) => {
      renderCell({ identifier });
      expect(
        screen.getAllByText(expectedText, { exact: false })[0]
      ).toBeInTheDocument();
    });

    it("renders checkbox field correctly when false", () => {
      const requestWithFalseCheckbox = {
        ...mockRequest,
        custom_fields: [
          { id: 100, value: "custom text value" },
          { id: 101, value: false },
          { id: 102, value: ["option1", "option2"] },
          { id: 103, value: "2023-06-15" },
        ],
      };
      renderCell({ request: requestWithFalseCheckbox, identifier: "101" });
      expect(screen.getAllByText("Not selected")[0]).toBeInTheDocument();
    });
  });

  describe("Status mappings", () => {
    const statusTests = [
      { status: "new", expectedLabel: "Open" },
      { status: "open", expectedLabel: "Open" },
      { status: "hold", expectedLabel: "Open" },
      { status: "pending", expectedLabel: "Awaiting reply" },
      { status: "solved", expectedLabel: "Solved" },
      { status: "closed", expectedLabel: "Solved" },
    ];

    test.each(statusTests)(
      "renders %s status correctly",
      ({ status, expectedLabel }) => {
        const requestWithStatus: Request = {
          ...mockRequest,
          status: status as Request["status"],
        };
        renderCell({ request: requestWithStatus, identifier: "status" });
        expect(screen.getAllByText(expectedLabel)[0]).toBeInTheDocument();
      }
    );
  });

  describe("Subject column", () => {
    test("renders subject as a clickable link", () => {
      renderCell({ identifier: "subject" });
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/hc/requests/123");
      expect(screen.getAllByText("Test Subject")[0]).toBeInTheDocument();
    });

    test("renders description when subject is not available", () => {
      const requestWithoutSubject = {
        ...mockRequest,
        subject: "",
      };
      renderCell({ identifier: "subject", request: requestWithoutSubject });
      expect(screen.getAllByText("No Jenny uhuh")[0]).toBeInTheDocument();
    });

    test("renders subject even when subject ticket field is not in ticketFields", () => {
      const ticketFieldsWithoutSubject = mockTicketFields.filter(
        (field) => field.type !== "subject"
      );
      renderCell({
        identifier: "subject",
        ticketFields: ticketFieldsWithoutSubject,
      });
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/hc/requests/123");
      expect(screen.getAllByText("Test Subject")[0]).toBeInTheDocument();
    });
  });
});
