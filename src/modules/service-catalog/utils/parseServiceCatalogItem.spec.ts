import {
  parseServiceCatalogItem,
  type RawServiceCatalogItem,
} from "./parseServiceCatalogItem";

describe("parseServiceCatalogItem", () => {
  it("maps the item response fields explicitly", () => {
    const item = parseServiceCatalogItem({
      id: "01M3KF50FGJ1WK4G7S9TDAW0G9",
      name: "all PLOBs",
      description: null,
      thumbnail_url: null,
      form_id: "9848565352189",
      categories: [{ id: "cat-1", name: "Category", path: [] }],
      is_request_on_behalf: true,
      published_at: "2026-10-23T10:31:44.204Z",
      custom_object_fields: { "standard::asset_option": "asset-option-1" },
      description_field_enabled: true,
      brand_id: "123",
      created_at: "2026-01-01T00:00:00Z",
      updated_at: "2026-01-02T00:00:00Z",
    });

    expect(item).toEqual({
      id: "01M3KF50FGJ1WK4G7S9TDAW0G9",
      name: "all PLOBs",
      description: null,
      form_id: "9848565352189",
      thumbnail_url: null,
      categories: [{ id: "cat-1", name: "Category", path: [] }],
      is_request_on_behalf: true,
      description_field_enabled: true,
      published_at: "2026-10-23T10:31:44.204Z",
      asset_option: undefined,
      asset_type_option: undefined,
      attachment_option: undefined,
    });
  });

  it("parses embedded option details", () => {
    const item = parseServiceCatalogItem({
      id: "01M3KF50FGJ1WK4G7S9TDAW0G9",
      name: "all PLOBs",
      asset_option: {
        id: "asset-option-1",
        name: "Asset",
        description: "Choose an asset",
        asset_filter_ids: null,
        is_required: true,
      },
      asset_type_option: {
        id: "asset-type-option-1",
        name: "Asset type",
        description: null,
        asset_type_ids: ["type-1"],
        is_required: false,
        is_hidden: null,
      },
      attachment_option: {
        id: "attachment-option-1",
        name: "Attachment",
        description: "Upload a file",
        is_required: true,
        position_in_portal: 2,
      },
    } as RawServiceCatalogItem);

    expect(item.asset_option).toEqual({
      id: "asset-option-1",
      name: "Asset",
      description: "Choose an asset",
      asset_filter_ids: [],
      is_required: true,
    });

    expect(item.asset_type_option).toEqual({
      id: "asset-type-option-1",
      name: "Asset type",
      description: "",
      asset_type_ids: ["type-1"],
      is_required: false,
      is_hidden: false,
    });

    expect(item.attachment_option).toEqual({
      id: "attachment-option-1",
      name: "Attachment",
      description: "Upload a file",
      is_required: true,
      position_in_portal: 2,
    });
  });

  it("coerces raw is_hidden values so hidden options are detected", () => {
    const item = parseServiceCatalogItem({
      id: "01M3KF50FGJ1WK4G7S9TDAW0G9",
      name: "Test Item",
      asset_type_option: {
        id: "asset-type-option-1",
        name: "Asset type",
        description: null,
        asset_type_ids: ["type-1", "type-2"],
        is_required: false,
        is_hidden: "1",
      },
    });

    expect(item.asset_type_option).toMatchObject({
      asset_type_ids: ["type-1", "type-2"],
      is_hidden: true,
    });
  });

  it("normalizes a missing position_in_portal to null", () => {
    const item = parseServiceCatalogItem({
      id: "01M3KF50FGJ1WK4G7S9TDAW0G9",
      name: "Test Item",
      attachment_option: {
        id: "attachment-option-1",
        name: "Attachment",
        description: null,
        is_required: false,
      },
    });

    expect(item.attachment_option).toMatchObject({
      description: "",
      position_in_portal: null,
    });
  });
});
