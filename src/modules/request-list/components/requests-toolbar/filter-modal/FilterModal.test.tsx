jest.mock("../../../hooks/useUser");
jest.mock("../../../hooks/useOrganizations");
jest.mock("../../../hooks/useTicketFields");
jest.mock("../../../hooks/useRequests");
jest.mock("../../../hooks/useParams");

import type { FilterValuesMap } from "../../../data-types/FilterValue";
import { FilterModal } from "./FilterModal";
import "@testing-library/jest-dom";
import { fireEvent, screen, getAllByText } from "@testing-library/react";
import { useUser } from "../../../hooks/useUser";
import { useTicketFields } from "../../../hooks/useTicketFields";
import { useOrganizations } from "../../../hooks/useOrganizations";
import { useRequests } from "../../../hooks/useRequests";
import { organizations, requests, ticketFields, user } from "../../../apiMocks";
import { render } from "../../../../test/render";

const push = jest.fn();

jest.mock("../../../hooks/useParams", () => ({
  useParams: jest.fn(() => ({
    params: { page: 1, filters: {} },
    push,
  })),
}));

function renderComponent(
  onFiltersChanged: (filters: FilterValuesMap) => void = () => {}
) {
  render(
    <FilterModal
      onClose={() => {}}
      ticketFields={ticketFields}
      organizations={organizations}
      customStatusesEnabled={false}
      customStatusOptions={[]}
      filterValuesMap={{}}
      onFiltersChanged={onFiltersChanged}
    ></FilterModal>
  );
}

const onFiltersChanged = jest.fn();

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
  });
});

afterEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe("<FilterModal />", () => {
  test("can filter by status", async () => {
    await renderComponent(onFiltersChanged);

    fireEvent.click(screen.getByRole("combobox", { name: "Select filter" }));
    fireEvent.click(screen.getByRole("option", { name: "Status" }));
    fireEvent.click(screen.getByRole("combobox", { name: "Status" }));
    fireEvent.click(screen.getByRole("option", { name: "Open" }));
    fireEvent.click(screen.getByText("Apply filter"));

    expect(onFiltersChanged).toHaveBeenCalledWith({
      status: [":open :new :hold"],
    });
  });

  test("can filter by organizations", async () => {
    await renderComponent(onFiltersChanged);

    fireEvent.click(screen.getByRole("combobox", { name: "Select filter" }));
    fireEvent.click(screen.getByRole("option", { name: "Organization" }));
    fireEvent.click(screen.getByRole("combobox", { name: "Organization" }));
    fireEvent.click(screen.getByRole("option", { name: "My Organization" }));
    fireEvent.click(screen.getByText("Apply filter"));

    expect(onFiltersChanged).toHaveBeenCalledWith({
      organization: [":1"],
    });
  });

  test("calls onClose when cancel button is clicked", async () => {
    const onClose = jest.fn();
    render(
      <FilterModal
        onClose={onClose}
        ticketFields={ticketFields}
        organizations={organizations}
        customStatusesEnabled={true}
        customStatusOptions={[]}
        filterValuesMap={{}}
        onFiltersChanged={() => {}}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("calls onClose when close button is clicked", async () => {
    const onClose = jest.fn();
    render(
      <FilterModal
        onClose={onClose}
        ticketFields={ticketFields}
        organizations={organizations}
        customStatusesEnabled={true}
        customStatusOptions={[]}
        filterValuesMap={{}}
        onFiltersChanged={() => {}}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Close modal" }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  describe("displays an error", () => {
    test("if min value is greater than min max value in number filter", async () => {
      await renderComponent(onFiltersChanged);

      const filterTypeDropdown = screen.getByLabelText("Select filter", {
        selector: "input",
      });
      fireEvent.click(filterTypeDropdown);
      fireEvent.click(screen.getByRole("option", { name: "NumberField" }));

      const filterTypeSelect = screen.getByLabelText("Filter type", {
        selector: "input",
      });
      fireEvent.click(filterTypeSelect);
      fireEvent.click(screen.getByRole("option", { name: "Range" }));

      fireEvent.change(screen.getByLabelText("Min value"), {
        target: { value: "10" },
      });

      fireEvent.change(screen.getByLabelText("Max value"), {
        target: { value: "1" },
      });

      fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

      expect(
        screen.getByText("Select a value greater than min value")
      ).toBeInTheDocument();

      expect(onFiltersChanged).not.toHaveBeenCalled();
    });

    test("if no value is inserted for max value in number filter", async () => {
      await renderComponent(onFiltersChanged);

      const filterTypeDropdown = screen.getByLabelText("Select filter", {
        selector: "input",
      });
      fireEvent.click(filterTypeDropdown);
      fireEvent.click(screen.getByRole("option", { name: "NumberField" }));
      const filterTypeSelect = screen.getByLabelText("Filter type", {
        selector: "input",
      });
      fireEvent.click(filterTypeSelect);
      fireEvent.click(screen.getByRole("option", { name: "Range" }));

      fireEvent.change(screen.getByLabelText("Min value"), {
        target: { value: "42" },
      });

      fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

      expect(screen.getByLabelText("Max value")).toHaveAttribute(
        "aria-invalid",
        "true"
      );

      expect(screen.getByText("Insert a value")).toBeInTheDocument();

      expect(onFiltersChanged).not.toHaveBeenCalled();
    });

    test("if no value is inserted for exact value in number filter", async () => {
      await renderComponent(onFiltersChanged);

      const filterTypeDropdown = screen.getByLabelText("Select filter", {
        selector: "input",
      });
      fireEvent.click(filterTypeDropdown);
      fireEvent.click(screen.getByRole("option", { name: "NumberField" }));

      const filterTypeSelect = screen.getByLabelText("Filter type", {
        selector: "input",
      });
      fireEvent.click(filterTypeSelect);
      fireEvent.click(screen.getByRole("option", { name: "Exact match" }));
      fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

      expect(screen.getByText("Insert a value")).toBeInTheDocument();

      expect(onFiltersChanged).not.toHaveBeenCalled();
    });

    test("if no value is inserted for min value in number filter", async () => {
      await renderComponent(onFiltersChanged);

      const filterTypeDropdown = screen.getByLabelText("Select filter", {
        selector: "input",
      });
      fireEvent.click(filterTypeDropdown);
      fireEvent.click(screen.getByRole("option", { name: "NumberField" }));
      const filterTypeSelect = screen.getByLabelText("Filter type", {
        selector: "input",
      });
      fireEvent.click(filterTypeSelect);
      fireEvent.click(screen.getByRole("option", { name: "Range" }));

      fireEvent.change(screen.getByLabelText("Max value"), {
        target: { value: "42" },
      });

      fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

      expect(screen.getByLabelText("Min value")).toHaveAttribute(
        "aria-invalid",
        "true"
      );

      expect(screen.getByText("Insert a value")).toBeInTheDocument();

      expect(onFiltersChanged).not.toHaveBeenCalled();
    });

    test("if no value is selected for custom dates", async () => {
      await renderComponent(onFiltersChanged);

      const filterTypeDropdown = screen.getByLabelText("Select filter", {
        selector: "input",
      });
      fireEvent.click(filterTypeDropdown);
      fireEvent.click(screen.getByRole("option", { name: "DateField" }));

      fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

      expect(screen.getByText("Select a value")).toBeInTheDocument();

      expect(onFiltersChanged).not.toHaveBeenCalled();
    });

    test("if no value is selected for dropdown custom fields", async () => {
      await renderComponent(onFiltersChanged);

      const filterTypeDropdown = screen.getByLabelText("Select filter", {
        selector: "input",
      });
      fireEvent.click(filterTypeDropdown);

      const dropdownFieldItem = screen.getByText("DropdownFieldEndUser");
      fireEvent.click(dropdownFieldItem);

      fireEvent.click(screen.getByText("Apply filter"));

      const dropdownOptionsDropdown = screen.getByLabelText(
        "DropdownFieldEndUser",
        {
          selector: "div",
        }
      );
      expect(dropdownOptionsDropdown).toHaveAttribute("aria-invalid", "true");

      expect(screen.getByText("Select at least one value")).toBeInTheDocument();
      expect(onFiltersChanged).not.toHaveBeenCalled();
    });

    test("if no value is selected for multiselect custom fields", async () => {
      await renderComponent(onFiltersChanged);

      const filterTypeDropdown = screen.getByLabelText("Select filter", {
        selector: "input",
      });
      fireEvent.click(filterTypeDropdown);

      const dropdownFieldItem = screen.getByText("MultiselectFieldEndUser");
      fireEvent.click(dropdownFieldItem);

      fireEvent.click(screen.getByText("Apply filter"));

      const dropdownOptionsDropdown = screen.getByLabelText(
        "MultiselectFieldEndUser",
        {
          selector: "div",
        }
      );
      expect(dropdownOptionsDropdown).toHaveAttribute("aria-invalid", "true");

      expect(screen.getByText("Select at least one value")).toBeInTheDocument();

      expect(onFiltersChanged).not.toHaveBeenCalled();
    });

    test("if the format of the credit card filter is invalid", async () => {
      await renderComponent(onFiltersChanged);

      fireEvent.click(screen.getByRole("combobox", { name: "Select filter" }));
      fireEvent.click(screen.getByRole("option", { name: "CreditcardField" }));
      const filterTypeSelect = screen.getByLabelText("Filter type", {
        selector: "input",
      });
      fireEvent.click(filterTypeSelect);
      fireEvent.click(screen.getByRole("option", { name: "Exact match" }));

      const creditCardInput = screen.getByLabelText(
        "Enter the last four digits of the credit card"
      );

      fireEvent.change(creditCardInput, {
        target: { value: "abcd" },
      });

      fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

      expect(creditCardInput).toHaveAttribute("aria-invalid", "true");

      expect(
        screen.getByText(
          "Enter the last four digits of the credit card, using only numbers"
        )
      ).toBeInTheDocument();

      expect(onFiltersChanged).not.toHaveBeenCalled();
    });

    test("if no field is selected", async () => {
      await renderComponent(onFiltersChanged);

      fireEvent.click(screen.getByText("Apply filter"));

      expect(
        screen.getByLabelText("Select filter", { selector: "div" })
      ).toHaveAttribute("aria-invalid", "true");

      expect(screen.getByText("Select a filter")).toBeInTheDocument();

      expect(onFiltersChanged).not.toHaveBeenCalled();
    });

    test("can filter by checkbox field - Not selected", async () => {
      await renderComponent(onFiltersChanged);

      const filterTypeDropdown = screen.getByLabelText("Select filter", {
        selector: "input",
      });
      fireEvent.click(filterTypeDropdown);
      fireEvent.click(screen.getByRole("option", { name: "CheckboxField" }));
      const filterTypeSelect = screen.getByLabelText("Select CheckboxField", {
        selector: "input",
      });
      fireEvent.click(filterTypeSelect);
      fireEvent.click(screen.getByRole("option", { name: "Not selected" }));

      fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

      expect(onFiltersChanged).toHaveBeenCalledWith({
        custom_field_427: [":unchecked"],
      });
    });

    test("if no value is selected for checkbox custom field filter", async () => {
      await renderComponent(onFiltersChanged);

      const filterTypeDropdown = screen.getByLabelText("Select filter", {
        selector: "input",
      });
      fireEvent.click(filterTypeDropdown);
      fireEvent.click(screen.getByRole("option", { name: "CheckboxField" }));

      fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

      expect(screen.getByText("Select a value")).toBeInTheDocument();

      expect(onFiltersChanged).not.toHaveBeenCalled();
    });

    test("if decimal is entered in number custom fields - Exact match", async () => {
      await renderComponent(onFiltersChanged);

      const filterTypeDropdown = screen.getByLabelText("Select filter", {
        selector: "input",
      });
      fireEvent.click(filterTypeDropdown);
      fireEvent.click(screen.getByRole("option", { name: "NumberField" }));
      const filterTypeSelect = screen.getByLabelText("Filter type", {
        selector: "input",
      });
      fireEvent.click(filterTypeSelect);
      fireEvent.click(screen.getByRole("option", { name: "Exact match" }));

      fireEvent.change(screen.getByLabelText("Enter NumberField"), {
        target: { value: "42.12" },
      });

      fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

      expect(screen.getByText("Insert an integer value")).toBeInTheDocument();

      expect(onFiltersChanged).not.toHaveBeenCalled();
    });

    test("if decimal is entered in number custom fields - Range minValue", async () => {
      await renderComponent(onFiltersChanged);

      const filterTypeDropdown = screen.getByLabelText("Select filter", {
        selector: "input",
      });
      fireEvent.click(filterTypeDropdown);
      fireEvent.click(screen.getByRole("option", { name: "NumberField" }));
      const filterTypeSelect = screen.getByLabelText("Filter type", {
        selector: "input",
      });
      fireEvent.click(filterTypeSelect);
      fireEvent.click(screen.getByRole("option", { name: "Range" }));

      fireEvent.change(screen.getByLabelText("Min value"), {
        target: { value: "1.1" },
      });

      fireEvent.change(screen.getByLabelText("Max value"), {
        target: { value: "10" },
      });

      fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

      expect(screen.getByText("Insert an integer value")).toBeInTheDocument();

      expect(onFiltersChanged).not.toHaveBeenCalled();
    });

    test("if decimal is entered in number custom fields - Range maxValue", async () => {
      await renderComponent(onFiltersChanged);

      const filterTypeDropdown = screen.getByLabelText("Select filter", {
        selector: "input",
      });
      fireEvent.click(filterTypeDropdown);
      fireEvent.click(screen.getByRole("option", { name: "NumberField" }));
      const filterTypeSelect = screen.getByLabelText("Filter type", {
        selector: "input",
      });
      fireEvent.click(filterTypeSelect);
      fireEvent.click(screen.getByRole("option", { name: "Range" }));

      fireEvent.change(screen.getByLabelText("Min value"), {
        target: { value: "1" },
      });

      fireEvent.change(screen.getByLabelText("Max value"), {
        target: { value: "10.2" },
      });

      fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

      expect(screen.getByText("Insert an integer value")).toBeInTheDocument();

      expect(onFiltersChanged).not.toHaveBeenCalled();
    });

    test("if filter type is not selected for number custom field filter", async () => {
      await renderComponent(onFiltersChanged);

      const filterTypeDropdown = screen.getByLabelText("Select filter", {
        selector: "input",
      });
      fireEvent.click(filterTypeDropdown);
      fireEvent.click(screen.getByRole("option", { name: "NumberField" }));

      fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

      expect(screen.getByText("Select a filter type")).toBeInTheDocument();

      expect(onFiltersChanged).not.toHaveBeenCalled();
    });
  });

  describe("Date filters", () => {
    test.each([
      ["In the past day", ">2022-08-16"],
      ["In the past week", ">2022-08-10"],
      ["In the past month", ">2022-07-17"],
      ["In the past 3 months", ">2022-05-17"],
      ["In the past 6 months", ">2022-02-17"],
      ["In the past year", ">2021-08-17"],
    ])(
      "can filter by predefined date custom fields values - %s",
      async (buttonText, expectedFilter) => {
        jest.setSystemTime(new Date("2022-08-17"));

        await renderComponent(onFiltersChanged);

        const filterTypeDropdown = screen.getByLabelText("Select filter", {
          selector: "input",
        });
        fireEvent.click(filterTypeDropdown);
        fireEvent.click(screen.getByRole("option", { name: "DateField" }));
        const dateDropdown = screen.getByLabelText("DateField", {
          selector: "input",
        });
        fireEvent.click(dateDropdown);
        fireEvent.click(screen.getByRole("option", { name: buttonText }));
        fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

        expect(onFiltersChanged).toHaveBeenCalledWith({
          custom_field_422: [expectedFilter],
        });
      }
    );

    test("can filter by date custom fields - custom dates", async () => {
      jest.setSystemTime(new Date("2022-08-17"));

      await renderComponent(onFiltersChanged);

      const filterTypeDropdown = screen.getByLabelText("Select filter", {
        selector: "input",
      });
      fireEvent.click(filterTypeDropdown);
      fireEvent.click(screen.getByRole("option", { name: "DateField" }));
      const dateDropdown = screen.getByLabelText("DateField", {
        selector: "input",
      });
      fireEvent.click(dateDropdown);
      fireEvent.click(screen.getByRole("option", { name: "Custom" }));

      const startDateInput = screen.getByRole("textbox", { name: "Start" });
      const datepicker = startDateInput.closest(
        '[role="dialog"], .calendar-container, [data-calendar]'
      );
      const calendarItem_1 = getAllByText(datepicker as HTMLElement, "1")[0]!;
      const calendarItem_15 = getAllByText(datepicker as HTMLElement, "15")[0]!;

      fireEvent.click(calendarItem_1);

      fireEvent.click(calendarItem_15);

      fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

      expect(onFiltersChanged).toHaveBeenCalledWith({
        custom_field_422: [">=2022-08-01", "<=2022-08-15"],
      });
    });

    test("generates correct filter key for custom fields", async () => {
      await renderComponent(onFiltersChanged);

      fireEvent.click(screen.getByRole("combobox", { name: "Select filter" }));
      fireEvent.click(
        screen.getByRole("option", { name: "DropdownFieldEndUser" })
      );
      fireEvent.click(
        screen.getByRole("combobox", { name: "DropdownFieldEndUser" })
      );
      fireEvent.click(
        screen.getByRole("option", { name: "Dropdown Field Option #1" })
      );
      fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

      expect(onFiltersChanged).toHaveBeenCalledWith(
        expect.objectContaining({
          custom_field_420: expect.any(Array),
        })
      );
    });

    test("filter by created date", async () => {
      jest.setSystemTime(new Date("2024-02-29"));

      await renderComponent(onFiltersChanged);

      fireEvent.click(screen.getByRole("combobox", { name: "Select filter" }));
      fireEvent.click(screen.getByRole("option", { name: "Created date" }));
      fireEvent.click(
        screen.getByLabelText("Created date", { selector: "input" })
      );
      fireEvent.click(screen.getByRole("option", { name: "In the past year" }));
      fireEvent.click(screen.getByText("Apply filter"));

      expect(onFiltersChanged).toHaveBeenCalledWith({
        created_at: [">2023-02-28"],
      });
    });

    test("filter by updated date", async () => {
      jest.setSystemTime(new Date("2025-08-17"));

      await renderComponent(onFiltersChanged);

      fireEvent.click(screen.getByRole("combobox", { name: "Select filter" }));
      fireEvent.click(screen.getByRole("option", { name: "Updated date" }));
      fireEvent.click(
        screen.getByLabelText("Updated date", { selector: "input" })
      );
      fireEvent.click(screen.getByRole("option", { name: "In the past week" }));
      fireEvent.click(screen.getByText("Apply filter"));

      expect(onFiltersChanged).toHaveBeenCalledWith({
        updated_at: [">2025-08-10"],
      });
    });

    test("filter by custom created date", async () => {
      jest.setSystemTime(new Date("2025-08-17"));

      await renderComponent(onFiltersChanged);

      fireEvent.click(screen.getByRole("combobox", { name: "Select filter" }));
      fireEvent.click(screen.getByRole("option", { name: "Created date" }));
      fireEvent.click(
        screen.getByLabelText("Created date", { selector: "input" })
      );
      fireEvent.click(screen.getByRole("option", { name: "Custom" }));

      fireEvent.click(screen.getByText("Start"));
      const startDateInput = screen.getByRole("textbox", { name: "Start" });
      const datepicker =
        startDateInput.closest(
          '[role="dialog"], .calendar-container, [data-calendar]'
        ) || startDateInput.parentElement?.parentElement;
      const calendarItem_1_Aug = getAllByText(
        datepicker as HTMLElement,
        "1"
      )[0]!;
      const calendarItem_2_Aug = getAllByText(
        datepicker as HTMLElement,
        "2"
      )[0]!;

      fireEvent.click(calendarItem_1_Aug);
      fireEvent.click(calendarItem_2_Aug);

      fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

      expect(onFiltersChanged).toHaveBeenCalledWith({
        created_at: [">=2025-08-01", "<=2025-08-02"],
      });
    });

    test("filter by custom updated date", async () => {
      jest.setSystemTime(new Date("2025-08-17"));

      await renderComponent(onFiltersChanged);

      fireEvent.click(screen.getByRole("combobox", { name: "Select filter" }));
      fireEvent.click(screen.getByRole("option", { name: "Updated date" }));
      fireEvent.click(screen.getByRole("textbox"));
      fireEvent.click(screen.getByRole("option", { name: "Custom" }));

      fireEvent.click(screen.getByText("Start"));
      const startDateInput = screen.getByRole("textbox", { name: "Start" });
      const datepicker =
        startDateInput.closest(
          '[role="dialog"], .calendar-container, [data-calendar]'
        ) || startDateInput.parentElement?.parentElement;

      const calendarItem_1_Aug = getAllByText(
        datepicker as HTMLElement,
        "1"
      )[0]!;
      const calendarItem_2_Aug = getAllByText(
        datepicker as HTMLElement,
        "2"
      )[0]!;

      fireEvent.click(calendarItem_1_Aug);
      fireEvent.click(calendarItem_2_Aug);

      fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

      expect(onFiltersChanged).toHaveBeenCalledWith({
        updated_at: [">=2025-08-01", "<=2025-08-02"],
      });
    });

    test("can filter by date custom fields - custom dates", async () => {
      jest.setSystemTime(new Date("2022-08-17"));

      await renderComponent(onFiltersChanged);

      fireEvent.click(screen.getByRole("combobox", { name: "Select filter" }));
      fireEvent.click(screen.getByRole("option", { name: "DateField" }));
      fireEvent.click(screen.getByRole("textbox", { name: "DateField" }));
      fireEvent.click(screen.getByRole("option", { name: "Custom" }));

      const startDateInput = screen.getByRole("textbox", { name: "Start" });
      const datepicker =
        startDateInput.closest(
          '[role="dialog"], .calendar-container, [data-calendar]'
        ) || startDateInput.parentElement?.parentElement;
      const calendarItem_1 = getAllByText(datepicker as HTMLElement, "1")[0]!;
      const calendarItem_15 = getAllByText(datepicker as HTMLElement, "15")[0]!;

      fireEvent.click(calendarItem_1);
      fireEvent.click(calendarItem_15);

      fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

      expect(onFiltersChanged).toHaveBeenCalledWith({
        custom_field_422: [">=2022-08-01", "<=2022-08-15"],
      });
    });

    test("can filter by date custom fields - future dates", async () => {
      jest.setSystemTime(new Date("2022-08-17"));

      await renderComponent(onFiltersChanged);

      fireEvent.click(screen.getByRole("combobox", { name: "Select filter" }));
      fireEvent.click(screen.getByRole("option", { name: "DateField" }));
      fireEvent.click(screen.getByRole("textbox", { name: "DateField" }));
      fireEvent.click(screen.getByRole("option", { name: "Custom" }));

      const startDateInput = screen.getByRole("textbox", { name: "Start" });
      const datepicker =
        startDateInput.closest(
          '[role="dialog"], .calendar-container, [data-calendar]'
        ) || startDateInput.parentElement?.parentElement;
      const calendarItem_19 = getAllByText(datepicker as HTMLElement, "19")[0]!;
      const calendarItem_21 = getAllByText(datepicker as HTMLElement, "21")[0]!;

      fireEvent.click(calendarItem_19);
      fireEvent.click(calendarItem_21);

      fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

      expect(onFiltersChanged).toHaveBeenCalledWith({
        custom_field_422: [">=2022-08-19", "<=2022-08-21"],
      });
    });
  });

  test("can filter by decimal custom fields - Range", async () => {
    await renderComponent(onFiltersChanged);

    const filterTypeDropdown = screen.getByLabelText("Select filter", {
      selector: "input",
    });
    fireEvent.click(filterTypeDropdown);
    fireEvent.click(screen.getByRole("option", { name: "DecimalField" }));
    const filterTypeSelect = screen.getByLabelText("Filter type", {
      selector: "input",
    });
    fireEvent.click(filterTypeSelect);
    fireEvent.click(screen.getByRole("option", { name: "Range" }));

    fireEvent.change(screen.getByLabelText("Min value"), {
      target: { value: "1.2" },
    });

    fireEvent.change(screen.getByLabelText("Max value"), {
      target: { value: "1.45" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

    expect(onFiltersChanged).toHaveBeenCalledWith({
      custom_field_429: [">=1.2", "<=1.45"],
    });
  });

  test("preserves existing filters when adding new filter", async () => {
    const existingFilters: FilterValuesMap = { status: [":open"] };

    render(
      <FilterModal
        onClose={() => {}}
        ticketFields={ticketFields}
        organizations={organizations}
        customStatusesEnabled={true}
        customStatusOptions={[]}
        filterValuesMap={existingFilters}
        onFiltersChanged={onFiltersChanged}
      />
    );

    fireEvent.click(screen.getByRole("combobox", { name: "Select filter" }));
    fireEvent.click(screen.getByRole("option", { name: "Organization" }));
    fireEvent.click(screen.getByRole("combobox", { name: "Organization" }));
    fireEvent.click(screen.getByRole("option", { name: "My Organization" }));
    fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

    expect(onFiltersChanged).toHaveBeenCalledWith(
      expect.objectContaining({
        status: [":open"],
        organization: expect.any(Array),
      })
    );
  });

  test("can filter by dropdown custom fields", async () => {
    await renderComponent(onFiltersChanged);

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

    fireEvent.click(screen.getByText("Dropdown Field Option #1"));
    fireEvent.click(screen.getByText("Apply filter"));

    expect(onFiltersChanged).toHaveBeenCalledWith({
      custom_field_420: [":first"],
    });
  });

  test("can filter by multiselect custom fields", async () => {
    await renderComponent(onFiltersChanged);

    const filterTypeDropdown = screen.getByLabelText("Select filter", {
      selector: "input",
    });
    fireEvent.click(filterTypeDropdown);
    fireEvent.click(
      screen.getByRole("option", { name: "MultiselectFieldEndUser" })
    );
    const dateDropdown = screen.getByLabelText("MultiselectFieldEndUser", {
      selector: "input",
    });
    fireEvent.click(dateDropdown);
    fireEvent.click(
      screen.getByRole("option", { name: "Multiselect Field Option #1" })
    );
    fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

    expect(onFiltersChanged).toHaveBeenCalledWith({
      custom_field_421: [":first"],
    });
  });

  test("can filter by text custom fields", async () => {
    await renderComponent(onFiltersChanged);

    const filterTypeDropdown = screen.getByLabelText("Select filter", {
      selector: "input",
    });
    fireEvent.click(filterTypeDropdown);
    fireEvent.click(screen.getByRole("option", { name: "MultilineField" }));
    const filterTypeSelect = screen.getByLabelText("Filter type", {
      selector: "input",
    });
    fireEvent.click(filterTypeSelect);
    fireEvent.click(screen.getByRole("option", { name: "Exact match" }));

    const inputText = screen.getByLabelText("Enter MultilineField", {
      selector: "input",
    });
    fireEvent.change(inputText, { target: { value: "test" } });

    fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

    expect(onFiltersChanged).toHaveBeenCalledWith({
      custom_field_426: [`:"test"`],
    });
  });

  test("can filter by text custom fields using a multi word phrase", async () => {
    await renderComponent(onFiltersChanged);

    const filterTypeDropdown = screen.getByLabelText("Select filter", {
      selector: "input",
    });
    fireEvent.click(filterTypeDropdown);
    fireEvent.click(screen.getByRole("option", { name: "MultilineField" }));
    const filterTypeSelect = screen.getByLabelText("Filter type", {
      selector: "input",
    });
    fireEvent.click(filterTypeSelect);
    fireEvent.click(screen.getByRole("option", { name: "Exact match" }));

    const inputText = screen.getByLabelText("Enter MultilineField", {
      selector: "input",
    });
    fireEvent.change(inputText, { target: { value: "Phrase with spaces" } });

    fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

    expect(onFiltersChanged).toHaveBeenCalledWith({
      custom_field_426: [`:"Phrase with spaces"`],
    });
  });

  test("can filter by text custom fields - any value", async () => {
    await renderComponent(onFiltersChanged);

    const filterTypeDropdown = screen.getByLabelText("Select filter", {
      selector: "input",
    });
    fireEvent.click(filterTypeDropdown);
    fireEvent.click(screen.getByRole("option", { name: "MultilineField" }));
    const filterTypeSelect = screen.getByLabelText("Filter type", {
      selector: "input",
    });
    fireEvent.click(filterTypeSelect);
    fireEvent.click(screen.getByRole("option", { name: "Any value" }));

    fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

    expect(onFiltersChanged).toHaveBeenCalledWith({
      custom_field_426: [":*"],
    });
  });

  test("displays an error if no filter type is selected for text custom field", async () => {
    await renderComponent(onFiltersChanged);

    const filterTypeDropdown = screen.getByLabelText("Select filter", {
      selector: "input",
    });
    fireEvent.click(filterTypeDropdown);
    fireEvent.click(screen.getByRole("option", { name: "MultilineField" }));

    fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

    expect(screen.getByText("Select a filter type")).toBeInTheDocument();

    expect(onFiltersChanged).not.toHaveBeenCalled();
  });

  test("can filter by regexp custom fields - Exact match", async () => {
    await renderComponent(onFiltersChanged);

    const filterTypeDropdown = screen.getByLabelText("Select filter", {
      selector: "input",
    });
    fireEvent.click(filterTypeDropdown);
    fireEvent.click(screen.getByRole("option", { name: "RegexpField" }));
    const filterTypeSelect = screen.getByLabelText("Filter type", {
      selector: "input",
    });
    fireEvent.click(filterTypeSelect);
    fireEvent.click(screen.getByRole("option", { name: "Exact match" }));

    const inputText = screen.getByLabelText("Enter RegexpField", {
      selector: "input",
    });
    fireEvent.change(inputText, { target: { value: "test" } });

    fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

    expect(onFiltersChanged).toHaveBeenCalledWith({
      custom_field_430: [`:"test"`],
    });
  });

  test("can filter by regexp custom fields - any value", async () => {
    await renderComponent(onFiltersChanged);

    const filterTypeDropdown = screen.getByLabelText("Select filter", {
      selector: "input",
    });
    fireEvent.click(filterTypeDropdown);
    fireEvent.click(screen.getByRole("option", { name: "RegexpField" }));
    const filterTypeSelect = screen.getByLabelText("Filter type", {
      selector: "input",
    });
    fireEvent.click(filterTypeSelect);
    fireEvent.click(screen.getByRole("option", { name: "Any value" }));

    fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

    expect(onFiltersChanged).toHaveBeenCalledWith({
      custom_field_430: [":*"],
    });
  });

  test("displays an error if no filter type is selected for regexp custom field", async () => {
    await renderComponent(onFiltersChanged);

    const filterTypeDropdown = screen.getByLabelText("Select filter", {
      selector: "input",
    });
    fireEvent.click(filterTypeDropdown);
    fireEvent.click(screen.getByRole("option", { name: "RegexpField" }));

    fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

    expect(screen.getByText("Select a filter type")).toBeInTheDocument();

    expect(onFiltersChanged).not.toHaveBeenCalled();
  });

  test("displays an error if no value is inserted for text custom field", async () => {
    await renderComponent(onFiltersChanged);

    const filterTypeDropdown = screen.getByLabelText("Select filter", {
      selector: "input",
    });
    fireEvent.click(filterTypeDropdown);
    fireEvent.click(screen.getByRole("option", { name: "MultilineField" }));

    const filterTypeSelect = screen.getByLabelText("Filter type", {
      selector: "input",
    });
    fireEvent.click(filterTypeSelect);
    fireEvent.click(screen.getByRole("option", { name: "Exact match" }));

    fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

    expect(screen.getByText("Insert a value")).toBeInTheDocument();

    expect(onFiltersChanged).not.toHaveBeenCalled();
  });

  test("can filter by number custom fields - Any value", async () => {
    await renderComponent(onFiltersChanged);

    const filterTypeDropdown = screen.getByLabelText("Select filter", {
      selector: "input",
    });
    fireEvent.click(filterTypeDropdown);
    fireEvent.click(screen.getByRole("option", { name: "NumberField" }));
    const filterTypeSelect = screen.getByLabelText("Filter type", {
      selector: "input",
    });
    fireEvent.click(filterTypeSelect);
    fireEvent.click(screen.getByRole("option", { name: "Any value" }));

    fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

    expect(onFiltersChanged).toHaveBeenCalledWith({
      custom_field_428: [":*"],
    });
  });

  test("can filter by number custom fields - Range", async () => {
    await renderComponent(onFiltersChanged);

    const filterTypeDropdown = screen.getByLabelText("Select filter", {
      selector: "input",
    });
    fireEvent.click(filterTypeDropdown);
    fireEvent.click(screen.getByRole("option", { name: "NumberField" }));
    const filterTypeSelect = screen.getByLabelText("Filter type", {
      selector: "input",
    });
    fireEvent.click(filterTypeSelect);
    fireEvent.click(screen.getByRole("option", { name: "Range" }));

    fireEvent.change(screen.getByLabelText("Min value"), {
      target: { value: "1" },
    });

    fireEvent.change(screen.getByLabelText("Max value"), {
      target: { value: "10" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

    expect(onFiltersChanged).toHaveBeenCalledWith({
      custom_field_428: [">=1", "<=10"],
    });
  });

  test("can filter by number custom fields - Exact match", async () => {
    await renderComponent(onFiltersChanged);

    const filterTypeDropdown = screen.getByLabelText("Select filter", {
      selector: "input",
    });
    fireEvent.click(filterTypeDropdown);
    fireEvent.click(screen.getByRole("option", { name: "NumberField" }));
    const filterTypeSelect = screen.getByLabelText("Filter type", {
      selector: "input",
    });
    fireEvent.click(filterTypeSelect);
    fireEvent.click(screen.getByRole("option", { name: "Exact match" }));

    fireEvent.change(screen.getByLabelText("Enter NumberField"), {
      target: { value: "42" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

    expect(onFiltersChanged).toHaveBeenCalledWith({
      custom_field_428: [":42"],
    });
  });

  test("can filter by checkbox field - Selected", async () => {
    await renderComponent(onFiltersChanged);

    const filterTypeDropdown = screen.getByLabelText("Select filter", {
      selector: "input",
    });
    fireEvent.click(filterTypeDropdown);
    fireEvent.click(screen.getByRole("option", { name: "CheckboxField" }));
    const filterTypeSelect = screen.getByLabelText("Select CheckboxField", {
      selector: "input",
    });
    fireEvent.click(filterTypeSelect);
    fireEvent.click(screen.getByRole("option", { name: "Selected" }));

    fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

    expect(onFiltersChanged).toHaveBeenCalledWith({
      custom_field_427: [":checked"],
    });
  });

  test("can filter by credit card custom fields - Last 4 digits", async () => {
    await renderComponent(onFiltersChanged);

    const filterTypeDropdown = screen.getByLabelText("Select filter", {
      selector: "input",
    });
    fireEvent.click(filterTypeDropdown);
    fireEvent.click(screen.getByRole("option", { name: "CreditcardField" }));
    const filterTypeSelect = screen.getByLabelText("Filter type", {
      selector: "input",
    });
    fireEvent.click(filterTypeSelect);
    fireEvent.click(screen.getByRole("option", { name: "Exact match" }));

    fireEvent.change(
      screen.getByLabelText("Enter the last four digits of the credit card"),
      {
        target: { value: "1234" },
      }
    );

    fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

    expect(onFiltersChanged).toHaveBeenCalledWith({
      custom_field_431: [":*1234"],
    });
  });

  test("can filter by credit card custom fields - Any value", async () => {
    await renderComponent(onFiltersChanged);

    const filterTypeDropdown = screen.getByLabelText("Select filter", {
      selector: "input",
    });
    fireEvent.click(filterTypeDropdown);
    fireEvent.click(screen.getByRole("option", { name: "CreditcardField" }));
    const filterTypeSelect = screen.getByLabelText("Filter type", {
      selector: "input",
    });
    fireEvent.click(filterTypeSelect);
    fireEvent.click(screen.getByRole("option", { name: "Any value" }));

    fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

    expect(onFiltersChanged).toHaveBeenCalledWith({
      custom_field_431: [":*"],
    });
  });

  test("displays an error if the format of the credit card filter is invalid", async () => {
    await renderComponent(onFiltersChanged);

    const filterTypeDropdown = screen.getByLabelText("Select filter", {
      selector: "input",
    });
    fireEvent.click(filterTypeDropdown);
    fireEvent.click(screen.getByRole("option", { name: "CreditcardField" }));
    const filterTypeSelect = screen.getByLabelText("Filter type", {
      selector: "input",
    });
    fireEvent.click(filterTypeSelect);
    fireEvent.click(screen.getByRole("option", { name: "Exact match" }));

    const creditCardInput = screen.getByLabelText(
      "Enter the last four digits of the credit card"
    );

    fireEvent.change(creditCardInput, {
      target: { value: "abcd" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

    expect(creditCardInput).toHaveAttribute("aria-invalid", "true");

    expect(
      screen.getByText(
        "Enter the last four digits of the credit card, using only numbers"
      )
    );

    expect(onFiltersChanged).not.toHaveBeenCalled();
  });
});
