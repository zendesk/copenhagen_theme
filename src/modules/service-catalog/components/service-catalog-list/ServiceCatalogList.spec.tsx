import { act } from "react-dom/test-utils";
import { render } from "../../../test/render";
import { screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { ServiceCatalogList } from "./ServiceCatalogList";

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

function getSortParamsFromCall(fetchMock: jest.Mock, callIndex: number) {
  const url = fetchMock.mock.calls[callIndex]?.[0] as string | undefined;
  const params = new URLSearchParams(url?.split("?")[1] ?? "");
  return {
    sort_by: params.get("sort_by"),
    sort_order: params.get("sort_order"),
  };
}

describe("ServiceCatalogList sorting", () => {
  beforeEach(() => {
    setUrl("");
    jest.clearAllMocks();
  });

  afterEach(() => {
    setUrl("");
  });

  describe("initial sort from URL", () => {
    it("uses the default name_asc sort when no sort param is in the URL", async () => {
      const fetchMock = mockFetch();

      render(
        <ServiceCatalogList
          helpCenterPath={HELP_CENTER_PATH}
          selectedCategoryId={null}
          selectedCategoryName={null}
        />
      );

      await waitFor(() => expect(fetchMock).toHaveBeenCalled());

      expect(getSortParamsFromCall(fetchMock, 0)).toEqual({
        sort_by: "name",
        sort_order: "asc",
      });
    });

    it("uses the sort option from the URL when present and valid", async () => {
      setUrl("sort=name_desc");
      const fetchMock = mockFetch();

      render(
        <ServiceCatalogList
          helpCenterPath={HELP_CENTER_PATH}
          selectedCategoryId={null}
          selectedCategoryName={null}
        />
      );

      await waitFor(() => expect(fetchMock).toHaveBeenCalled());

      expect(getSortParamsFromCall(fetchMock, 0)).toEqual({
        sort_by: "name",
        sort_order: "desc",
      });
    });

    it("falls back to the default sort when the URL sort param is invalid", async () => {
      setUrl("sort=invalid_value");
      const fetchMock = mockFetch();

      render(
        <ServiceCatalogList
          helpCenterPath={HELP_CENTER_PATH}
          selectedCategoryId={null}
          selectedCategoryName={null}
        />
      );

      await waitFor(() => expect(fetchMock).toHaveBeenCalled());

      expect(getSortParamsFromCall(fetchMock, 0)).toEqual({
        sort_by: "name",
        sort_order: "asc",
      });
    });

    it("displays the sort label that matches the URL state", async () => {
      setUrl("sort=created_at_desc");
      mockFetch();

      render(
        <ServiceCatalogList
          helpCenterPath={HELP_CENTER_PATH}
          selectedCategoryId={null}
          selectedCategoryName={null}
        />
      );

      expect(
        await screen.findByRole("button", { name: /Newest/ })
      ).toBeInTheDocument();
    });
  });

  describe("changing sort updates URL", () => {
    it("writes the new sort to the URL when a non-default option is chosen", async () => {
      const fetchMock = mockFetch();

      render(
        <ServiceCatalogList
          helpCenterPath={HELP_CENTER_PATH}
          selectedCategoryId={null}
          selectedCategoryName={null}
        />
      );

      await waitFor(() => expect(fetchMock).toHaveBeenCalled());

      const user = userEvent.setup();
      await user.click(screen.getByRole("button", { name: /A-Z/ }));
      await user.click(screen.getByRole("menuitemradio", { name: "Z-A" }));

      await waitFor(() => {
        const params = new URLSearchParams(window.location.search);
        expect(params.get("sort")).toBe("name_desc");
      });
    });

    it("removes the sort param from the URL when switching back to the default", async () => {
      setUrl("sort=name_desc");
      const fetchMock = mockFetch();

      render(
        <ServiceCatalogList
          helpCenterPath={HELP_CENTER_PATH}
          selectedCategoryId={null}
          selectedCategoryName={null}
        />
      );

      await waitFor(() => expect(fetchMock).toHaveBeenCalled());

      const user = userEvent.setup();
      await user.click(screen.getByRole("button", { name: /Z-A/ }));
      await user.click(screen.getByRole("menuitemradio", { name: "A-Z" }));

      await waitFor(() => {
        const params = new URLSearchParams(window.location.search);
        expect(params.get("sort")).toBeNull();
      });
    });

    it("preserves other query params when updating the sort param", async () => {
      setUrl("category_id=cat-1");
      const fetchMock = mockFetch();

      render(
        <ServiceCatalogList
          helpCenterPath={HELP_CENTER_PATH}
          selectedCategoryId={null}
          selectedCategoryName={null}
        />
      );

      await waitFor(() => expect(fetchMock).toHaveBeenCalled());

      const user = userEvent.setup();
      await user.click(screen.getByRole("button", { name: /A-Z/ }));
      await user.click(screen.getByRole("menuitemradio", { name: "Newest" }));

      await waitFor(() => {
        const params = new URLSearchParams(window.location.search);
        expect(params.get("category_id")).toBe("cat-1");
        expect(params.get("sort")).toBe("created_at_desc");
      });
    });

    it("re-fetches services with the new sort params after the selection changes", async () => {
      const fetchMock = mockFetch();

      render(
        <ServiceCatalogList
          helpCenterPath={HELP_CENTER_PATH}
          selectedCategoryId={null}
          selectedCategoryName={null}
        />
      );

      await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

      const user = userEvent.setup();
      await user.click(screen.getByRole("button", { name: /A-Z/ }));
      await user.click(screen.getByRole("menuitemradio", { name: "Newest" }));

      await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));

      expect(getSortParamsFromCall(fetchMock, 1)).toEqual({
        sort_by: "created_at",
        sort_order: "desc",
      });
    });
  });

  describe("popstate synchronization", () => {
    it("updates the displayed sort option when the URL changes via browser navigation", async () => {
      const fetchMock = mockFetch();

      render(
        <ServiceCatalogList
          helpCenterPath={HELP_CENTER_PATH}
          selectedCategoryId={null}
          selectedCategoryName={null}
        />
      );

      await waitFor(() => expect(fetchMock).toHaveBeenCalled());

      act(() => {
        setUrl("sort=name_desc");
        window.dispatchEvent(new PopStateEvent("popstate"));
      });

      expect(
        await screen.findByRole("button", { name: /Z-A/ })
      ).toBeInTheDocument();
    });

    it("triggers a fetch with the new sort when popstate changes the URL", async () => {
      const fetchMock = mockFetch();

      render(
        <ServiceCatalogList
          helpCenterPath={HELP_CENTER_PATH}
          selectedCategoryId={null}
          selectedCategoryName={null}
        />
      );

      await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

      act(() => {
        setUrl("sort=created_at_desc");
        window.dispatchEvent(new PopStateEvent("popstate"));
      });

      await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));

      expect(getSortParamsFromCall(fetchMock, 1)).toEqual({
        sort_by: "created_at",
        sort_order: "desc",
      });
    });
  });
});
