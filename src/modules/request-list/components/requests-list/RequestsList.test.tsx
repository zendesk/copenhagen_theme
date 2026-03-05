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

    const marDates = screen.getAllByText("Mar 3, 2019");
    expect(marDates[0]!).toBeInTheDocument();

    const junDates = screen.getAllByText("Jun 3, 2020");
    expect(junDates[0]!).toBeInTheDocument();

    const openStatuses = screen.getAllByText("Open");
    expect(openStatuses[0]!).toBeInTheDocument();
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

    const descriptions = screen.getAllByText(
      "Description for request with empty subject"
    );
    expect(descriptions[0]!).toBeInTheDocument();
  }, 10000);

  test("<RequestsList /> doesn't render 'Organizational requests' tab if there are no organizations", async () => {
    (useOrganizations as jest.Mock).mockReturnValue({ organizations: [] });

    await renderComponent();

    const organizationOption = screen.queryByText("Organizational requests");
    expect(organizationOption).toBeNull();
  }, 10000);

  test("<RequestsList /> renders custom fields in filter modal", async () => {
    await renderComponent();

    const filterButtons = screen.getAllByRole("button", { name: "Filter" });
    fireEvent.click(filterButtons[0]!);

    const filterTypeDropdowns = screen.getAllByLabelText("Select filter", {
      selector: "input",
    });
    fireEvent.click(filterTypeDropdowns[0]!);

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

    const filterButtons = screen.getAllByRole("button", { name: "Filter" });
    fireEvent.click(filterButtons[0]!);

    const filterTypeDropdowns = screen.getAllByLabelText("Select filter", {
      selector: "input",
    });
    fireEvent.click(filterTypeDropdowns[0]!);

    const dropdownFieldItems = screen.getAllByText("DropdownFieldEndUser");
    fireEvent.click(dropdownFieldItems[0]!);

    const dropdownOptionsDropdowns = screen.getAllByLabelText(
      "DropdownFieldEndUser",
      {
        selector: "input",
      }
    );
    fireEvent.click(dropdownOptionsDropdowns[0]!);

    expect(screen.getByText("Dropdown Field Option #1")).toBeInTheDocument();
    expect(screen.getByText("Dropdown Field Option #2")).toBeInTheDocument();
  }, 10000);

  test("<RequestsList /> renders multiselect custom field options in filter modal", async () => {
    await renderComponent();

    const filterButtons = screen.getAllByRole("button", { name: "Filter" });
    fireEvent.click(filterButtons[0]!);

    const filterTypeDropdowns = screen.getAllByLabelText("Select filter", {
      selector: "input",
    });
    fireEvent.click(filterTypeDropdowns[0]!);

    const multiselectFieldItems = screen.getAllByText(
      "MultiselectFieldEndUser"
    );
    fireEvent.click(multiselectFieldItems[0]!);

    const multiselectOptionsDropdowns = screen.getAllByLabelText(
      "MultiselectFieldEndUser",
      {
        selector: "input",
      }
    );
    fireEvent.click(multiselectOptionsDropdowns[0]!);

    expect(screen.getByText("Multiselect Field Option #1")).toBeInTheDocument();
    expect(screen.getByText("Multiselect Field Option #2")).toBeInTheDocument();
  }, 10000);
});

describe("Sorting", () => {
  describe("created at", () => {
    test("<RequestsList /> can sort on the column", async () => {
      await renderComponent();

      const createdDateButtons = screen.getAllByRole("button", {
        name: /created date/i,
      });
      fireEvent.click(createdDateButtons[0]!);

      expect(push).toHaveBeenCalledWith({
        page: 1,
        sort: { by: "created_at", order: "asc" },
      });
    });

    test("<RequestsList /> should change sorting order to descending when the order is ascending", async () => {
      await renderComponent({
        sort: { by: "created_at", order: "asc" },
      });

      const createdDateButtons = screen.getAllByRole("button", {
        name: /created date/i,
      });
      fireEvent.click(createdDateButtons[0]!);

      expect(push).toHaveBeenCalledWith({
        page: 1,
        sort: { by: "created_at", order: "desc" },
      });
    });

    test("<RequestsList /> should clear the sorting when the order is descending", async () => {
      await renderComponent({
        sort: { by: "created_at", order: "desc" },
      });

      const createdDateButtons = screen.getAllByRole("button", {
        name: /created date/i,
      });
      fireEvent.click(createdDateButtons[0]!);

      expect(push).toHaveBeenCalledWith({
        page: 1,
        sort: null,
      });
    });
  });

  describe("updated at", () => {
    test("<RequestsList /> can sort on the column", async () => {
      await renderComponent({ sort: null });

      const updatedDateButtons = screen.getAllByRole("button", {
        name: /updated date/i,
      });
      fireEvent.click(updatedDateButtons[0]!);

      expect(push).toHaveBeenCalledWith({
        page: 1,
        sort: { by: "updated_at", order: "asc" },
      });
    });

    test("<RequestsList /> should change sorting order to descending when the order is ascending", async () => {
      await renderComponent({
        sort: { by: "updated_at", order: "asc" },
      });

      const updatedDateButtons = screen.getAllByRole("button", {
        name: /updated date/i,
      });
      fireEvent.click(updatedDateButtons[0]!);

      expect(push).toHaveBeenCalledWith({
        page: 1,
        sort: { by: "updated_at", order: "desc" },
      });
    });

    test("<RequestsList /> should clear the sorting when the order is descending", async () => {
      await renderComponent({
        sort: { by: "updated_at", order: "desc" },
      });

      const updatedDateButtons = screen.getAllByRole("button", {
        name: /updated date/i,
      });
      fireEvent.click(updatedDateButtons[0]!);

      expect(push).toHaveBeenCalledWith({
        page: 1,
        sort: null,
      });
    });
  });

  describe("status", () => {
    test("<RequestsList /> can sort on the column", async () => {
      await renderComponent();

      const statusButtons = screen.getAllByRole("button", { name: "Status" });
      fireEvent.click(statusButtons[0]!);

      expect(push).toHaveBeenCalledWith({
        page: 1,
        sort: { by: "status", order: "asc" },
      });
    });

    test("<RequestsList /> should change sorting order to descending when the order is ascending", async () => {
      await renderComponent({
        sort: { by: "status", order: "asc" },
      });

      const statusButtons = screen.getAllByRole("button", { name: "Status" });
      fireEvent.click(statusButtons[0]!);

      expect(push).toHaveBeenCalledWith({
        page: 1,
        sort: { by: "status", order: "desc" },
      });
    });

    test("<RequestsList /> should clear the sorting when the order is descending", async () => {
      await renderComponent({
        sort: { by: "status", order: "desc" },
      });

      const statusButtons = screen.getAllByRole("button", { name: "Status" });
      fireEvent.click(statusButtons[0]!);

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

    const organizationDropdowns = screen.getAllByLabelText("Organization");
    fireEvent.click(organizationDropdowns[0]!);

    const anotherOrgOptions = screen.getAllByText("Another Organization");
    fireEvent.click(anotherOrgOptions[0]!);

    expect(push).toHaveBeenCalledWith({
      page: 1,
      selectedTab: { name: ORG_REQUESTS_TAB_NAME, organizationId: 2 },
    });
  });

  test("<RequestsList /> filters by the default organization on the 'Organizational requests' tab", async () => {
    await renderComponent();

    const orgTabs = screen.getAllByRole("tab", {
      name: "Organizational requests",
    });
    fireEvent.click(orgTabs[0]!);

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

    const requestLinks = screen.getAllByRole("link", { name: "My request" });
    fireEvent.click(requestLinks[0]!);

    expect(locationAssignSpy).toHaveBeenCalledWith("/hc/requests/1");
  });
});
