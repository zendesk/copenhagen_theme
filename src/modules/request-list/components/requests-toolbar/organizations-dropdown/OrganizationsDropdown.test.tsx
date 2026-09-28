import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { render } from "../../../../test/render";
import OrganizationsDropdown from "./OrganizationsDropdown";
import { organizations } from "../../../apiMocks";

const searchResponse = (
  results: { id: number; name: string; shared_tickets?: boolean }[]
) => ({
  ok: true,
  json: () =>
    Promise.resolve({
      organizations: results.map((organization) => ({
        url: `/api/v2/organizations/${organization.id}.json`,
        shared_tickets: true,
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

  const renderComponent = (hasMore: boolean) => {
    render(
      <OrganizationsDropdown
        organizations={organizations}
        hasMore={hasMore}
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
      renderComponent(false);

      fireEvent.click(screen.getByLabelText("Organization"));

      expect(
        screen.getByRole("option", { name: "My Organization" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("option", { name: "Another Organization" })
      ).toBeInTheDocument();
    });

    test("filters the loaded organizations locally without calling the API", async () => {
      renderComponent(false);

      await typeInDropdown("another");
      jest.advanceTimersByTime(300);

      expect(global.fetch).not.toHaveBeenCalled();
      expect(
        screen.getByRole("option", { name: "Another Organization" })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("option", { name: "My Organization" })
      ).not.toBeInTheDocument();
    });

    test("shows the no matches option when nothing matches locally", async () => {
      renderComponent(false);

      await typeInDropdown("zzz");

      expect(screen.getByText("No matches found")).toBeInTheDocument();
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });

  describe("when more organizations are available", () => {
    test("searches the API from the first character typed", async () => {
      (global.fetch as jest.Mock).mockResolvedValue(
        searchResponse([{ id: 3, name: "Searched Organization" }])
      );

      renderComponent(true);

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

      renderComponent(true);

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

      renderComponent(true);

      await typeInDropdown("zzz");
      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(screen.getByText("No matches found")).toBeInTheDocument();
      });
    });
  });

  test("calls onOrganizationSelected when an option is selected", () => {
    renderComponent(false);

    fireEvent.click(screen.getByLabelText("Organization"));
    fireEvent.click(screen.getByText("Another Organization"));

    expect(onOrganizationSelectedMock).toHaveBeenCalledWith(2);
  });
});
