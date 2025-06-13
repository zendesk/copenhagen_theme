import { renderHook, act } from "@testing-library/react-hooks";
import { useServiceCatalogItems } from "./useServiceCatalogItems";

describe("useServiceCatalogItems", () => {
  const mockResponse = {
    service_catalog_items: [
      { id: 1, name: "Item 1", description: "Description 1", form_id: 1 },
      { id: 2, name: "Item 2", description: "Description 2", form_id: 2 },
    ],
    meta: { before_cursor: null, after_cursor: null, has_more: false },
    count: 2,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch service catalog items without input", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
        status: 200,
        ok: true,
      })
    ) as jest.Mock;

    const { result, waitForNextUpdate } = renderHook(() =>
      useServiceCatalogItems()
    );

    act(() => {
      result.current.fetchServiceCatalogItems("", null);
    });

    expect(result.current.serviceCatalogItems).toEqual([]);
    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.serviceCatalogItems).toEqual(
      mockResponse.service_catalog_items
    );
    expect(result.current.isLoading).toBe(false);
    expect(result.current.meta).toEqual(mockResponse.meta);
    expect(result.current.count).toEqual(mockResponse.count);
  });

  it("should handle fetch error", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: "Error fetching" }),
        status: 500,
        ok: false,
      })
    ) as jest.Mock;

    const { result, waitForNextUpdate } = renderHook(() =>
      useServiceCatalogItems()
    );

    act(() => {
      result.current.fetchServiceCatalogItems("", null);
    });

    expect(result.current.serviceCatalogItems).toEqual([]);
    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.serviceCatalogItems).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.errorFetchingItems).toEqual(
      new Error("HTTP error! status: 500")
    );
  });

  it("should refetch items when fetchServiceCatalogItems is called", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
        status: 200,
        ok: true,
      })
    ) as jest.Mock;

    const { result, waitForNextUpdate } = renderHook(() =>
      useServiceCatalogItems()
    );

    act(() => {
      result.current.fetchServiceCatalogItems("", null);
    });

    expect(result.current.serviceCatalogItems).toEqual([]);
    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.serviceCatalogItems).toEqual(
      mockResponse.service_catalog_items
    );
    expect(result.current.isLoading).toBe(false);
    expect(result.current.meta).toEqual(mockResponse.meta);
    expect(result.current.count).toEqual(mockResponse.count);

    const newMockResponse = {
      service_catalog_items: [
        { id: 3, name: "Item 3", description: "Description 3", form_id: 3 },
      ],
      meta: { before_cursor: null, after_cursor: null, has_more: false },
      count: 3,
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(newMockResponse),
        status: 200,
        ok: true,
      })
    ) as jest.Mock;

    act(() => {
      result.current.fetchServiceCatalogItems("Item 3", null);
    });

    expect(result.current.serviceCatalogItems).toEqual(
      mockResponse.service_catalog_items
    );
    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.serviceCatalogItems).toEqual(
      newMockResponse.service_catalog_items
    );

    expect(result.current.isLoading).toBe(false);

    expect(result.current.meta).toEqual(newMockResponse.meta);
    expect(result.current.count).toEqual(newMockResponse.count);
  });
});
