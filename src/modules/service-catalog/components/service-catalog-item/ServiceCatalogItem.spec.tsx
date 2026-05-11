import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { DEFAULT_THEME } from "@zendeskgarden/react-theming";
import { ServiceCatalogItem } from "./ServiceCatalogItem";
import { submitServiceItemRequest } from "./submitServiceItemRequest";
import * as notifications from "../../../shared/notifications";
import type { ServiceCatalogItem as ServiceCatalogItemType } from "../../data-types/ServiceCatalogItem";
import type { TicketFieldObject } from "../../../ticket-fields/data-types/TicketFieldObject";
import { PREVIEW_MODE_HTML_CLASS } from "../../constants";

// Mock react-i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue: string) => defaultValue,
  }),
}));

// Mock the hooks
jest.mock("../../hooks/useServiceCatalogItem", () => ({
  useServiceCatalogItem: jest.fn(),
}));

jest.mock("../../hooks/useItemFormFields", () => ({
  useItemFormFields: jest.fn(),
}));

// Mock submitServiceItemRequest
jest.mock("./submitServiceItemRequest", () => ({
  submitServiceItemRequest: jest.fn(),
}));

// Mock notifications
jest.mock("../../../shared/notifications", () => ({
  notify: jest.fn(),
  addFlashNotification: jest.fn(),
}));

// Mock useAttachmentsOption
jest.mock("../../hooks/useAttachmentsOption", () => ({
  useAttachmentsOption: jest.fn(),
}));

// Mock ItemRequestForm to simplify testing
jest.mock("./ItemRequestForm", () => ({
  ItemRequestForm: ({
    onSubmit,
    isPreviewMode,
  }: {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isPreviewMode?: boolean;
  }) => (
    <form
      data-testid="item-request-form"
      data-preview-mode={isPreviewMode ? "true" : "false"}
      onSubmit={onSubmit}
    >
      <button type="submit" disabled={isPreviewMode}>
        Submit
      </button>
    </form>
  ),
  ASSET_TYPE_KEY: "zen:custom_object:standard::itam_asset_type",
  ASSET_KEY: "zen:custom_object:standard::itam_asset",
}));

// Mock PreviewModeBanner so we can assert it renders without testing portal
// behaviour here (it has its own dedicated specs).
jest.mock("./PreviewModeBanner", () => ({
  PreviewModeBanner: () => <div data-testid="preview-mode-banner-mock" />,
}));

import { useServiceCatalogItem } from "../../hooks/useServiceCatalogItem";
import { useItemFormFields } from "../../hooks/useItemFormFields";
import { useAttachmentsOption } from "../../hooks/useAttachmentsOption";

const mockUseServiceCatalogItem = useServiceCatalogItem as jest.MockedFunction<
  typeof useServiceCatalogItem
>;
const mockUseItemFormFields = useItemFormFields as jest.MockedFunction<
  typeof useItemFormFields
>;
const mockSubmitServiceItemRequest =
  submitServiceItemRequest as jest.MockedFunction<
    typeof submitServiceItemRequest
  >;
const mockNotify = notifications.notify as jest.MockedFunction<
  typeof notifications.notify
>;

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={DEFAULT_THEME}>{component}</ThemeProvider>
  );
};

describe("ServiceCatalogItem", () => {
  const defaultProps = {
    serviceCatalogItemId: 1,
    baseLocale: "en-us",
    hasAtMentions: false,
    userRole: "end_user",
    userId: 123,
    brandId: 456,
    userName: "Test User",
    organizations: [],
    helpCenterPath: "/hc/en-us",
  };

  const mockServiceCatalogItem: ServiceCatalogItemType = {
    id: 1,
    name: "Test Service",
    description: "Test Description",
    form_id: 100,
    thumbnail_url: "",
    categories: [],
    allow_request_on_behalf: false,
    published_at: "2025-01-01T00:00:00Z",
    custom_object_fields: {
      "standard::asset_option": "",
      "standard::asset_type_option": "",
      "standard::attachment_option": "",
    },
  };

  const mockDraftServiceCatalogItem: ServiceCatalogItemType = {
    ...mockServiceCatalogItem,
    published_at: null,
  };

  const mockRequestFields: TicketFieldObject[] = [
    {
      id: 1,
      name: "custom_fields_1",
      type: "text",
      description: "Field 1",
      label: "Field 1",
      required: true,
      options: [],
      value: null,
      error: null,
    },
  ];

  const mockAssociatedLookupField: TicketFieldObject = {
    id: 2,
    name: "custom_fields_2",
    type: "lookup",
    description: "Lookup",
    label: "Lookup",
    required: true,
    options: [],
    value: null,
    error: null,
    relationship_target_type: "standard::service_catalog_item",
  };

  const mockUseAttachmentsOption = useAttachmentsOption as jest.MockedFunction<
    typeof useAttachmentsOption
  >;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseAttachmentsOption.mockReturnValue({
      attachmentsOption: undefined,
      errorAttachmentsOption: null,
      isLoadingAttachmentsOption: false,
    });

    mockUseServiceCatalogItem.mockReturnValue({
      serviceCatalogItem: mockServiceCatalogItem,
      errorFetchingItem: null,
    });

    mockUseItemFormFields.mockReturnValue({
      requestFields: mockRequestFields,
      associatedLookupField: mockAssociatedLookupField,
      categoryLookupField: null,
      error: null,
      setRequestFields: jest.fn(),
      handleChange: jest.fn(),
      isRequestFieldsLoading: false,
      assetTypeHiddenValue: "",
      isAssetTypeHidden: false,
      assetTypeIds: [],
      assetIds: [],
    });
  });

  describe("preview mode", () => {
    const baseHref = "http://localhost/hc/en-us/services/123";
    const PREVIEW_CLASS = PREVIEW_MODE_HTML_CLASS;

    const mockLocation = (search: string) => {
      window.history.replaceState(null, "", `${baseHref}${search}`);
    };

    beforeEach(() => {
      window.history.replaceState(null, "", baseHref);
      document.documentElement.classList.remove(PREVIEW_CLASS);
    });

    afterEach(() => {
      window.history.replaceState(null, "", baseHref);
      document.documentElement.classList.remove(PREVIEW_CLASS);
    });

    it("does not render the preview banner for published items without the preview query param", () => {
      mockLocation("");
      mockUseServiceCatalogItem.mockReturnValue({
        serviceCatalogItem: mockServiceCatalogItem,
        errorFetchingItem: null,
      });

      renderWithTheme(<ServiceCatalogItem {...defaultProps} />);

      expect(
        screen.queryByTestId("preview-mode-banner-mock")
      ).not.toBeInTheDocument();
      expect(screen.getByTestId("item-request-form")).toHaveAttribute(
        "data-preview-mode",
        "false"
      );
      expect(document.documentElement).not.toHaveClass(PREVIEW_CLASS);
    });

    it("does not render the preview banner for published items even when ?preview=true is in the URL", () => {
      mockLocation("?preview=true");
      mockUseServiceCatalogItem.mockReturnValue({
        serviceCatalogItem: mockServiceCatalogItem,
        errorFetchingItem: null,
      });

      renderWithTheme(<ServiceCatalogItem {...defaultProps} />);

      expect(
        screen.queryByTestId("preview-mode-banner-mock")
      ).not.toBeInTheDocument();
      expect(screen.getByTestId("item-request-form")).toHaveAttribute(
        "data-preview-mode",
        "false"
      );
      expect(document.documentElement).not.toHaveClass(PREVIEW_CLASS);
    });

    it("removes ?preview=true from the URL once a published item is loaded", () => {
      mockLocation("?preview=true&category_id=42");
      mockUseServiceCatalogItem.mockReturnValue({
        serviceCatalogItem: mockServiceCatalogItem,
        errorFetchingItem: null,
      });

      renderWithTheme(<ServiceCatalogItem {...defaultProps} />);

      expect(window.location.search).not.toContain("preview=true");
      // Other params are preserved
      expect(window.location.search).toContain("category_id=42");
    });

    it("activates preview mode for draft items even without the preview query param", () => {
      mockLocation("");
      mockUseServiceCatalogItem.mockReturnValue({
        serviceCatalogItem: mockDraftServiceCatalogItem,
        errorFetchingItem: null,
      });

      renderWithTheme(<ServiceCatalogItem {...defaultProps} />);

      expect(
        screen.getByTestId("preview-mode-banner-mock")
      ).toBeInTheDocument();
      expect(screen.getByTestId("item-request-form")).toHaveAttribute(
        "data-preview-mode",
        "true"
      );
      expect(screen.getByRole("button", { name: "Submit" })).toBeDisabled();
      expect(document.documentElement).toHaveClass(PREVIEW_CLASS);
    });

    it("adds ?preview=true to the URL once a draft item is loaded so a refresh enters preview cleanly", () => {
      mockLocation("?category_id=42");
      mockUseServiceCatalogItem.mockReturnValue({
        serviceCatalogItem: mockDraftServiceCatalogItem,
        errorFetchingItem: null,
      });

      renderWithTheme(<ServiceCatalogItem {...defaultProps} />);

      expect(window.location.search).toContain("preview=true");
      // Other params are preserved
      expect(window.location.search).toContain("category_id=42");
    });

    it("does not modify the URL when the param already matches the item state", () => {
      mockLocation("?preview=true");
      mockUseServiceCatalogItem.mockReturnValue({
        serviceCatalogItem: mockDraftServiceCatalogItem,
        errorFetchingItem: null,
      });

      const replaceStateSpy = jest.spyOn(window.history, "replaceState");
      renderWithTheme(<ServiceCatalogItem {...defaultProps} />);

      expect(replaceStateSpy).not.toHaveBeenCalled();
      replaceStateSpy.mockRestore();
    });

    it("renders the preview banner and disables submit for draft items with the preview query param", () => {
      mockLocation("?preview=true");
      mockUseServiceCatalogItem.mockReturnValue({
        serviceCatalogItem: mockDraftServiceCatalogItem,
        errorFetchingItem: null,
      });

      renderWithTheme(<ServiceCatalogItem {...defaultProps} />);

      expect(
        screen.getByTestId("preview-mode-banner-mock")
      ).toBeInTheDocument();
      expect(screen.getByTestId("item-request-form")).toHaveAttribute(
        "data-preview-mode",
        "true"
      );
      expect(screen.getByRole("button", { name: "Submit" })).toBeDisabled();
      expect(document.documentElement).toHaveClass(PREVIEW_CLASS);
    });

    it("removes the preview class from the root element on unmount", () => {
      mockLocation("?preview=true");
      mockUseServiceCatalogItem.mockReturnValue({
        serviceCatalogItem: mockDraftServiceCatalogItem,
        errorFetchingItem: null,
      });

      const { unmount } = renderWithTheme(
        <ServiceCatalogItem {...defaultProps} />
      );
      expect(document.documentElement).toHaveClass(PREVIEW_CLASS);

      unmount();
      expect(document.documentElement).not.toHaveClass(PREVIEW_CLASS);
    });

    it("does not submit the form when in preview mode", async () => {
      mockLocation("?preview=true");
      mockUseServiceCatalogItem.mockReturnValue({
        serviceCatalogItem: mockDraftServiceCatalogItem,
        errorFetchingItem: null,
      });

      renderWithTheme(<ServiceCatalogItem {...defaultProps} />);

      const form = screen.getByTestId("item-request-form");
      fireEvent.submit(form);

      await waitFor(() => {
        expect(mockSubmitServiceItemRequest).not.toHaveBeenCalled();
      });
    });
  });

  describe("error handling on form submission", () => {
    it("should show error notification when 422 response has missing fields not in the form", async () => {
      const errorResponse = {
        ok: false,
        status: 422,
        json: () =>
          Promise.resolve({
            error: "RecordInvalid",
            description: "Record validation errors",
            details: {
              base: [
                {
                  description: "Field is required",
                  error: "BlankValue",
                  field_key: 999, // Field not in the form
                },
              ],
            },
          }),
      };

      mockSubmitServiceItemRequest.mockResolvedValue(
        errorResponse as unknown as Response
      );

      renderWithTheme(<ServiceCatalogItem {...defaultProps} />);

      const form = screen.getByTestId("item-request-form");
      fireEvent.submit(form);

      await waitFor(() => {
        expect(mockNotify).toHaveBeenCalledWith(
          expect.objectContaining({
            type: "error",
            title: "Service couldn't be submitted",
          })
        );
      });
    });

    it("should show error notification when 422 response has field errors for fields in the form", async () => {
      const errorResponse = {
        ok: false,
        status: 422,
        json: () =>
          Promise.resolve({
            error: "RecordInvalid",
            description: "Record validation errors",
            details: {
              base: [
                {
                  description: "Field is required",
                  error: "BlankValue",
                  field_key: 1, // Field IS in the form
                },
              ],
            },
          }),
      };

      mockSubmitServiceItemRequest.mockResolvedValue(
        errorResponse as unknown as Response
      );

      renderWithTheme(<ServiceCatalogItem {...defaultProps} />);

      const form = screen.getByTestId("item-request-form");
      fireEvent.submit(form);

      await waitFor(() => {
        expect(mockNotify).toHaveBeenCalledWith(
          expect.objectContaining({
            type: "error",
            title: "Service couldn't be submitted",
            message: "Give it a moment and try it again",
          })
        );
      });
    });

    it("should show error notification when 422 response JSON parsing fails", async () => {
      const errorResponse = {
        ok: false,
        status: 422,
        json: () => Promise.reject(new Error("Invalid JSON")),
      };

      mockSubmitServiceItemRequest.mockResolvedValue(
        errorResponse as unknown as Response
      );

      renderWithTheme(<ServiceCatalogItem {...defaultProps} />);

      const form = screen.getByTestId("item-request-form");
      fireEvent.submit(form);

      await waitFor(() => {
        expect(mockNotify).toHaveBeenCalledWith(
          expect.objectContaining({
            type: "error",
            title: "Service couldn't be submitted",
            message: "Give it a moment and try it again",
          })
        );
      });
    });

    it("should handle 422 response with unexpected structure gracefully", async () => {
      const errorResponse = {
        ok: false,
        status: 422,
        json: () =>
          Promise.resolve({
            error: "SomeError",
            // Missing details.base - should use fallback to empty array
          }),
      };

      mockSubmitServiceItemRequest.mockResolvedValue(
        errorResponse as unknown as Response
      );

      renderWithTheme(<ServiceCatalogItem {...defaultProps} />);

      const form = screen.getByTestId("item-request-form");
      fireEvent.submit(form);

      // Should not throw and should handle gracefully (no notification when no errors in base array)
      await waitFor(() => {
        expect(mockNotify).not.toHaveBeenCalled();
      });
    });

    it("should show error notification for non-422 error responses", async () => {
      const errorResponse = {
        ok: false,
        status: 500,
      };

      mockSubmitServiceItemRequest.mockResolvedValue(
        errorResponse as unknown as Response
      );

      renderWithTheme(<ServiceCatalogItem {...defaultProps} />);

      const form = screen.getByTestId("item-request-form");
      fireEvent.submit(form);

      await waitFor(() => {
        expect(mockNotify).toHaveBeenCalledWith(
          expect.objectContaining({
            type: "error",
            title: "Service couldn't be submitted",
            message: "Give it a moment and try it again",
          })
        );
      });
    });

    it("should show error notification when response is undefined", async () => {
      mockSubmitServiceItemRequest.mockResolvedValue(undefined);

      renderWithTheme(<ServiceCatalogItem {...defaultProps} />);

      const form = screen.getByTestId("item-request-form");
      fireEvent.submit(form);

      await waitFor(() => {
        expect(mockNotify).toHaveBeenCalledWith(
          expect.objectContaining({
            type: "error",
            title: "Service couldn't be submitted",
            message: "Give it a moment and try it again",
          })
        );
      });
    });
  });
});
