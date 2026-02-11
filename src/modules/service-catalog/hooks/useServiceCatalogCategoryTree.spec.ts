import { renderHook } from "@testing-library/react-hooks";
import { useServiceCatalogCategoryTree } from "./useServiceCatalogCategoryTree";

describe("useServiceCatalogCategoryTree", () => {
  const mockCategoryTree = {
    service_catalog_categories: [
      {
        id: "1",
        name: "Hardware",
        items_count: 5,
        updated_at: "2026-01-15T10:00:00Z",
        children: [
          {
            id: "2",
            name: "Laptops",
            items_count: 3,
            updated_at: "2026-01-15T10:00:00Z",
            children: [],
          },
        ],
      },
      {
        id: "3",
        name: "Software",
        items_count: 8,
        updated_at: "2026-01-14T10:00:00Z",
        children: [],
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should start in a loading state", () => {
    global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;

    const { result } = renderHook(() => useServiceCatalogCategoryTree());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.categoryTree).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it("should fetch and return the category tree", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockCategoryTree),
        ok: true,
      })
    ) as jest.Mock;

    const { result, waitForNextUpdate } = renderHook(() =>
      useServiceCatalogCategoryTree()
    );

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/v2/help_center/service_catalog/categories/tree"
    );
    expect(result.current.categoryTree).toEqual(
      mockCategoryTree.service_catalog_categories
    );
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should handle HTTP error response", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: "Not Found" }),
        status: 404,
        ok: false,
      })
    ) as jest.Mock;

    const { result, waitForNextUpdate } = renderHook(() =>
      useServiceCatalogCategoryTree()
    );

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.categoryTree).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toEqual(
      new Error("Error fetching category tree: HTTP 404")
    );
  });

  it("should handle server error response", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: "Internal Server Error" }),
        status: 500,
        ok: false,
      })
    ) as jest.Mock;

    const { result, waitForNextUpdate } = renderHook(() =>
      useServiceCatalogCategoryTree()
    );

    await waitForNextUpdate();

    expect(result.current.categoryTree).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toEqual(
      new Error("Error fetching category tree: HTTP 500")
    );
  });

  it("should handle network error", async () => {
    const networkError = new TypeError("Failed to fetch");

    global.fetch = jest.fn(() => Promise.reject(networkError)) as jest.Mock;

    const { result, waitForNextUpdate } = renderHook(() =>
      useServiceCatalogCategoryTree()
    );

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.categoryTree).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(networkError);
  });

  it("should only fetch once on mount", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockCategoryTree),
        ok: true,
      })
    ) as jest.Mock;

    const { result, waitForNextUpdate, rerender } = renderHook(() =>
      useServiceCatalogCategoryTree()
    );

    await waitForNextUpdate();

    expect(global.fetch).toHaveBeenCalledTimes(1);

    rerender();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(result.current.categoryTree).toEqual(
      mockCategoryTree.service_catalog_categories
    );
  });

  it("should return empty array when response has empty categories", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ service_catalog_categories: [] }),
        ok: true,
      })
    ) as jest.Mock;

    const { result, waitForNextUpdate } = renderHook(() =>
      useServiceCatalogCategoryTree()
    );

    await waitForNextUpdate();

    expect(result.current.categoryTree).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
