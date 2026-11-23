import { renderHook } from "@testing-library/react-hooks";
import { useServiceCatalogItem } from "./useServiceCatalogItem";

describe("useServiceCatalogItem", () => {
  const itemResponse = (item: Record<string, unknown>) => ({
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

  it("stores the parsed item from the response", async () => {
    fetchMockWith(
      itemResponse({
        id: "01M3KF50FGJ1WK4G7S9TDAW0G9",
        name: "all PLOBs",
        description: null,
        thumbnail_url: null,
        form_id: "9848565352189",
        categories: [{ id: "cat-1", name: "Category", path: [] }],
        is_request_on_behalf: true,
        published_at: "2026-10-23T10:31:44.204Z",
      })
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useServiceCatalogItem("item-1")
    );

    expect(result.current.serviceCatalogItem).toBeUndefined();

    await waitForNextUpdate();

    expect(result.current.serviceCatalogItem).toEqual({
      id: "01M3KF50FGJ1WK4G7S9TDAW0G9",
      name: "all PLOBs",
      description: null,
      form_id: "9848565352189",
      thumbnail_url: null,
      categories: [{ id: "cat-1", name: "Category", path: [] }],
      is_request_on_behalf: true,
      description_field_enabled: false,
      published_at: "2026-10-23T10:31:44.204Z",
      asset_option: undefined,
      asset_type_option: undefined,
      attachment_option: undefined,
    });
    expect(result.current.errorFetchingItem).toBeNull();
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
