jest.mock("../../hooks/useUser");
jest.mock("../../hooks/useOrganizations");
jest.mock("../../hooks/useTicketFields");
jest.mock("../../hooks/useRequests");
jest.mock("../../hooks/useParams");
jest.mock("../../hooks/useShowManyUsers");

import { render } from "../../../test/render";
import { screen, act, fireEvent } from "@testing-library/react";
import { RequestsList } from "./RequestsList";
import { useParams } from "../../hooks/useParams";
import { useUser } from "../../hooks/useUser";
import { useOrganizations } from "../../hooks/useOrganizations";
import { useRequests } from "../../hooks/useRequests";
import { useTicketFields } from "../../hooks/useTicketFields";
import { useShowManyUsers } from "../../hooks/useShowManyUsers";
import location from "../../utils/location";
import type { RequestListParams } from "../../data-types/request-list-params";
import {
  MY_REQUESTS_TAB_NAME,
  ORG_REQUESTS_TAB_NAME,
} from "../../data-types/request-list-params";
import localStorage from "../../utils/localStorage";

import {
  organizations,
  requests,
  ticketFields,
  user,
  requestUsers,
} from "../../apiMocks";

const defaultParams: RequestListParams = {
  query: "",
  page: 1,
  sort: { order: "desc", by: "updated_at" },
  selectedTab: { name: MY_REQUESTS_TAB_NAME },
  filters: {},
};

const push = jest.fn();

const renderComponent = async (params?: Partial<RequestListParams>) => {
  (useParams as jest.Mock).mockReturnValue({
    params: { ...defaultParams, ...params },
    push,
  });

  render(<RequestsList locale="en-us" customStatusesEnabled={false} />);

  // This is needed because of a “bug” with the Jest fake timers
  // See: https://github.com/facebook/jest/issues/10221
  await act(() => Promise.resolve());
};

beforeEach(() => {
  jest.useFakeTimers().setSystemTime(new Date(2021, 5, 3));
  (useUser as jest.Mock).mockReturnValue({ user });
  (useOrganizations as jest.Mock).mockReturnValue({
    organizations,
  });
  (useTicketFields as jest.Mock).mockReturnValue({
    ticketFields,
  });
  (useRequests as jest.Mock).mockReturnValue({
    requests,
    requestsCount: requests.length,
    users: requestUsers,
  });
  (useShowManyUsers as jest.Mock).mockReturnValue({
    users: [],
    isLoading: false,
    error: undefined,
  });
});

afterEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

afterAll(() => {
  jest.useRealTimers();
});

describe("Rendering", () => {
  test("renders a list of requests", async () => {
    await renderComponent();

    expect(
      screen.getByRole("link", { name: "My request" })
    ).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "#1" })).toBeInTheDocument();
    expect(screen.getAllByText("Mar 3, 2019")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Jun 3, 2020")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Open")[0]).toBeInTheDocument();
  }, 10000);

  test("applies a default sort of updated at and descending", async () => {
    await renderComponent();

    expect(useParams).toHaveBeenCalledWith(
      expect.objectContaining({
        sort: { order: "desc", by: "updated_at" },
      }),
      expect.any(Function),
      expect.any(Function)
    );
  });

  test("renders the request description when the subject is empty", async () => {
    await renderComponent();

    expect(
      screen.getAllByText("Description for request with empty subject")[0]
    ).toBeInTheDocument();
  }, 10000);

  test("<RequestsList /> doesn't render 'Organizational requests' tab if there are no organizations", async () => {
    (useOrganizations as jest.Mock).mockReturnValue({ organizations: [] });

    await renderComponent();

    const organizationOption = screen.queryByText("Organizational requests");
    expect(organizationOption).toBeNull();
  }, 10000);

  test("<RequestsList /> renders custom fields in filter modal", async () => {
    await renderComponent();

    const filterButton = screen.getByRole("button", { name: "Filter" });
    fireEvent.click(filterButton);

    const filterTypeDropdown = screen.getByLabelText("Select filter", {
      selector: "input",
    });
    fireEvent.click(filterTypeDropdown);

    expect(screen.getByText("DropdownFieldEndUser")).toBeInTheDocument();
    expect(screen.getByText("MultiselectFieldEndUser")).toBeInTheDocument();
    expect(screen.getByText("TextField")).toBeInTheDocument();
    expect(screen.getByText("MultilineField")).toBeInTheDocument();
    expect(screen.getByText("CheckboxField")).toBeInTheDocument();
    expect(screen.getByText("NumberField")).toBeInTheDocument();
    expect(screen.getByText("DecimalField")).toBeInTheDocument();
    expect(screen.getByText("RegexpField")).toBeInTheDocument();
    expect(screen.getByText("CreditcardField")).toBeInTheDocument();
  }, 10000);

  test("<RequestsList /> renders dropdown custom field options in filter modal", async () => {
    await renderComponent();

    const filterButton = screen.getByRole("button", { name: "Filter" });
    fireEvent.click(filterButton);

    const filterTypeDropdown = screen.getByLabelText("Select filter", {
      selector: "input",
    });
    fireEvent.click(filterTypeDropdown);

    const dropdownFieldItem = screen.getByText("DropdownFieldEndUser");
    fireEvent.click(dropdownFieldItem);

    const dropdownOptionsDropdown = screen.getByLabelText(
      "DropdownFieldEndUser",
      {
        selector: "input",
      }
    );
    fireEvent.click(dropdownOptionsDropdown);

    expect(screen.getByText("Dropdown Field Option #1")).toBeInTheDocument();
    expect(screen.getByText("Dropdown Field Option #2")).toBeInTheDocument();
  }, 10000);

  test("<RequestsList /> renders multiselect custom field options in filter modal", async () => {
    await renderComponent();

    const filterButton = screen.getByRole("button", { name: "Filter" });
    fireEvent.click(filterButton);

    const filterTypeDropdown = screen.getByLabelText("Select filter", {
      selector: "input",
    });
    fireEvent.click(filterTypeDropdown);

    const multiselectFieldItem = screen.getByText("MultiselectFieldEndUser");
    fireEvent.click(multiselectFieldItem);

    const multiselectOptionsDropdown = screen.getByLabelText(
      "MultiselectFieldEndUser",
      {
        selector: "input",
      }
    );
    fireEvent.click(multiselectOptionsDropdown);

    expect(screen.getByText("Multiselect Field Option #1")).toBeInTheDocument();
    expect(screen.getByText("Multiselect Field Option #2")).toBeInTheDocument();
  }, 10000);
});

describe("Sorting", () => {
  describe("created at", () => {
    test("<RequestsList /> can sort on the column", async () => {
      await renderComponent();

      fireEvent.click(screen.getByRole("button", { name: /created date/i }));

      expect(push).toHaveBeenCalledWith({
        page: 1,
        sort: { by: "created_at", order: "asc" },
      });
    });

    test("<RequestsList /> should change sorting order to descending when the order is ascending", async () => {
      await renderComponent({
        sort: { by: "created_at", order: "asc" },
      });

      fireEvent.click(screen.getByRole("button", { name: /created date/i }));

      expect(push).toHaveBeenCalledWith({
        page: 1,
        sort: { by: "created_at", order: "desc" },
      });
    });

    test("<RequestsList /> should clear the sorting when the order is descending", async () => {
      await renderComponent({
        sort: { by: "created_at", order: "desc" },
      });

      fireEvent.click(screen.getByRole("button", { name: /created date/i }));

      expect(push).toHaveBeenCalledWith({
        page: 1,
        sort: null,
      });
    });
  });

  describe("updated at", () => {
    test("<RequestsList /> can sort on the column", async () => {
      await renderComponent({ sort: null });

      fireEvent.click(screen.getByRole("button", { name: /updated date/i }));

      expect(push).toHaveBeenCalledWith({
        page: 1,
        sort: { by: "updated_at", order: "asc" },
      });
    });

    test("<RequestsList /> should change sorting order to descending when the order is ascending", async () => {
      await renderComponent({
        sort: { by: "updated_at", order: "asc" },
      });

      fireEvent.click(screen.getByRole("button", { name: /updated date/i }));

      expect(push).toHaveBeenCalledWith({
        page: 1,
        sort: { by: "updated_at", order: "desc" },
      });
    });

    test("<RequestsList /> should clear the sorting when the order is descending", async () => {
      await renderComponent({
        sort: { by: "updated_at", order: "desc" },
      });

      fireEvent.click(screen.getByRole("button", { name: /updated date/i }));

      expect(push).toHaveBeenCalledWith({
        page: 1,
        sort: null,
      });
    });
  });

  describe("status", () => {
    test("<RequestsList /> can sort on the column", async () => {
      await renderComponent();

      fireEvent.click(screen.getByRole("button", { name: "Status" }));

      expect(push).toHaveBeenCalledWith({
        page: 1,
        sort: { by: "status", order: "asc" },
      });
    });

    test("<RequestsList /> should change sorting order to descending when the order is ascending", async () => {
      await renderComponent({
        sort: { by: "status", order: "asc" },
      });

      fireEvent.click(screen.getByRole("button", { name: "Status" }));

      expect(push).toHaveBeenCalledWith({
        page: 1,
        sort: { by: "status", order: "desc" },
      });
    });

    test("<RequestsList /> should clear the sorting when the order is descending", async () => {
      await renderComponent({
        sort: { by: "status", order: "desc" },
      });
      fireEvent.click(screen.getByRole("button", { name: "Status" }));

      expect(push).toHaveBeenCalledWith({
        page: 1,
        sort: null,
      });
    });
  });
});

describe("Filter tabs", () => {
  test("<RequestsList /> can filter by organization using the organizations menu on the 'Organizational requests' tab", async () => {
    await renderComponent({
      selectedTab: { name: ORG_REQUESTS_TAB_NAME, organizationId: 1 },
    });

    fireEvent.click(screen.getByRole("combobox", { name: "Organization" }));
    fireEvent.click(
      screen.getByRole("option", { name: "Another Organization" })
    );

    expect(push).toHaveBeenCalledWith({
      page: 1,
      selectedTab: { name: ORG_REQUESTS_TAB_NAME, organizationId: 2 },
    });
  });

  test("<RequestsList /> filters by the default organization on the 'Organizational requests' tab", async () => {
    await renderComponent();

    fireEvent.click(
      screen.getByRole("tab", { name: "Organizational requests" })
    );

    expect(push).toHaveBeenCalledWith({
      page: 1,
      selectedTab: { name: ORG_REQUESTS_TAB_NAME, organizationId: 1 },
      filters: {},
    });
  });
});

describe("Navigating", () => {
  test("navigates to the request page after clicking the subject", async () => {
    const locationAssignSpy = jest
      .spyOn(location, "assign")
      .mockImplementation(() => undefined);

    await renderComponent();

    fireEvent.click(screen.getByRole("link", { name: "My request" }));

    expect(locationAssignSpy).toHaveBeenCalledWith("/hc/requests/1");
  });
});
