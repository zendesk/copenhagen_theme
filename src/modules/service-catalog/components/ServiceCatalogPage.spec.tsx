import { render } from "../../test/render";
import { waitFor } from "@testing-library/react";
import { ServiceCatalogPage } from "./ServiceCatalogPage";
import type { Category } from "../data-types/Categories";
import {
  ALL_SERVICES_ID,
  UNCATEGORIZED_ID,
} from "./service-catalog-categories-sidebar/constants";

const HELP_CENTER_PATH = "/hc/en-us";

const emptyResponse = {
  service_catalog_items: [],
  meta: { before_cursor: null, after_cursor: null, has_more: false },
  count: 0,
};

function mockFetch() {
  const fetchMock = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(emptyResponse),
      status: 200,
      ok: true,
    })
  ) as jest.Mock;
  global.fetch = fetchMock;
  return fetchMock;
}

function setUrl(search: string) {
  window.history.replaceState(
    {},
    "",
    `${window.location.pathname}${search ? `?${search}` : ""}`
  );
}

const categoryTree: Category[] = [
  {
    id: ALL_SERVICES_ID,
    name: "All services",
    items_count: 10,
    updated_at: "2024-01-01",
  },
  {
    id: "cat-1",
    name: "Hardware",
    items_count: 5,
    updated_at: "2024-01-01",
    children: [
      {
        id: "cat-1-1",
        name: "Laptops",
        items_count: 3,
        updated_at: "2024-01-01",
      },
      {
        id: UNCATEGORIZED_ID,
        name: "Uncategorized",
        items_count: 2,
        updated_at: "2024-01-01",
      },
    ],
  },
  {
    id: UNCATEGORIZED_ID,
    name: "Uncategorized",
    items_count: 4,
    updated_at: "2024-01-01",
  },
];

describe("ServiceCatalogPage uncategorized filtering", () => {
  beforeEach(() => {
    setUrl("");
    jest.clearAllMocks();
  });

  afterEach(() => {
    setUrl("");
  });

  describe("sidebar filtering", () => {
    it("does not render the uncategorized category in the sidebar at the top level", async () => {
      mockFetch();

      render(
        <ServiceCatalogPage
          helpCenterPath={HELP_CENTER_PATH}
          categoryTree={categoryTree}
        />
      );

      await waitFor(() => {
        expect(
          document.querySelector(
            `[data-test-id="sidebar-category-${UNCATEGORIZED_ID}"]`
          )
        ).toBeNull();
      });
    });

    it("does not render the uncategorized category in nested children", async () => {
      mockFetch();

      render(
        <ServiceCatalogPage
          helpCenterPath={HELP_CENTER_PATH}
          categoryTree={categoryTree}
        />
      );

      // Expand the parent category to reveal children
      await waitFor(() => {
        expect(
          document.querySelector(
            `[data-test-id="sidebar-category-${UNCATEGORIZED_ID}"]`
          )
        ).toBeNull();
      });
    });

    it("still renders valid categories", async () => {
      mockFetch();

      render(
        <ServiceCatalogPage
          helpCenterPath={HELP_CENTER_PATH}
          categoryTree={categoryTree}
        />
      );

      await waitFor(() => {
        expect(
          document.querySelector('[data-test-id="sidebar-category-cat-1"]')
        ).toBeInTheDocument();
      });
    });
  });

  describe("URL param rejection", () => {
    it("does not use uncategorized-virtual-id from URL as selectedCategoryId", async () => {
      setUrl(`category_id=${UNCATEGORIZED_ID}`);
      const fetchMock = mockFetch();

      render(
        <ServiceCatalogPage
          helpCenterPath={HELP_CENTER_PATH}
          categoryTree={categoryTree}
        />
      );

      await waitFor(() => expect(fetchMock).toHaveBeenCalled());

      // No API call should contain uncategorized-virtual-id as category_id
      const allUrls = fetchMock.mock.calls.map((call) => call[0] as string);
      for (const url of allUrls) {
        const params = new URLSearchParams(url.split("?")[1] ?? "");
        expect(params.get("category_id")).not.toBe(UNCATEGORIZED_ID);
      }
    });

    it("rejects uncategorized-virtual-id from popstate navigation", async () => {
      setUrl("category_id=cat-1");
      const fetchMock = mockFetch();

      render(
        <ServiceCatalogPage
          helpCenterPath={HELP_CENTER_PATH}
          categoryTree={categoryTree}
        />
      );

      await waitFor(() => expect(fetchMock).toHaveBeenCalled());

      // Simulate navigation to uncategorized URL
      setUrl(`category_id=${UNCATEGORIZED_ID}`);
      window.dispatchEvent(new PopStateEvent("popstate"));

      // Wait for any potential refetch to settle
      await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));

      // No API call should contain uncategorized-virtual-id as category_id
      const allUrls = fetchMock.mock.calls.map((call) => call[0] as string);
      for (const url of allUrls) {
        const params = new URLSearchParams(url.split("?")[1] ?? "");
        expect(params.get("category_id")).not.toBe(UNCATEGORIZED_ID);
      }
    });
  });
});
