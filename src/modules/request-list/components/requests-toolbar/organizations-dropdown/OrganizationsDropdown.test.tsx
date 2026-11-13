import { useState } from "react";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { render } from "../../../../test/render";
import OrganizationsDropdown from "./OrganizationsDropdown";
import { organizations } from "../../../apiMocks";
import type { AccessibleOrganization } from "../../../data-types";

type MockOrganization = Partial<AccessibleOrganization> & {
  id: number;
  name: string;
};

const accessibleOrganization = (
  organization: MockOrganization
): AccessibleOrganization => ({
  url: `/api/v2/organizations/${organization.id}.json`,
  view_tickets: true,
  inherited: false,
  default: false,
  ...organization,
});

const searchResponse = (results: MockOrganization[]) => ({
  ok: true,
  json: () =>
    Promise.resolve({
      organizations: results.map(accessibleOrganization),
      count: results.length,
      next_page: null,
      previous_page: null,
    }),
});

const byIdResponse = (organization: MockOrganization) => ({
  ok: true,
  json: () =>
    Promise.resolve({ organization: accessibleOrganization(organization) }),
});

const SEARCH_URL = "/api/v2/organizations/accessible?name=";
const BY_ID_URL = "/api/v2/organizations/accessible/";

// Routes the dropdown's two requests: the name search and the by-id lookup.
const mockApi = ({
  search = [],
  byId = { ok: false, status: 404, statusText: "Not Found" },
}: {
  search?: MockOrganization[];
  byId?: unknown;
}) => {
  (global.fetch as jest.Mock).mockImplementation((url: string) => {
    if (url.startsWith(SEARCH_URL)) {
      return Promise.resolve(searchResponse(search));
    }
    if (url.startsWith(BY_ID_URL)) {
      return Promise.resolve(byId);
    }
    return Promise.reject(new Error(`Unexpected request: ${url}`));
  });
};

const fetchedUrls = () =>
  (global.fetch as jest.Mock).mock.calls.map(([url]) => url as string);

const byIdCalls = () =>
  fetchedUrls().filter((url) => url.startsWith(BY_ID_URL));

const input = () => screen.getByLabelText("Organization");

describe("<OrganizationsDropdown />", () => {
  const onOrganizationSelectedMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers({ advanceTimers: true });
    global.fetch = jest.fn();
    mockApi({});
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  const renderComponent = (
    props: Partial<Parameters<typeof OrganizationsDropdown>[0]> = {}
  ) =>
    render(
      <OrganizationsDropdown
        organizations={organizations}
        currentOrganizationId={1}
        onOrganizationSelected={onOrganizationSelectedMock}
        {...props}
      />
    );

  // Keeps the selection in state, as RequestsList does through the URL.
  function StatefulDropdown({
    initialOrganizationId = 1,
    onSelected = onOrganizationSelectedMock,
  }: {
    initialOrganizationId?: number;
    onSelected?: (organizationId: number) => void;
  }) {
    const [organizationId, setOrganizationId] = useState(initialOrganizationId);
    return (
      <OrganizationsDropdown
        organizations={organizations}
        currentOrganizationId={organizationId}
        onOrganizationSelected={(id) => {
          onSelected(id);
          setOrganizationId(id);
        }}
      />
    );
  }

  const typeInDropdown = async (text: string) => {
    const user = userEvent.setup({ delay: null });
    fireEvent.click(input());
    await user.clear(input());
    if (text) {
      await user.type(input(), text);
    }
  };

  const runSearch = async () => {
    await act(async () => {
      jest.advanceTimersByTime(300);
    });
  };

  describe("unfiltered list", () => {
    test("renders the first page of organizations", () => {
      renderComponent();

      fireEvent.click(input());

      expect(
        screen.getByRole("option", { name: "My Organization" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("option", { name: "Another Organization" })
      ).toBeInTheDocument();
    });

    test("shows the selected organization's name without any request", () => {
      renderComponent({ currentOrganizationId: 2 });

      expect(input()).toHaveValue("Another Organization");
      expect(global.fetch).not.toHaveBeenCalled();
    });

    test("displays the selected organization's name once organizations load asynchronously", () => {
      const { rerender } = renderComponent({
        organizations: [],
        isLoadingOrganizations: true,
      });

      expect(input()).toHaveValue("");

      rerender(
        <OrganizationsDropdown
          organizations={organizations}
          currentOrganizationId={1}
          onOrganizationSelected={onOrganizationSelectedMock}
        />
      );

      expect(input()).toHaveValue("My Organization");
      expect(global.fetch).not.toHaveBeenCalled();
    });

    test("updates the displayed name when the selection changes", () => {
      const { rerender } = renderComponent();

      expect(input()).toHaveValue("My Organization");

      rerender(
        <OrganizationsDropdown
          organizations={organizations}
          currentOrganizationId={2}
          onOrganizationSelected={onOrganizationSelectedMock}
        />
      );

      expect(input()).toHaveValue("Another Organization");
    });
  });

  describe("when the selected organization is not in the first page", () => {
    test("looks it up by id and shows its name", async () => {
      mockApi({ byId: byIdResponse({ id: 99, name: "Zebra Inc" }) });

      renderComponent({ currentOrganizationId: 99 });

      await waitFor(() => expect(input()).toHaveValue("Zebra Inc"));
      expect(byIdCalls()).toEqual([`${BY_ID_URL}99`]);
      expect(fetchedUrls().some((url) => url.startsWith(SEARCH_URL))).toBe(
        false
      );
    });

    test("adds it to the unfiltered list", async () => {
      mockApi({ byId: byIdResponse({ id: 99, name: "Zebra Inc" }) });

      renderComponent({ currentOrganizationId: 99 });
      await waitFor(() => expect(input()).toHaveValue("Zebra Inc"));

      fireEvent.click(input());

      expect(
        screen.getByRole("option", { name: "Zebra Inc" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("option", { name: "My Organization" })
      ).toBeInTheDocument();
    });

    test("waits for the first page to load before looking it up", async () => {
      mockApi({ byId: byIdResponse({ id: 99, name: "Zebra Inc" }) });

      const { rerender } = renderComponent({
        organizations: [],
        isLoadingOrganizations: true,
        currentOrganizationId: 99,
      });

      expect(global.fetch).not.toHaveBeenCalled();

      rerender(
        <OrganizationsDropdown
          organizations={organizations}
          currentOrganizationId={99}
          onOrganizationSelected={onOrganizationSelectedMock}
        />
      );

      await waitFor(() => expect(input()).toHaveValue("Zebra Inc"));
      expect(byIdCalls()).toHaveLength(1);
    });

    test("does not look it up when the first page turns out to contain it", () => {
      const { rerender } = renderComponent({
        organizations: [],
        isLoadingOrganizations: true,
        currentOrganizationId: 2,
      });

      rerender(
        <OrganizationsDropdown
          organizations={organizations}
          currentOrganizationId={2}
          onOrganizationSelected={onOrganizationSelectedMock}
        />
      );

      expect(input()).toHaveValue("Another Organization");
      expect(global.fetch).not.toHaveBeenCalled();
    });

    test("leaves the input empty when the user cannot view its tickets", async () => {
      mockApi({
        byId: byIdResponse({ id: 99, name: "Restricted", view_tickets: false }),
      });

      renderComponent({ currentOrganizationId: 99 });

      await waitFor(() => expect(byIdCalls()).toHaveLength(1));
      await act(async () => undefined);

      expect(input()).toHaveValue("");
      fireEvent.click(input());
      expect(
        screen.queryByRole("option", { name: "Restricted" })
      ).not.toBeInTheDocument();
    });

    test.each([
      [403, "Forbidden"],
      [404, "Not Found"],
    ])(
      "leaves the input empty when the lookup responds with %i",
      async (status, statusText) => {
        mockApi({ byId: { ok: false, status, statusText } });

        renderComponent({ currentOrganizationId: 99 });

        await waitFor(() => expect(byIdCalls()).toHaveLength(1));
        await act(async () => undefined);

        expect(input()).toHaveValue("");
        fireEvent.click(input());
        expect(
          screen.getByRole("option", { name: "My Organization" })
        ).toBeInTheDocument();
      }
    );
  });

  describe("searching", () => {
    test("searches the API by name from the first character typed", async () => {
      mockApi({ search: [{ id: 3, name: "Searched Organization" }] });

      renderComponent();

      await typeInDropdown("s");
      await runSearch();

      expect(fetchedUrls()).toContain(`${SEARCH_URL}s`);
    });

    test("debounces the search while typing", async () => {
      mockApi({ search: [{ id: 3, name: "Searched Organization" }] });

      renderComponent();

      await typeInDropdown("sea");
      expect(fetchedUrls()).toEqual([]);
      await runSearch();

      expect(fetchedUrls()).toEqual([`${SEARCH_URL}sea`]);
    });

    test("replaces the list with search results", async () => {
      mockApi({ search: [{ id: 3, name: "Searched Organization" }] });

      renderComponent();

      await typeInDropdown("sea");
      await runSearch();

      await waitFor(() => {
        expect(
          screen.getByRole("option", { name: "Searched Organization" })
        ).toBeInTheDocument();
      });
      expect(
        screen.queryByRole("option", { name: "My Organization" })
      ).not.toBeInTheDocument();
    });

    test("searches the API even when the organization is in the first page", async () => {
      mockApi({ search: [{ id: 2, name: "Another Organization" }] });

      renderComponent();

      await typeInDropdown("another");
      await runSearch();

      await waitFor(() => {
        expect(
          screen.getByRole("option", { name: "Another Organization" })
        ).toBeInTheDocument();
      });
      expect(fetchedUrls()).toContain(`${SEARCH_URL}another`);
    });

    test("uses the server's matching, not a substring match on the loaded page", async () => {
      // The server matches by token prefix, so "ebra" finds nothing even though
      // a loaded organization contains it.
      mockApi({ search: [] });

      renderComponent({
        organizations: [
          { id: 1, name: "Zebra Test Corporation", default: true },
          { id: 2, name: "Another Organization", default: false },
        ],
      });

      await typeInDropdown("ebra");
      await runSearch();

      await waitFor(() => {
        expect(screen.getByText("No matches found")).toBeInTheDocument();
      });
      expect(
        screen.queryByRole("option", { name: "Zebra Test Corporation" })
      ).not.toBeInTheDocument();
      expect(fetchedUrls()).toContain(`${SEARCH_URL}ebra`);
    });

    test("shows no matches when the search returns no organizations", async () => {
      mockApi({ search: [] });

      renderComponent();

      await typeInDropdown("zzz");
      await runSearch();

      await waitFor(() => {
        expect(screen.getByText("No matches found")).toBeInTheDocument();
      });
    });

    test("keeps the typed text in the input while searching", async () => {
      renderComponent();

      await typeInDropdown("acm");

      expect(input()).toHaveValue("acm");
    });

    test("typing does not change the selection", async () => {
      mockApi({ search: [{ id: 3, name: "Searched Organization" }] });

      renderComponent();

      await typeInDropdown("searched");
      await runSearch();

      expect(onOrganizationSelectedMock).not.toHaveBeenCalled();
    });

    test("shows the selected organization's name, not the search text, after picking a result", async () => {
      mockApi({ search: [{ id: 99, name: "Page Two Organization" }] });

      render(<StatefulDropdown />);

      await typeInDropdown("page");
      await runSearch();
      const user = userEvent.setup({ delay: null });
      await user.click(
        await screen.findByRole("option", { name: "Page Two Organization" })
      );
      await act(async () => undefined);

      expect(onOrganizationSelectedMock).toHaveBeenCalledWith(99);
      expect(input()).toHaveValue("Page Two Organization");
      // The picked organization's name is already known, so no lookup runs.
      expect(byIdCalls()).toEqual([]);
    });

    test("clearing the search restores the unfiltered list and keeps the selected organization", async () => {
      mockApi({ search: [{ id: 99, name: "Page Two Organization" }] });

      render(<StatefulDropdown />);

      await typeInDropdown("page");
      await runSearch();
      const user = userEvent.setup({ delay: null });
      await user.click(
        await screen.findByRole("option", { name: "Page Two Organization" })
      );

      await typeInDropdown("");

      expect(input()).toHaveValue("");
      expect(
        screen.getByRole("option", { name: "Page Two Organization" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("option", { name: "My Organization" })
      ).toBeInTheDocument();
      expect(onOrganizationSelectedMock).toHaveBeenCalledTimes(1);
    });

    test("closing without picking an option shows the selected name again", async () => {
      renderComponent();

      await typeInDropdown("acm");
      fireEvent.keyDown(input(), { key: "Escape" });

      await waitFor(() => expect(input()).toHaveValue("My Organization"));
      expect(onOrganizationSelectedMock).not.toHaveBeenCalled();
    });

    test("leaving the input without picking an option shows the selected name again", async () => {
      renderComponent();

      await typeInDropdown("acm");
      await userEvent.setup({ delay: null }).tab();

      await waitFor(() => expect(input()).toHaveValue("My Organization"));
      expect(onOrganizationSelectedMock).not.toHaveBeenCalled();
    });

    test("clicking the input while typing keeps the typed text", async () => {
      renderComponent();

      await typeInDropdown("acm");
      fireEvent.click(input());

      expect(input()).toHaveValue("acm");
    });
  });

  describe("selecting", () => {
    test("calls onOrganizationSelected when an option is selected", () => {
      renderComponent();

      fireEvent.click(input());
      fireEvent.click(screen.getByText("Another Organization"));

      expect(onOrganizationSelectedMock).toHaveBeenCalledWith(2);
    });

    test("does not call onOrganizationSelected when the current organization is picked again", () => {
      renderComponent();

      fireEvent.click(input());
      fireEvent.click(screen.getByRole("option", { name: "My Organization" }));

      expect(onOrganizationSelectedMock).not.toHaveBeenCalled();
      expect(input()).toHaveValue("My Organization");
    });
  });
});
