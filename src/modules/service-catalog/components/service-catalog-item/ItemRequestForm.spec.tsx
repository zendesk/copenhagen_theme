import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { DEFAULT_THEME } from "@zendeskgarden/react-theming";
import { ItemRequestForm } from "./ItemRequestForm";
import type { TicketFieldObject } from "../../../ticket-fields/data-types/TicketFieldObject";
import type {
  ServiceCatalogItem,
  AttachmentOption,
} from "../../data-types/ServiceCatalogItem";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue: string) => defaultValue,
  }),
}));

jest.mock("../../../ticket-fields", () => ({
  RequestFormField: ({ field }: { field: TicketFieldObject }) => (
    <div data-testid={`request-field-${field.id}`} />
  ),
}));

jest.mock("../../../ticket-fields/fields/attachments/Attachments", () => ({
  Attachments: ({ field }: { field: { label: string } }) => (
    <div data-testid="attachments-field">{field.label}</div>
  ),
}));

jest.mock("../change-user-modal/index", () => ({
  ChangeUserModal: () => null,
}));

describe("ItemRequestForm", () => {
  const serviceCatalogItem: ServiceCatalogItem = {
    id: "01M3KF50FGJ1WK4G7S9TDAW0G9",
    name: "Test Item",
    description: "Test Description",
    form_id: "9848565352189",
    thumbnail_url: null,
    categories: [],
    is_request_on_behalf: false,
    published_at: "2025-01-01T00:00:00Z",
  };

  const requestFields: TicketFieldObject[] = [
    {
      id: 1,
      name: "custom_fields_1",
      type: "text",
      description: "Field 1",
      label: "Field 1",
      required: false,
      options: [],
      value: null,
      error: null,
    },
  ];

  const attachmentOption: AttachmentOption = {
    id: "attachment-option-1",
    name: "Attachment",
    description: "Upload a file",
    is_required: true,
    position_in_portal: null,
  };

  const defaultProps: Parameters<typeof ItemRequestForm>[0] = {
    requestFields,
    serviceCatalogItem,
    baseLocale: "en-us",
    hasAtMentions: false,
    userRole: "end_user",
    requesterId: 123,
    requestOnBehalfEnabled: false,
    userName: "Test User",
    selectedUser: null,
    setSelectedUser: jest.fn(),
    brandId: 456,
    defaultOrganizationId: null,
    handleChange: jest.fn(),
    onSubmit: jest.fn(),
    attachmentsOption: undefined,
    attachmentsRequiredError: null,
    setAttachmentsRequiredError: jest.fn(),
    isRequestFieldsLoading: false,
    assetTypeError: null,
    assetError: null,
    assetTypeHiddenValue: "",
    isAssetTypeHidden: false,
    assetTypeIds: [],
    assetIds: [],
    onAttachmentUploadingChange: jest.fn(),
    isFormInitializing: false,
  };

  const renderWithTheme = (props: typeof defaultProps) =>
    render(
      <ThemeProvider theme={DEFAULT_THEME}>
        <ItemRequestForm {...props} />
      </ThemeProvider>
    );

  it("renders the attachments field at the end when position_in_portal is null", () => {
    renderWithTheme({
      ...defaultProps,
      attachmentsOption: attachmentOption,
    });

    const fieldsContainer = screen.getByTestId("attachments-field")
      .parentElement as HTMLElement;

    expect(screen.getByTestId("attachments-field")).toBeInTheDocument();
    expect(fieldsContainer.lastChild).toBe(
      screen.getByTestId("attachments-field")
    );
  });

  it("renders the attachments field at its position when position_in_portal is set", () => {
    renderWithTheme({
      ...defaultProps,
      attachmentsOption: { ...attachmentOption, position_in_portal: 0 },
    });

    const fieldsContainer = screen.getByTestId("attachments-field")
      .parentElement as HTMLElement;

    expect(screen.getByTestId("attachments-field")).toBeInTheDocument();
    expect(fieldsContainer.firstChild).toBe(
      screen.getByTestId("attachments-field")
    );
  });

  it("does not render the attachments field without an attachment option", () => {
    renderWithTheme(defaultProps);

    expect(screen.queryByTestId("attachments-field")).not.toBeInTheDocument();
  });
});
