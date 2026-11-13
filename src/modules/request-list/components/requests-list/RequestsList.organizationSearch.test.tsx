// Uses the real useParams and useRequests, so the test sees the actual ticket
// requests and URL changes that the organization dropdown causes.
jest.mock("../../hooks/useUser");
jest.mock("../../hooks/useOrganizations");
jest.mock("../../hooks/useTicketFields");
jest.mock("../../hooks/useShowManyUsers");

import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import { render } from "../../../test/render";
import { RequestsList } from "./RequestsList";
import { useUser } from "../../hooks/useUser";
import { useOrganizations } from "../../hooks/useOrganizations";
import { useTicketFields } from "../../hooks/useTicketFields";
import { useShowManyUsers } from "../../hooks/useShowManyUsers";
import localStorage from "../../utils/localStorage";
import {
  organizations,
  requests,
  requestUsers,
  ticketFields,
  user,
} from "../../apiMocks";

const REQUESTS_URL = "/api/v2/requests/search.json";
const SEARCH_URL = "/api/v2/organizations/accessible?name=";
const BY_ID_URL = "/api/v2/organizations/accessible/";

const requestsSearchCalls = () =>
  (global.fetch as jest.Mock).mock.calls.filter(([url]) =>
    String(url).startsWith(REQUESTS_URL)
  );

const organizationSearchCalls = () =>
  (global.fetch as jest.Mock).mock.calls.filter(([url]) =>
    String(url).startsWith(SEARCH_URL)
  );

const byIdCalls = () =>
  (global.fetch as jest.Mock).mock.calls.filter(([url]) =>
    String(url).startsWith(BY_ID_URL)
  );

const searchedOrganization = {
  id: 99,
  name: "Page Two Organization",
  url: "/api/v2/organizations/99.json",
  view_tickets: true,
  inherited: false,
  default: null,
};

beforeEach(() => {
  jest.useFakeTimers();
  window.history.replaceState(
    {},
    "",
    "/hc/requests?selected_tab_name=org-requests&organization_id=1"
  );
  (useUser as jest.Mock).mockReturnValue({ user, isLoading: false });
  (useOrganizations as jest.Mock).mockReturnValue({
    organizations,
    isLoading: false,
  });
  (useTicketFields as jest.Mock).mockReturnValue({ ticketFields });
  (useShowManyUsers as jest.Mock).mockReturnValue({
    users: [],
    isLoading: false,
  });
  global.fetch = jest.fn().mockImplementation((url: string) => {
    if (url.startsWith(REQUESTS_URL)) {
      return Promise.resolve({
        status: 200,
        ok: true,
        json: () =>
          Promise.resolve({
            requests,
            users: requestUsers,
            count: requests.length,
            next_page: null,
            previous_page: null,
          }),
      });
    }
    if (url.startsWith(SEARCH_URL)) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            organizations: [searchedOrganization],
            count: 1,
            next_page: null,
            previous_page: null,
          }),
      });
    }
    if (url === `${BY_ID_URL}${searchedOrganization.id}`) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ organization: searchedOrganization }),
      });
    }
    return Promise.reject(new Error(`Unexpected request: ${url}`));
  });
});

afterEach(() => {
  act(() => {
    jest.runOnlyPendingTimers();
  });
  jest.useRealTimers();
  localStorage.clear();
  jest.clearAllMocks();
});

const renderRequestsList = async () => {
  const view = render(
    <RequestsList
      locale="en-us"
      customStatusesEnabled={false}
      viewRequestsAcrossBrandsEnabled={false}
      filterTicketFieldsByBrand={false}
    />
  );
  await screen.findByLabelText("Organization");
  return view;
};

const selectSearchedOrganization = async () => {
  await typeInOrganizationSearch("page");
  fireEvent.click(
    await screen.findByRole("option", { name: "Page Two Organization" })
  );
  await waitFor(() =>
    expect(screen.getByLabelText("Organization")).toHaveValue(
      "Page Two Organization"
    )
  );
};

const typeInOrganizationSearch = async (text: string) => {
  const input = screen.getByLabelText("Organization");
  fireEvent.click(input);
  fireEvent.change(input, { target: { value: "" } });
  for (let length = 1; length <= text.length; length++) {
    fireEvent.change(input, { target: { value: text.slice(0, length) } });
  }
  await act(async () => {
    jest.advanceTimersByTime(300);
  });
};

describe("Organization search in the requests list", () => {
  test("typing in the organization search does not reload tickets or change the URL", async () => {
    await renderRequestsList();
    expect(requestsSearchCalls()).toHaveLength(1);
    const urlBeforeTyping = window.location.search;

    await typeInOrganizationSearch("page");

    await waitFor(() => expect(organizationSearchCalls()).toHaveLength(1));
    expect(requestsSearchCalls()).toHaveLength(1);
    expect(window.location.search).toBe(urlBeforeTyping);
    expect(window.location.search).not.toContain("organization_query");
  }, 10000);

  test("selecting a searched organization loads its tickets and keeps only its id in the URL", async () => {
    await renderRequestsList();

    await typeInOrganizationSearch("page");
    fireEvent.click(
      await screen.findByRole("option", { name: "Page Two Organization" })
    );

    await waitFor(() => expect(requestsSearchCalls()).toHaveLength(2));
    const lastRequestUrl = String(requestsSearchCalls()[1]?.[0]);
    expect(lastRequestUrl).toContain("organization_id=99");

    const urlParams = new URLSearchParams(window.location.search);
    expect(urlParams.get("organization_id")).toBe("99");
    expect(urlParams.has("organization_query")).toBe(false);
    expect(urlParams.has("organization_name")).toBe(false);
    expect(screen.getByLabelText("Organization")).toHaveValue(
      "Page Two Organization"
    );
  }, 10000);

  test("shows the name of an organization outside the first page after a refresh", async () => {
    const view = await renderRequestsList();
    await selectSearchedOrganization();
    expect(byIdCalls()).toHaveLength(0);

    view.unmount();
    await renderRequestsList();

    await waitFor(() =>
      expect(screen.getByLabelText("Organization")).toHaveValue(
        "Page Two Organization"
      )
    );
    expect(byIdCalls()).toHaveLength(1);
    expect(organizationSearchCalls()).toHaveLength(1);
  }, 10000);

  test("shows the name of an organization outside the first page after switching tabs and going back", async () => {
    await renderRequestsList();
    await selectSearchedOrganization();

    fireEvent.click(screen.getByRole("tab", { name: "My requests" }));
    await waitFor(() =>
      expect(screen.queryByLabelText("Organization")).not.toBeInTheDocument()
    );

    act(() => {
      window.history.back();
    });

    await waitFor(() =>
      expect(screen.getByLabelText("Organization")).toHaveValue(
        "Page Two Organization"
      )
    );
    expect(
      new URLSearchParams(window.location.search).get("organization_id")
    ).toBe("99");
    expect(byIdCalls()).toHaveLength(1);
  }, 10000);
});
