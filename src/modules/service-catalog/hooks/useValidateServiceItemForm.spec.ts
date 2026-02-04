import { renderHook } from "@testing-library/react-hooks";
import { useValidateServiceItemForm } from "./useValidateServiceItemForm";
import type { TicketFieldObject } from "../../ticket-fields/data-types/TicketFieldObject";
import type { Attachment } from "../../ticket-fields/data-types/AttachmentsField";
import type { AttachmentsOption } from "../data-types/Attachments";
import { ASSET_TYPE_KEY, ASSET_KEY } from "../constants";

// Mock react-i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue: string) => defaultValue,
  }),
}));

describe("useValidateServiceItemForm", () => {
  const createTextField = (
    overrides: Partial<TicketFieldObject> = {}
  ): TicketFieldObject => ({
    id: 1,
    name: "custom_fields_1",
    label: "Test Field",
    type: "text",
    description: "Test description",
    value: null,
    error: null,
    required: false,
    options: [],
    ...overrides,
  });

  const createAssetTypeField = (
    overrides: Partial<TicketFieldObject> = {}
  ): TicketFieldObject =>
    createTextField({
      id: 2,
      name: "custom_fields_2",
      label: "Asset Type",
      relationship_target_type: ASSET_TYPE_KEY,
      required: true,
      ...overrides,
    });

  const createAssetField = (
    overrides: Partial<TicketFieldObject> = {}
  ): TicketFieldObject =>
    createTextField({
      id: 3,
      name: "custom_fields_3",
      label: "Asset",
      relationship_target_type: ASSET_KEY,
      required: true,
      ...overrides,
    });

  const createAttachmentsOption = (isRequired: boolean): AttachmentsOption => ({
    url: "https://example.com",
    id: "attachment-option-1",
    name: "Attachment Option",
    custom_object_key: "standard::service_catalog_attachment_option",
    custom_object_fields: {
      "standard::brand_id": 1,
      "standard::description": null,
      "standard::is_required": isRequired,
      "standard::position_in_portal": 1,
    },
    created_by_user_id: "user-1",
    updated_by_user_id: "user-1",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    external_id: null,
    photo: null,
  });

  const createAttachment = (id: string = "1"): Attachment => ({
    id,
    file_name: `file-${id}.pdf`,
    url: `https://example.com/attachments/${id}`,
  });

  describe("when no validation rules are triggered", () => {
    it("returns no errors when all fields are valid", () => {
      const { result } = renderHook(() =>
        useValidateServiceItemForm(undefined)
      );

      const validationResult = result.current.validate([], []);

      expect(validationResult.hasError).toBe(false);
      expect(validationResult.errors).toEqual({
        attachments: null,
        assetType: null,
        asset: null,
      });
    });

    it("returns no errors when optional fields are empty", () => {
      const { result } = renderHook(() =>
        useValidateServiceItemForm(undefined)
      );

      const fields = [
        createTextField({ required: false, value: null }),
        createAssetTypeField({ required: false, value: null }),
        createAssetField({ required: false, value: null }),
      ];

      const validationResult = result.current.validate(fields, []);

      expect(validationResult.hasError).toBe(false);
    });

    it("returns no errors when required fields have values", () => {
      const { result } = renderHook(() =>
        useValidateServiceItemForm(undefined)
      );

      const fields = [
        createAssetTypeField({ required: true, value: "asset-type-1" }),
        createAssetField({ required: true, value: "asset-1" }),
      ];

      const validationResult = result.current.validate(fields, []);

      expect(validationResult.hasError).toBe(false);
    });
  });

  describe("attachments validation", () => {
    it("returns error when attachments are required but empty", () => {
      const attachmentsOption = createAttachmentsOption(true);
      const { result } = renderHook(() =>
        useValidateServiceItemForm(attachmentsOption)
      );

      const validationResult = result.current.validate([], []);

      expect(validationResult.hasError).toBe(true);
      expect(validationResult.errors.attachments).toBe(
        "Upload a file to continue."
      );
    });

    it("returns no error when attachments are required and provided", () => {
      const attachmentsOption = createAttachmentsOption(true);
      const { result } = renderHook(() =>
        useValidateServiceItemForm(attachmentsOption)
      );

      const validationResult = result.current.validate(
        [],
        [createAttachment()]
      );

      expect(validationResult.hasError).toBe(false);
      expect(validationResult.errors.attachments).toBeNull();
    });

    it("returns no error when attachments are not required and empty", () => {
      const attachmentsOption = createAttachmentsOption(false);
      const { result } = renderHook(() =>
        useValidateServiceItemForm(attachmentsOption)
      );

      const validationResult = result.current.validate([], []);

      expect(validationResult.hasError).toBe(false);
      expect(validationResult.errors.attachments).toBeNull();
    });

    it("returns no error when attachmentsOption is undefined", () => {
      const { result } = renderHook(() =>
        useValidateServiceItemForm(undefined)
      );

      const validationResult = result.current.validate([], []);

      expect(validationResult.errors.attachments).toBeNull();
    });
  });

  describe("asset type field validation", () => {
    it("returns error when required asset type field is empty", () => {
      const { result } = renderHook(() =>
        useValidateServiceItemForm(undefined)
      );

      const fields = [createAssetTypeField({ required: true, value: null })];

      const validationResult = result.current.validate(fields, []);

      expect(validationResult.hasError).toBe(true);
      expect(validationResult.errors.assetType).toBe("Select an asset type");
    });

    it("returns error when required asset type field is empty string", () => {
      const { result } = renderHook(() =>
        useValidateServiceItemForm(undefined)
      );

      const fields = [createAssetTypeField({ required: true, value: "" })];

      const validationResult = result.current.validate(fields, []);

      expect(validationResult.hasError).toBe(true);
      expect(validationResult.errors.assetType).toBe("Select an asset type");
    });

    it("returns no error when required asset type field has value", () => {
      const { result } = renderHook(() =>
        useValidateServiceItemForm(undefined)
      );

      const fields = [
        createAssetTypeField({ required: true, value: "asset-type-1" }),
      ];

      const validationResult = result.current.validate(fields, []);

      expect(validationResult.hasError).toBe(false);
      expect(validationResult.errors.assetType).toBeNull();
    });
  });

  describe("asset field validation", () => {
    it("returns error when required asset field is empty", () => {
      const { result } = renderHook(() =>
        useValidateServiceItemForm(undefined)
      );

      const fields = [createAssetField({ required: true, value: null })];

      const validationResult = result.current.validate(fields, []);

      expect(validationResult.hasError).toBe(true);
      expect(validationResult.errors.asset).toBe("Select an asset");
    });

    it("returns error when required asset field is empty array", () => {
      const { result } = renderHook(() =>
        useValidateServiceItemForm(undefined)
      );

      const fields = [createAssetField({ required: true, value: [] })];

      const validationResult = result.current.validate(fields, []);

      expect(validationResult.hasError).toBe(true);
      expect(validationResult.errors.asset).toBe("Select an asset");
    });

    it("returns no error when required asset field has array value", () => {
      const { result } = renderHook(() =>
        useValidateServiceItemForm(undefined)
      );

      const fields = [createAssetField({ required: true, value: ["asset-1"] })];

      const validationResult = result.current.validate(fields, []);

      expect(validationResult.hasError).toBe(false);
      expect(validationResult.errors.asset).toBeNull();
    });

    it("returns no error when required asset field has string value", () => {
      const { result } = renderHook(() =>
        useValidateServiceItemForm(undefined)
      );

      const fields = [createAssetField({ required: true, value: "asset-1" })];

      const validationResult = result.current.validate(fields, []);

      expect(validationResult.hasError).toBe(false);
      expect(validationResult.errors.asset).toBeNull();
    });
  });

  describe("multiple validation errors", () => {
    it("returns all errors when multiple validations fail", () => {
      const attachmentsOption = createAttachmentsOption(true);
      const { result } = renderHook(() =>
        useValidateServiceItemForm(attachmentsOption)
      );

      const fields = [
        createAssetTypeField({ required: true, value: null }),
        createAssetField({ required: true, value: null }),
      ];

      const validationResult = result.current.validate(fields, []);

      expect(validationResult.hasError).toBe(true);
      expect(validationResult.errors).toEqual({
        attachments: "Upload a file to continue.",
        assetType: "Select an asset type",
        asset: "Select an asset",
      });
    });

    it("returns only relevant errors when some validations pass", () => {
      const attachmentsOption = createAttachmentsOption(true);
      const { result } = renderHook(() =>
        useValidateServiceItemForm(attachmentsOption)
      );

      const fields = [
        createAssetTypeField({ required: true, value: "asset-type-1" }),
        createAssetField({ required: true, value: null }),
      ];

      const validationResult = result.current.validate(fields, [
        createAttachment(),
      ]);

      expect(validationResult.hasError).toBe(true);
      expect(validationResult.errors).toEqual({
        attachments: null,
        assetType: null,
        asset: "Select an asset",
      });
    });
  });

  describe("edge cases", () => {
    it("handles undefined field value", () => {
      const { result } = renderHook(() =>
        useValidateServiceItemForm(undefined)
      );

      const fields = [
        createAssetTypeField({ required: true, value: undefined }),
      ];

      const validationResult = result.current.validate(fields, []);

      expect(validationResult.hasError).toBe(true);
      expect(validationResult.errors.assetType).toBe("Select an asset type");
    });

    it("handles boolean false value as valid", () => {
      const { result } = renderHook(() =>
        useValidateServiceItemForm(undefined)
      );

      const fields = [
        createTextField({
          required: true,
          value: false,
          relationship_target_type: ASSET_TYPE_KEY,
        }),
      ];

      // Boolean false is a valid value (not empty)
      const validationResult = result.current.validate(fields, []);

      expect(validationResult.hasError).toBe(false);
    });

    it("ignores non-asset fields in validation", () => {
      const { result } = renderHook(() =>
        useValidateServiceItemForm(undefined)
      );

      // A required text field without asset relationship should not trigger errors
      const fields = [
        createTextField({
          required: true,
          value: null,
          relationship_target_type: undefined,
        }),
      ];

      const validationResult = result.current.validate(fields, []);

      // No asset-related errors, even though field is required and empty
      expect(validationResult.hasError).toBe(false);
      expect(validationResult.errors.assetType).toBeNull();
      expect(validationResult.errors.asset).toBeNull();
    });
  });
});
