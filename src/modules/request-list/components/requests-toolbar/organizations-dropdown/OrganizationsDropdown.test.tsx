import { useState } from "react";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { render } from "../../../../test/render";
import OrganizationsDropdown from "./OrganizationsDropdown";
import { organizations } from "../../../apiMocks";

const searchResponse = (
  results: { id: number; name: string; view_tickets?: boolean }[]
) => ({
  ok: true,
  json: () =>
    Promise.resolve({
      organizations: results.map((organization) => ({
        url: `/api/v2/organizations/${organization.id}.json`,
        view_tickets: true,
        inherited: false,
        default: false,
        ...organization,
      })),
      count: results.length,
      next_page: null,
      previous_page: null,
    }),
});

describe("<OrganizationsDropdown />", () => {
  const onOrganizationSelectedMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers({ advanceTimers: true });
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  const renderComponent = () => {
    render(
      <OrganizationsDropdown
        organizations={organizations}
        currentOrganizationId={1}
        onOrganizationSelected={onOrganizationSelectedMock}
      />
    );
  };

  const typeInDropdown = async (text: string) => {
    const user = userEvent.setup({ delay: null });
    fireEvent.click(screen.getByLabelText("Organization"));
    const input = screen.getByLabelText("Organization");
    await user.clear(input);
    await user.type(input, text);
  };

  describe("when all organizations are loaded", () => {
    test("renders the full list", () => {
      renderComponent();

      fireEvent.click(screen.getByLabelText("Organization"));

      expect(
        screen.getByRole("option", { name: "My Organization" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("option", { name: "Another Organization" })
      ).toBeInTheDocument();
    });

    test("searches the API even when all organizations are loaded", async () => {
      (global.fetch as jest.Mock).mockResolvedValue(
        searchResponse([{ id: 2, name: "Another Organization" }])
      );

      renderComponent();

      await typeInDropdown("another");
      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          "/api/v2/organizations/accessible?name=another",
          expect.anything()
        );
        expect(
          screen.getByRole("option", { name: "Another Organization" })
        ).toBeInTheDocument();
        expect(
          screen.queryByRole("option", { name: "My Organization" })
        ).not.toBeInTheDocument();
      });
    });

    test("shows no matches when the server search returns no organizations", async () => {
      (global.fetch as jest.Mock).mockResolvedValue(searchResponse([]));

      renderComponent();

      await typeInDropdown("zzz");
      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(screen.getByText("No matches found")).toBeInTheDocument();
        expect(global.fetch).toHaveBeenCalledWith(
          "/api/v2/organizations/accessible?name=zzz",
          expect.anything()
        );
      });
    });
  });

  describe("when more organizations are available", () => {
    test("searches the API from the first character typed", async () => {
      (global.fetch as jest.Mock).mockResolvedValue(
        searchResponse([{ id: 3, name: "Searched Organization" }])
      );

      renderComponent();

      await typeInDropdown("s");
      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          "/api/v2/organizations/accessible?name=s",
          expect.anything()
        );
      });
    });

    test("replaces the list with search results", async () => {
      (global.fetch as jest.Mock).mockResolvedValue(
        searchResponse([{ id: 3, name: "Searched Organization" }])
      );

      renderComponent();

      await typeInDropdown("sea");
      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(screen.getByText("Searched Organization")).toBeInTheDocument();
      });
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/v2/organizations/accessible?name=sea",
        expect.anything()
      );
      expect(screen.queryByText("My Organization")).not.toBeInTheDocument();
    });

    test("shows the no matches option when the search returns no results", async () => {
      (global.fetch as jest.Mock).mockResolvedValue(searchResponse([]));

      renderComponent();

      await typeInDropdown("zzz");
      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(screen.getByText("No matches found")).toBeInTheDocument();
      });
    });
  });

  test("restores a searched organization by its name from the URL", async () => {
    (global.fetch as jest.Mock).mockResolvedValue(
      searchResponse([{ id: 99, name: "Page Two Organization" }])
    );

    function Wrapper() {
      const [id, setId] = useState(1);
      const [query, setQuery] = useState("");
      return (
        <OrganizationsDropdown
          organizations={organizations}
          currentOrganizationId={id}
          currentOrganizationQuery={query}
          onOrganizationQueryChanged={setQuery}
          onOrganizationSelected={(organizationId, organizationQuery) => {
            setId(organizationId);
            setQuery(organizationQuery ?? "");
          }}
        />
      );
    }
    const { unmount } = render(<Wrapper />);

    await typeInDropdown("page");
    jest.advanceTimersByTime(300);
    const user = userEvent.setup({ delay: null });
    await user.click(await screen.findByText("Page Two Organization"));

    await act(async () => {
      jest.advanceTimersByTime(50);
    });

    expect(screen.getByLabelText("Organization")).toHaveValue("page");

    unmount();
    render(
      <OrganizationsDropdown
        organizations={organizations}
        currentOrganizationId={99}
        currentOrganizationQuery="page"
        onOrganizationSelected={onOrganizationSelectedMock}
      />
    );

    expect(screen.getByLabelText("Organization")).toHaveValue("page");
    fireEvent.click(screen.getByLabelText("Organization"));
    jest.advanceTimersByTime(300);
    expect(
      await screen.findByRole("option", { name: "Page Two Organization" })
    ).toBeInTheDocument();
    expect(global.fetch).toHaveBeenLastCalledWith(
      "/api/v2/organizations/accessible?name=page",
      expect.anything()
    );
  });

  test("calls onOrganizationSelected when an option is selected", () => {
    renderComponent();

    fireEvent.click(screen.getByLabelText("Organization"));
    fireEvent.click(screen.getByText("Another Organization"));

    expect(onOrganizationSelectedMock).toHaveBeenCalledWith(2, undefined);
  });

  test("displays the selected organization's name once organizations load asynchronously", () => {
    const { rerender } = render(
      <OrganizationsDropdown
        organizations={[]}
        currentOrganizationId={1}
        onOrganizationSelected={onOrganizationSelectedMock}
      />
    );

    // Organizations are still loading, so the input starts blank
    expect(screen.getByLabelText("Organization")).toHaveValue("");

    rerender(
      <OrganizationsDropdown
        organizations={organizations}
        currentOrganizationId={1}
        onOrganizationSelected={onOrganizationSelectedMock}
      />
    );

    expect(screen.getByLabelText("Organization")).toHaveValue(
      "My Organization"
    );
  });

  test("updates the displayed name when the selection changes", () => {
    const { rerender } = render(
      <OrganizationsDropdown
        organizations={organizations}
        currentOrganizationId={1}
        onOrganizationSelected={onOrganizationSelectedMock}
      />
    );

    expect(screen.getByLabelText("Organization")).toHaveValue(
      "My Organization"
    );

    rerender(
      <OrganizationsDropdown
        organizations={organizations}
        currentOrganizationId={2}
        onOrganizationSelected={onOrganizationSelectedMock}
      />
    );

    expect(screen.getByLabelText("Organization")).toHaveValue(
      "Another Organization"
    );
  });
});
