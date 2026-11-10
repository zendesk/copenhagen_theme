import { renderHook } from "@testing-library/react-hooks";
import { useServiceCatalogItem } from "./useServiceCatalogItem";

describe("useServiceCatalogItem", () => {
  const renderItemResponse = (item: Record<string, unknown>) => ({
    json: () => Promise.resolve({ service_catalog_item: item }),
    status: 200,
    ok: true,
  });

  const fetchMockWith = (response: unknown) => {
    (globalThis.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve(response as never)
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("parses embedded option details from the enhanced item response", async () => {
    fetchMockWith(
      renderItemResponse({
        id: "01M3KF50FGJ1WK4G7S9TDAW0G9",
        name: "all PLOBs",
        description: null,
        thumbnail_url: null,
        form_id: "9848565352189",
        categories: [{ id: "cat-1", name: "Category", path: [] }],
        is_request_on_behalf: true,
        published_at: "2026-10-23T10:31:44.204Z",
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
          is_required: "0",
          is_hidden: null,
        },
        attachment_option: {
          id: "attachment-option-1",
          name: "Attachment",
          description: "Upload a file",
          is_required: "1",
          position_in_portal: "2",
        },
      })
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useServiceCatalogItem("item-1")
    );

    expect(result.current.serviceCatalogItem).toBeUndefined();

    await waitForNextUpdate();

    const item = result.current.serviceCatalogItem!;
    expect(item.id).toBe("01M3KF50FGJ1WK4G7S9TDAW0G9");
    expect(item.form_id).toBe("9848565352189");
    expect(item.description).toBeNull();
    expect(item.thumbnail_url).toBeNull();
    expect(item.categories).toEqual([
      { id: "cat-1", name: "Category", path: [] },
    ]);

    // Null id lists become empty arrays.
    expect(item.asset_option).toEqual({
      id: "asset-option-1",
      name: "Asset",
      description: "Choose an asset",
      asset_filter_ids: [],
      is_required: true,
    });

    // "0" string booleans and null booleans must not become true; null
    // descriptions fall back to an empty string.
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

  it("coerces raw is_hidden values so hidden options are detected", async () => {
    fetchMockWith(
      renderItemResponse({
        id: 1,
        name: "Test Item",
        description: "Test Description",
        form_id: 1,
        thumbnail_url: "",
        categories: [],
        asset_type_option: {
          id: "asset-type-option-1",
          name: "Asset type",
          description: null,
          asset_type_ids: "type-1,type-2",
          is_required: false,
          is_hidden: "1",
        },
      })
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useServiceCatalogItem("item-1")
    );

    await waitForNextUpdate();

    expect(result.current.serviceCatalogItem?.asset_type_option).toMatchObject({
      asset_type_ids: ["type-1", "type-2"],
      is_hidden: true,
    });
  });

  it("leaves options undefined when the response carries no option objects", async () => {
    fetchMockWith(
      renderItemResponse({
        id: 1,
        name: "Test Item",
        description: "Test Description",
        form_id: 1,
        thumbnail_url: "",
        categories: [],
        published_at: "2025-01-01T00:00:00Z",
      })
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useServiceCatalogItem("item-1")
    );

    await waitForNextUpdate();

    const item = result.current.serviceCatalogItem!;
    expect(item.asset_option).toBeUndefined();
    expect(item.asset_type_option).toBeUndefined();
    expect(item.attachment_option).toBeUndefined();
  });

  it("normalizes a missing position_in_portal to null", async () => {
    fetchMockWith(
      renderItemResponse({
        id: 1,
        name: "Test Item",
        description: "Test Description",
        form_id: 1,
        thumbnail_url: "",
        categories: [],
        attachment_option: {
          id: "attachment-option-1",
          name: "Attachment",
          description: null,
          is_required: false,
        },
      })
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useServiceCatalogItem("item-1")
    );

    await waitForNextUpdate();

    expect(result.current.serviceCatalogItem?.attachment_option).toMatchObject({
      description: "",
      position_in_portal: null,
    });
  });

  it("exposes an error when the fetch fails", async () => {
    (globalThis.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({ status: 500, ok: false })
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useServiceCatalogItem("item-1")
    );

    await waitForNextUpdate();

    expect(result.current.errorFetchingItem).toEqual(
      new Error("Error fetching service catalog item")
    );
    expect(result.current.serviceCatalogItem).toBeUndefined();
  });
});
