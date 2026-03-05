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

    const filterDropdowns = screen.getAllByLabelText("Select filter");
    fireEvent.click(filterDropdowns[0]!);

    const statusOptions = screen.getAllByText("Status");
    fireEvent.click(statusOptions[0]!);

    const statusDropdowns = screen.getAllByLabelText("Status");
    fireEvent.click(statusDropdowns[0]!);

    const openOptions = screen.getAllByText("Open");
    fireEvent.click(openOptions[0]!);

    fireEvent.click(screen.getByText("Apply filter"));

    expect(onFiltersChanged).toHaveBeenCalledWith({
      status: [":open :new :hold"],
    });
  });

  test("can filter by organizations", async () => {
    await renderComponent(onFiltersChanged);

    const filterDropdowns = screen.getAllByLabelText("Select filter");
    fireEvent.click(filterDropdowns[0]!);

    const organizationOptions = screen.getAllByText("Organization");
    fireEvent.click(organizationOptions[0]!);

    const orgDropdowns = screen.getAllByLabelText("Organization");
    fireEvent.click(orgDropdowns[0]!);

    const myOrgOptions = screen.getAllByText("My Organization");
    fireEvent.click(myOrgOptions[0]!);

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

      const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
      fireEvent.click(filterTypeDropdowns[0]!);

      const numberFieldOptions = screen.getAllByText("NumberField");
      fireEvent.click(numberFieldOptions[0]!);

      const filterTypeSelects = screen.getAllByLabelText("Filter type");
      fireEvent.click(filterTypeSelects[0]!);

      const rangeOptions = screen.getAllByText("Range");
      fireEvent.click(rangeOptions[0]!);

      const minValueInputs = screen.getAllByLabelText("Min value");
      fireEvent.change(minValueInputs[0]!, {
        target: { value: "10" },
      });

      const maxValueInputs = screen.getAllByLabelText("Max value");
      fireEvent.change(maxValueInputs[0]!, {
        target: { value: "1" },
      });

      const applyButtons = screen.getAllByRole("button", {
        name: "Apply filter",
      });
      fireEvent.click(applyButtons[0]!);

      expect(
        screen.getByText("Select a value greater than min value")
      ).toBeInTheDocument();

      expect(onFiltersChanged).not.toHaveBeenCalled();
    });

    test("if no value is inserted for max value in number filter", async () => {
      await renderComponent(onFiltersChanged);

      const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
      fireEvent.click(filterTypeDropdowns[0]!);

      const numberFieldOptions = screen.getAllByText("NumberField");
      fireEvent.click(numberFieldOptions[0]!);

      const filterTypeSelects = screen.getAllByLabelText("Filter type");
      fireEvent.click(filterTypeSelects[0]!);

      const rangeOptions = screen.getAllByText("Range");
      fireEvent.click(rangeOptions[0]!);

      const minValueInputs = screen.getAllByLabelText("Min value");
      fireEvent.change(minValueInputs[0]!, {
        target: { value: "42" },
      });

      const applyButtons = screen.getAllByRole("button", {
        name: "Apply filter",
      });
      fireEvent.click(applyButtons[0]!);

      const maxValueInputs = screen.getAllByLabelText("Max value");
      expect(maxValueInputs[0]!).toHaveAttribute("aria-invalid", "true");

      expect(screen.getByText("Insert a value")).toBeInTheDocument();

      expect(onFiltersChanged).not.toHaveBeenCalled();
    });

    test("if no value is inserted for exact value in number filter", async () => {
      await renderComponent(onFiltersChanged);

      const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
      fireEvent.click(filterTypeDropdowns[0]!);

      const numberFieldOptions = screen.getAllByText("NumberField");
      fireEvent.click(numberFieldOptions[0]!);

      const filterTypeSelects = screen.getAllByLabelText("Filter type");
      fireEvent.click(filterTypeSelects[0]!);

      const exactMatchOptions = screen.getAllByText("Exact match");
      fireEvent.click(exactMatchOptions[0]!);

      const applyButtons = screen.getAllByRole("button", {
        name: "Apply filter",
      });
      fireEvent.click(applyButtons[0]!);

      expect(screen.getByText("Insert a value")).toBeInTheDocument();

      expect(onFiltersChanged).not.toHaveBeenCalled();
    });

    test("if no value is inserted for min value in number filter", async () => {
      await renderComponent(onFiltersChanged);

      const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
      fireEvent.click(filterTypeDropdowns[0]!);

      const numberFieldOptions = screen.getAllByText("NumberField");
      fireEvent.click(numberFieldOptions[0]!);

      const filterTypeSelects = screen.getAllByLabelText("Filter type");
      fireEvent.click(filterTypeSelects[0]!);

      const rangeOptions = screen.getAllByText("Range");
      fireEvent.click(rangeOptions[0]!);

      const maxValueInputs = screen.getAllByLabelText("Max value");
      fireEvent.change(maxValueInputs[0]!, {
        target: { value: "42" },
      });

      const applyButtons = screen.getAllByRole("button", {
        name: "Apply filter",
      });
      fireEvent.click(applyButtons[0]!);

      const minValueInputs = screen.getAllByLabelText("Min value");
      expect(minValueInputs[0]!).toHaveAttribute("aria-invalid", "true");

      expect(screen.getByText("Insert a value")).toBeInTheDocument();

      expect(onFiltersChanged).not.toHaveBeenCalled();
    });

    test("if no value is selected for custom dates", async () => {
      await renderComponent(onFiltersChanged);

      const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
      fireEvent.click(filterTypeDropdowns[0]!);

      const dateFieldOptions = screen.getAllByText("DateField");
      fireEvent.click(dateFieldOptions[0]!);

      const applyButtons = screen.getAllByRole("button", {
        name: "Apply filter",
      });
      fireEvent.click(applyButtons[0]!);

      expect(screen.getByText("Select a value")).toBeInTheDocument();

      expect(onFiltersChanged).not.toHaveBeenCalled();
    });

    test("if no value is selected for dropdown custom fields", async () => {
      await renderComponent(onFiltersChanged);

      const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
      fireEvent.click(filterTypeDropdowns[0]!);

      const dropdownFieldItems = screen.getAllByText("DropdownFieldEndUser");
      fireEvent.click(dropdownFieldItems[0]!);

      const applyButtons = screen.getAllByText("Apply filter");
      fireEvent.click(applyButtons[0]!);

      const dropdownOptionsDropdowns = screen.getAllByLabelText(
        "DropdownFieldEndUser"
      );
      expect(dropdownOptionsDropdowns[0]!).toHaveAttribute(
        "aria-invalid",
        "true"
      );

      expect(screen.getByText("Select at least one value")).toBeInTheDocument();
      expect(onFiltersChanged).not.toHaveBeenCalled();
    });

    test("if no value is selected for multiselect custom fields", async () => {
      await renderComponent(onFiltersChanged);

      const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
      fireEvent.click(filterTypeDropdowns[0]!);

      const multiselectFieldItems = screen.getAllByText(
        "MultiselectFieldEndUser"
      );
      fireEvent.click(multiselectFieldItems[0]!);

      const applyButtons = screen.getAllByText("Apply filter");
      fireEvent.click(applyButtons[0]!);

      const multiselectOptionsDropdowns = screen.getAllByLabelText(
        "MultiselectFieldEndUser"
      );
      expect(multiselectOptionsDropdowns[0]!).toHaveAttribute(
        "aria-invalid",
        "true"
      );

      expect(screen.getByText("Select at least one value")).toBeInTheDocument();

      expect(onFiltersChanged).not.toHaveBeenCalled();
    });

    test("if the format of the credit card filter is invalid", async () => {
      await renderComponent(onFiltersChanged);

      const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
      fireEvent.click(filterTypeDropdowns[0]!);

      const creditcardFieldOptions = screen.getAllByText("CreditcardField");
      fireEvent.click(creditcardFieldOptions[0]!);

      const filterTypeSelects = screen.getAllByLabelText("Filter type");
      fireEvent.click(filterTypeSelects[0]!);

      const exactMatchOptions = screen.getAllByText("Exact match");
      fireEvent.click(exactMatchOptions[0]!);

      const creditCardInputs = screen.getAllByLabelText(
        "Enter the last four digits of the credit card"
      );

      fireEvent.change(creditCardInputs[0]!, {
        target: { value: "abcd" },
      });

      const applyButtons = screen.getAllByRole("button", {
        name: "Apply filter",
      });
      fireEvent.click(applyButtons[0]!);

      expect(creditCardInputs[0]!).toHaveAttribute("aria-invalid", "true");

      expect(
        screen.getByText(
          "Enter the last four digits of the credit card, using only numbers"
        )
      ).toBeInTheDocument();

      expect(onFiltersChanged).not.toHaveBeenCalled();
    });

    test("if no field is selected", async () => {
      await renderComponent(onFiltersChanged);

      const applyButtons = screen.getAllByText("Apply filter");
      fireEvent.click(applyButtons[0]!);

      const filterInputs = screen.getAllByLabelText("Select filter");
      expect(filterInputs[0]!).toHaveAttribute("aria-invalid", "true");

      expect(screen.getByText("Select a filter")).toBeInTheDocument();

      expect(onFiltersChanged).not.toHaveBeenCalled();
    });

    test("can filter by checkbox field - Not selected", async () => {
      await renderComponent(onFiltersChanged);

      const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
      fireEvent.click(filterTypeDropdowns[0]!);

      const checkboxFieldOptions = screen.getAllByText("CheckboxField");
      fireEvent.click(checkboxFieldOptions[0]!);

      const checkboxSelects = screen.getAllByLabelText("Select CheckboxField");
      fireEvent.click(checkboxSelects[0]!);

      const notSelectedOptions = screen.getAllByText("Not selected");
      fireEvent.click(notSelectedOptions[0]!);

      const applyButtons = screen.getAllByRole("button", {
        name: "Apply filter",
      });
      fireEvent.click(applyButtons[0]!);

      expect(onFiltersChanged).toHaveBeenCalledWith({
        custom_field_427: [":unchecked"],
      });
    });

    test("if no value is selected for checkbox custom field filter", async () => {
      await renderComponent(onFiltersChanged);

      const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
      fireEvent.click(filterTypeDropdowns[0]!);

      const checkboxFieldOptions = screen.getAllByText("CheckboxField");
      fireEvent.click(checkboxFieldOptions[0]!);

      const applyButtons = screen.getAllByRole("button", {
        name: "Apply filter",
      });
      fireEvent.click(applyButtons[0]!);

      expect(screen.getByText("Select a value")).toBeInTheDocument();

      expect(onFiltersChanged).not.toHaveBeenCalled();
    });

    test("if decimal is entered in number custom fields - Exact match", async () => {
      await renderComponent(onFiltersChanged);

      const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
      fireEvent.click(filterTypeDropdowns[0]!);

      const numberFieldOptions = screen.getAllByText("NumberField");
      fireEvent.click(numberFieldOptions[0]!);

      const filterTypeSelects = screen.getAllByLabelText("Filter type");
      fireEvent.click(filterTypeSelects[0]!);

      const exactMatchOptions = screen.getAllByText("Exact match");
      fireEvent.click(exactMatchOptions[0]!);

      const numberFieldInputs = screen.getAllByLabelText("Enter NumberField");
      fireEvent.change(numberFieldInputs[0]!, {
        target: { value: "42.12" },
      });

      const applyButtons = screen.getAllByRole("button", {
        name: "Apply filter",
      });
      fireEvent.click(applyButtons[0]!);

      expect(screen.getByText("Insert an integer value")).toBeInTheDocument();

      expect(onFiltersChanged).not.toHaveBeenCalled();
    });

    test("if decimal is entered in number custom fields - Range minValue", async () => {
      await renderComponent(onFiltersChanged);

      const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
      fireEvent.click(filterTypeDropdowns[0]!);

      const numberFieldOptions = screen.getAllByText("NumberField");
      fireEvent.click(numberFieldOptions[0]!);

      const filterTypeSelects = screen.getAllByLabelText("Filter type");
      fireEvent.click(filterTypeSelects[0]!);

      const rangeOptions = screen.getAllByText("Range");
      fireEvent.click(rangeOptions[0]!);

      const minValueInputs = screen.getAllByLabelText("Min value");
      fireEvent.change(minValueInputs[0]!, {
        target: { value: "1.1" },
      });

      const maxValueInputs = screen.getAllByLabelText("Max value");
      fireEvent.change(maxValueInputs[0]!, {
        target: { value: "10" },
      });

      const applyButtons = screen.getAllByRole("button", {
        name: "Apply filter",
      });
      fireEvent.click(applyButtons[0]!);

      expect(screen.getByText("Insert an integer value")).toBeInTheDocument();

      expect(onFiltersChanged).not.toHaveBeenCalled();
    });

    test("if decimal is entered in number custom fields - Range maxValue", async () => {
      await renderComponent(onFiltersChanged);

      const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
      fireEvent.click(filterTypeDropdowns[0]!);

      const numberFieldOptions = screen.getAllByText("NumberField");
      fireEvent.click(numberFieldOptions[0]!);

      const filterTypeSelects = screen.getAllByLabelText("Filter type");
      fireEvent.click(filterTypeSelects[0]!);

      const rangeOptions = screen.getAllByText("Range");
      fireEvent.click(rangeOptions[0]!);

      const minValueInputs = screen.getAllByLabelText("Min value");
      fireEvent.change(minValueInputs[0]!, {
        target: { value: "1" },
      });

      const maxValueInputs = screen.getAllByLabelText("Max value");
      fireEvent.change(maxValueInputs[0]!, {
        target: { value: "10.2" },
      });

      const applyButtons = screen.getAllByRole("button", {
        name: "Apply filter",
      });
      fireEvent.click(applyButtons[0]!);

      expect(screen.getByText("Insert an integer value")).toBeInTheDocument();

      expect(onFiltersChanged).not.toHaveBeenCalled();
    });

    test("if filter type is not selected for number custom field filter", async () => {
      await renderComponent(onFiltersChanged);

      const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
      fireEvent.click(filterTypeDropdowns[0]!);

      const numberFieldOptions = screen.getAllByText("NumberField");
      fireEvent.click(numberFieldOptions[0]!);

      const applyButtons = screen.getAllByRole("button", {
        name: "Apply filter",
      });
      fireEvent.click(applyButtons[0]!);

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

        const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
        fireEvent.click(filterTypeDropdowns[0]!);

        const dateFieldOptions = screen.getAllByText("DateField");
        fireEvent.click(dateFieldOptions[0]!);

        const dateDropdowns = screen.getAllByLabelText("DateField");
        fireEvent.click(dateDropdowns[0]!);

        const buttonOptions = screen.getAllByText(buttonText);
        fireEvent.click(buttonOptions[0]!);

        const applyButtons = screen.getAllByRole("button", {
          name: "Apply filter",
        });
        fireEvent.click(applyButtons[0]!);

        expect(onFiltersChanged).toHaveBeenCalledWith({
          custom_field_422: [expectedFilter],
        });
      }
    );

    test("can filter by date custom fields - custom dates", async () => {
      jest.setSystemTime(new Date("2022-08-17"));

      await renderComponent(onFiltersChanged);

      const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
      fireEvent.click(filterTypeDropdowns[0]!);

      const dateFieldOptions = screen.getAllByText("DateField");
      fireEvent.click(dateFieldOptions[0]!);

      const dateDropdowns = screen.getAllByLabelText("DateField");
      fireEvent.click(dateDropdowns[0]!);

      const customOptions = screen.getAllByText("Custom");
      fireEvent.click(customOptions[0]!);

      const startDateInputs = screen.getAllByRole("textbox", { name: "Start" });
      const startDateInput = startDateInputs[0]!;

      const datepicker = startDateInput.closest(
        '[role="dialog"], .calendar-container, [data-calendar]'
      );
      const calendarItem_1 = getAllByText(datepicker as HTMLElement, "1")[0]!;
      const calendarItem_15 = getAllByText(datepicker as HTMLElement, "15")[0]!;

      fireEvent.click(calendarItem_1);
      fireEvent.click(calendarItem_15);

      const applyButtons = screen.getAllByRole("button", {
        name: "Apply filter",
      });
      fireEvent.click(applyButtons[0]!);

      expect(onFiltersChanged).toHaveBeenCalledWith({
        custom_field_422: [">=2022-08-01", "<=2022-08-15"],
      });
    });

    test("generates correct filter key for custom fields", async () => {
      await renderComponent(onFiltersChanged);

      const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
      fireEvent.click(filterTypeDropdowns[0]!);

      const dropdownFieldOptions = screen.getAllByText("DropdownFieldEndUser");
      fireEvent.click(dropdownFieldOptions[0]!);

      const dropdownOptionsDropdowns = screen.getAllByLabelText(
        "DropdownFieldEndUser"
      );
      fireEvent.click(dropdownOptionsDropdowns[0]!);

      const optionOneOptions = screen.getAllByText("Dropdown Field Option #1");
      fireEvent.click(optionOneOptions[0]!);

      const applyButtons = screen.getAllByRole("button", {
        name: "Apply filter",
      });
      fireEvent.click(applyButtons[0]!);

      expect(onFiltersChanged).toHaveBeenCalledWith(
        expect.objectContaining({
          custom_field_420: expect.any(Array),
        })
      );
    });

    test("filter by created date", async () => {
      jest.setSystemTime(new Date("2024-02-29"));

      await renderComponent(onFiltersChanged);

      const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
      fireEvent.click(filterTypeDropdowns[0]!);

      const createdDateOptions = screen.getAllByText("Created date");
      fireEvent.click(createdDateOptions[0]!);

      const createdDateDropdowns = screen.getAllByLabelText("Created date");
      fireEvent.click(createdDateDropdowns[0]!);

      const pastYearOptions = screen.getAllByText("In the past year");
      fireEvent.click(pastYearOptions[0]!);

      const applyButtons = screen.getAllByText("Apply filter");
      fireEvent.click(applyButtons[0]!);

      expect(onFiltersChanged).toHaveBeenCalledWith({
        created_at: [">2023-02-28"],
      });
    });

    test("filter by updated date", async () => {
      jest.setSystemTime(new Date("2025-08-17"));

      await renderComponent(onFiltersChanged);

      const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
      fireEvent.click(filterTypeDropdowns[0]!);

      const updatedDateOptions = screen.getAllByText("Updated date");
      fireEvent.click(updatedDateOptions[0]!);

      const updatedDateDropdowns = screen.getAllByLabelText("Updated date");
      fireEvent.click(updatedDateDropdowns[0]!);

      const pastWeekOptions = screen.getAllByText("In the past week");
      fireEvent.click(pastWeekOptions[0]!);

      const applyButtons = screen.getAllByText("Apply filter");
      fireEvent.click(applyButtons[0]!);

      expect(onFiltersChanged).toHaveBeenCalledWith({
        updated_at: [">2025-08-10"],
      });
    });

    test("filter by custom created date", async () => {
      jest.setSystemTime(new Date("2025-08-17"));

      await renderComponent(onFiltersChanged);

      const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
      fireEvent.click(filterTypeDropdowns[0]!);

      const createdDateOptions = screen.getAllByText("Created date");
      fireEvent.click(createdDateOptions[0]!);

      const createdDateDropdowns = screen.getAllByLabelText("Created date");
      fireEvent.click(createdDateDropdowns[0]!);

      const customOptions = screen.getAllByText("Custom");
      fireEvent.click(customOptions[0]!);

      const startTexts = screen.getAllByText("Start");
      fireEvent.click(startTexts[0]!);

      const startDateInputs = screen.getAllByRole("textbox", { name: "Start" });
      const startDateInput = startDateInputs[0]!;

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

      const applyButtons = screen.getAllByRole("button", {
        name: "Apply filter",
      });
      fireEvent.click(applyButtons[0]!);

      expect(onFiltersChanged).toHaveBeenCalledWith({
        created_at: [">=2025-08-01", "<=2025-08-02"],
      });
    });

    test("filter by custom updated date", async () => {
      jest.setSystemTime(new Date("2025-08-17"));

      await renderComponent(onFiltersChanged);

      const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
      fireEvent.click(filterTypeDropdowns[0]!);

      const updatedDateOptions = screen.getAllByText("Updated date");
      fireEvent.click(updatedDateOptions[0]!);

      const updatedDateDropdowns = screen.getAllByLabelText("Updated date");
      fireEvent.click(updatedDateDropdowns[0]!);

      const customOptions = screen.getAllByText("Custom");
      fireEvent.click(customOptions[0]!);

      const startTexts = screen.getAllByText("Start");
      fireEvent.click(startTexts[0]!);

      const startDateInputs = screen.getAllByRole("textbox", { name: "Start" });
      const startDateInput = startDateInputs[0]!;

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

      const applyButtons = screen.getAllByRole("button", {
        name: "Apply filter",
      });
      fireEvent.click(applyButtons[0]!);

      expect(onFiltersChanged).toHaveBeenCalledWith({
        updated_at: [">=2025-08-01", "<=2025-08-02"],
      });
    });

    test("can filter by date custom fields - custom dates", async () => {
      jest.setSystemTime(new Date("2022-08-17"));

      await renderComponent(onFiltersChanged);

      const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
      fireEvent.click(filterTypeDropdowns[0]!);

      const dateFieldOptions = screen.getAllByText("DateField");
      fireEvent.click(dateFieldOptions[0]!);

      const dateDropdowns = screen.getAllByLabelText("DateField");
      fireEvent.click(dateDropdowns[0]!);

      const customOptions = screen.getAllByText("Custom");
      fireEvent.click(customOptions[0]!);

      const startDateInputs = screen.getAllByRole("textbox", { name: "Start" });
      const startDateInput = startDateInputs[0]!;

      const datepicker =
        startDateInput.closest(
          '[role="dialog"], .calendar-container, [data-calendar]'
        ) || startDateInput.parentElement?.parentElement;
      const calendarItem_1 = getAllByText(datepicker as HTMLElement, "1")[0]!;
      const calendarItem_15 = getAllByText(datepicker as HTMLElement, "15")[0]!;

      fireEvent.click(calendarItem_1);
      fireEvent.click(calendarItem_15);

      const applyButtons = screen.getAllByRole("button", {
        name: "Apply filter",
      });
      fireEvent.click(applyButtons[0]!);

      expect(onFiltersChanged).toHaveBeenCalledWith({
        custom_field_422: [">=2022-08-01", "<=2022-08-15"],
      });
    });

    test("can filter by date custom fields - future dates", async () => {
      jest.setSystemTime(new Date("2022-08-17"));

      await renderComponent(onFiltersChanged);

      const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
      fireEvent.click(filterTypeDropdowns[0]!);

      const dateFieldOptions = screen.getAllByText("DateField");
      fireEvent.click(dateFieldOptions[0]!);

      const dateDropdowns = screen.getAllByLabelText("DateField");
      fireEvent.click(dateDropdowns[0]!);

      const customOptions = screen.getAllByText("Custom");
      fireEvent.click(customOptions[0]!);

      const startDateInputs = screen.getAllByRole("textbox", { name: "Start" });
      const startDateInput = startDateInputs[0]!;

      const datepicker =
        startDateInput.closest(
          '[role="dialog"], .calendar-container, [data-calendar]'
        ) || startDateInput.parentElement?.parentElement;
      const calendarItem_19 = getAllByText(datepicker as HTMLElement, "19")[0]!;
      const calendarItem_21 = getAllByText(datepicker as HTMLElement, "21")[0]!;

      fireEvent.click(calendarItem_19);
      fireEvent.click(calendarItem_21);

      const applyButtons = screen.getAllByRole("button", {
        name: "Apply filter",
      });
      fireEvent.click(applyButtons[0]!);

      expect(onFiltersChanged).toHaveBeenCalledWith({
        custom_field_422: [">=2022-08-19", "<=2022-08-21"],
      });
    });
  });

  test("can filter by decimal custom fields - Range", async () => {
    await renderComponent(onFiltersChanged);

    const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
    fireEvent.click(filterTypeDropdowns[0]!);

    const decimalFieldOptions = screen.getAllByText("DecimalField");
    fireEvent.click(decimalFieldOptions[0]!);

    const filterTypeSelects = screen.getAllByLabelText("Filter type");
    fireEvent.click(filterTypeSelects[0]!);

    const rangeOptions = screen.getAllByText("Range");
    fireEvent.click(rangeOptions[0]!);

    const minValueInputs = screen.getAllByLabelText("Min value");
    fireEvent.change(minValueInputs[0]!, {
      target: { value: "1.2" },
    });

    const maxValueInputs = screen.getAllByLabelText("Max value");
    fireEvent.change(maxValueInputs[0]!, {
      target: { value: "1.45" },
    });

    const applyButtons = screen.getAllByRole("button", {
      name: "Apply filter",
    });
    fireEvent.click(applyButtons[0]!);

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

    const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
    fireEvent.click(filterTypeDropdowns[0]!);

    const organizationOptions = screen.getAllByText("Organization");
    fireEvent.click(organizationOptions[0]!);

    const organizationDropdowns = screen.getAllByLabelText("Organization");
    fireEvent.click(organizationDropdowns[0]!);

    const myOrgOptions = screen.getAllByText("My Organization");
    fireEvent.click(myOrgOptions[0]!);

    const applyButtons = screen.getAllByRole("button", {
      name: "Apply filter",
    });
    fireEvent.click(applyButtons[0]!);

    expect(onFiltersChanged).toHaveBeenCalledWith(
      expect.objectContaining({
        status: [":open"],
        organization: expect.any(Array),
      })
    );
  });

  test("can filter by dropdown custom fields", async () => {
    await renderComponent(onFiltersChanged);

    const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
    fireEvent.click(filterTypeDropdowns[0]!);

    const dropdownFieldItems = screen.getAllByText("DropdownFieldEndUser");
    fireEvent.click(dropdownFieldItems[0]!);

    const dropdownOptionsDropdowns = screen.getAllByLabelText(
      "DropdownFieldEndUser"
    );
    fireEvent.click(dropdownOptionsDropdowns[0]!);

    const optionOneOptions = screen.getAllByText("Dropdown Field Option #1");
    fireEvent.click(optionOneOptions[0]!);

    const applyButtons = screen.getAllByText("Apply filter");
    fireEvent.click(applyButtons[0]!);

    expect(onFiltersChanged).toHaveBeenCalledWith({
      custom_field_420: [":first"],
    });
  });

  test("can filter by multiselect custom fields", async () => {
    await renderComponent(onFiltersChanged);

    const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
    fireEvent.click(filterTypeDropdowns[0]!);

    const multiselectFieldOptions = screen.getAllByText(
      "MultiselectFieldEndUser"
    );
    fireEvent.click(multiselectFieldOptions[0]!);

    const multiselectDropdowns = screen.getAllByLabelText(
      "MultiselectFieldEndUser"
    );
    fireEvent.click(multiselectDropdowns[0]!);

    const optionOneOptions = screen.getAllByText("Multiselect Field Option #1");
    fireEvent.click(optionOneOptions[0]!);

    const applyButtons = screen.getAllByRole("button", {
      name: "Apply filter",
    });
    fireEvent.click(applyButtons[0]!);

    expect(onFiltersChanged).toHaveBeenCalledWith({
      custom_field_421: [":first"],
    });
  });

  test("can filter by text custom fields", async () => {
    await renderComponent(onFiltersChanged);

    const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
    fireEvent.click(filterTypeDropdowns[0]!);

    const multilineFieldOptions = screen.getAllByText("MultilineField");
    fireEvent.click(multilineFieldOptions[0]!);

    const filterTypeSelects = screen.getAllByLabelText("Filter type");
    fireEvent.click(filterTypeSelects[0]!);

    const exactMatchOptions = screen.getAllByText("Exact match");
    fireEvent.click(exactMatchOptions[0]!);

    const inputTexts = screen.getAllByLabelText("Enter MultilineField", {
      selector: "input",
    });
    fireEvent.change(inputTexts[0]!, { target: { value: "test" } });

    const applyButtons = screen.getAllByRole("button", {
      name: "Apply filter",
    });
    fireEvent.click(applyButtons[0]!);

    expect(onFiltersChanged).toHaveBeenCalledWith({
      custom_field_426: [`:"test"`],
    });
  });

  test("can filter by text custom fields using a multi word phrase", async () => {
    await renderComponent(onFiltersChanged);

    const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
    fireEvent.click(filterTypeDropdowns[0]!);

    const multilineFieldOptions = screen.getAllByText("MultilineField");
    fireEvent.click(multilineFieldOptions[0]!);

    const filterTypeSelects = screen.getAllByLabelText("Filter type");
    fireEvent.click(filterTypeSelects[0]!);

    const exactMatchOptions = screen.getAllByText("Exact match");
    fireEvent.click(exactMatchOptions[0]!);

    const inputTexts = screen.getAllByLabelText("Enter MultilineField", {
      selector: "input",
    });
    fireEvent.change(inputTexts[0]!, {
      target: { value: "Phrase with spaces" },
    });

    const applyButtons = screen.getAllByRole("button", {
      name: "Apply filter",
    });
    fireEvent.click(applyButtons[0]!);

    expect(onFiltersChanged).toHaveBeenCalledWith({
      custom_field_426: [`:"Phrase with spaces"`],
    });
  });

  test("can filter by text custom fields - any value", async () => {
    await renderComponent(onFiltersChanged);

    const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
    fireEvent.click(filterTypeDropdowns[0]!);

    const multilineFieldOptions = screen.getAllByText("MultilineField");
    fireEvent.click(multilineFieldOptions[0]!);

    const filterTypeSelects = screen.getAllByLabelText("Filter type");
    fireEvent.click(filterTypeSelects[0]!);

    const anyValueOptions = screen.getAllByText("Any value");
    fireEvent.click(anyValueOptions[0]!);

    const applyButtons = screen.getAllByRole("button", {
      name: "Apply filter",
    });
    fireEvent.click(applyButtons[0]!);

    expect(onFiltersChanged).toHaveBeenCalledWith({
      custom_field_426: [":*"],
    });
  });

  test("displays an error if no filter type is selected for text custom field", async () => {
    await renderComponent(onFiltersChanged);

    const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
    fireEvent.click(filterTypeDropdowns[0]!);

    const multilineFieldOptions = screen.getAllByText("MultilineField");
    fireEvent.click(multilineFieldOptions[0]!);

    const applyButtons = screen.getAllByRole("button", {
      name: "Apply filter",
    });
    fireEvent.click(applyButtons[0]!);

    expect(screen.getByText("Select a filter type")).toBeInTheDocument();

    expect(onFiltersChanged).not.toHaveBeenCalled();
  });

  test("can filter by regexp custom fields - Exact match", async () => {
    await renderComponent(onFiltersChanged);

    const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
    fireEvent.click(filterTypeDropdowns[0]!);

    const regexpFieldOptions = screen.getAllByText("RegexpField");
    fireEvent.click(regexpFieldOptions[0]!);

    const filterTypeSelects = screen.getAllByLabelText("Filter type");
    fireEvent.click(filterTypeSelects[0]!);

    const exactMatchOptions = screen.getAllByText("Exact match");
    fireEvent.click(exactMatchOptions[0]!);

    const inputTexts = screen.getAllByLabelText("Enter RegexpField", {
      selector: "input",
    });
    fireEvent.change(inputTexts[0]!, { target: { value: "test" } });

    const applyButtons = screen.getAllByRole("button", {
      name: "Apply filter",
    });
    fireEvent.click(applyButtons[0]!);

    expect(onFiltersChanged).toHaveBeenCalledWith({
      custom_field_430: [`:"test"`],
    });
  });

  test("can filter by regexp custom fields - any value", async () => {
    await renderComponent(onFiltersChanged);

    const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
    fireEvent.click(filterTypeDropdowns[0]!);

    const regexpFieldOptions = screen.getAllByText("RegexpField");
    fireEvent.click(regexpFieldOptions[0]!);

    const filterTypeSelects = screen.getAllByLabelText("Filter type");
    fireEvent.click(filterTypeSelects[0]!);

    const anyValueOptions = screen.getAllByText("Any value");
    fireEvent.click(anyValueOptions[0]!);

    const applyButtons = screen.getAllByRole("button", {
      name: "Apply filter",
    });
    fireEvent.click(applyButtons[0]!);

    expect(onFiltersChanged).toHaveBeenCalledWith({
      custom_field_430: [":*"],
    });
  });

  test("displays an error if no filter type is selected for regexp custom field", async () => {
    await renderComponent(onFiltersChanged);

    const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
    fireEvent.click(filterTypeDropdowns[0]!);

    const regexpFieldOptions = screen.getAllByText("RegexpField");
    fireEvent.click(regexpFieldOptions[0]!);

    const applyButtons = screen.getAllByRole("button", {
      name: "Apply filter",
    });
    fireEvent.click(applyButtons[0]!);

    expect(screen.getByText("Select a filter type")).toBeInTheDocument();

    expect(onFiltersChanged).not.toHaveBeenCalled();
  });

  test("displays an error if no value is inserted for text custom field", async () => {
    await renderComponent(onFiltersChanged);

    const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
    fireEvent.click(filterTypeDropdowns[0]!);

    const multilineFieldOptions = screen.getAllByText("MultilineField");
    fireEvent.click(multilineFieldOptions[0]!);

    const filterTypeSelects = screen.getAllByLabelText("Filter type");
    fireEvent.click(filterTypeSelects[0]!);

    const exactMatchOptions = screen.getAllByText("Exact match");
    fireEvent.click(exactMatchOptions[0]!);

    const applyButtons = screen.getAllByRole("button", {
      name: "Apply filter",
    });
    fireEvent.click(applyButtons[0]!);

    expect(screen.getByText("Insert a value")).toBeInTheDocument();

    expect(onFiltersChanged).not.toHaveBeenCalled();
  });

  test("can filter by number custom fields - Any value", async () => {
    await renderComponent(onFiltersChanged);

    const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
    fireEvent.click(filterTypeDropdowns[0]!);

    const numberFieldOptions = screen.getAllByText("NumberField");
    fireEvent.click(numberFieldOptions[0]!);

    const filterTypeSelects = screen.getAllByLabelText("Filter type");
    fireEvent.click(filterTypeSelects[0]!);

    const anyValueOptions = screen.getAllByText("Any value");
    fireEvent.click(anyValueOptions[0]!);

    const applyButtons = screen.getAllByRole("button", {
      name: "Apply filter",
    });
    fireEvent.click(applyButtons[0]!);

    expect(onFiltersChanged).toHaveBeenCalledWith({
      custom_field_428: [":*"],
    });
  });

  test("can filter by number custom fields - Range", async () => {
    await renderComponent(onFiltersChanged);

    const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
    fireEvent.click(filterTypeDropdowns[0]!);

    const numberFieldOptions = screen.getAllByText("NumberField");
    fireEvent.click(numberFieldOptions[0]!);

    const filterTypeSelects = screen.getAllByLabelText("Filter type");
    fireEvent.click(filterTypeSelects[0]!);

    const rangeOptions = screen.getAllByText("Range");
    fireEvent.click(rangeOptions[0]!);

    const minValueInputs = screen.getAllByLabelText("Min value");
    fireEvent.change(minValueInputs[0]!, {
      target: { value: "1" },
    });

    const maxValueInputs = screen.getAllByLabelText("Max value");
    fireEvent.change(maxValueInputs[0]!, {
      target: { value: "10" },
    });

    const applyButtons = screen.getAllByRole("button", {
      name: "Apply filter",
    });
    fireEvent.click(applyButtons[0]!);

    expect(onFiltersChanged).toHaveBeenCalledWith({
      custom_field_428: [">=1", "<=10"],
    });
  });

  test("can filter by number custom fields - Exact match", async () => {
    await renderComponent(onFiltersChanged);

    const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
    fireEvent.click(filterTypeDropdowns[0]!);

    const numberFieldOptions = screen.getAllByText("NumberField");
    fireEvent.click(numberFieldOptions[0]!);

    const filterTypeSelects = screen.getAllByLabelText("Filter type");
    fireEvent.click(filterTypeSelects[0]!);

    const exactMatchOptions = screen.getAllByText("Exact match");
    fireEvent.click(exactMatchOptions[0]!);

    const numberFieldInputs = screen.getAllByLabelText("Enter NumberField");
    fireEvent.change(numberFieldInputs[0]!, {
      target: { value: "42" },
    });

    const applyButtons = screen.getAllByRole("button", {
      name: "Apply filter",
    });
    fireEvent.click(applyButtons[0]!);

    expect(onFiltersChanged).toHaveBeenCalledWith({
      custom_field_428: [":42"],
    });
  });

  test("can filter by checkbox field - Selected", async () => {
    await renderComponent(onFiltersChanged);

    const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
    fireEvent.click(filterTypeDropdowns[0]!);

    const checkboxFieldOptions = screen.getAllByText("CheckboxField");
    fireEvent.click(checkboxFieldOptions[0]!);

    const checkboxSelects = screen.getAllByLabelText("Select CheckboxField");
    fireEvent.click(checkboxSelects[0]!);

    const selectedOptions = screen.getAllByText("Selected");
    fireEvent.click(selectedOptions[0]!);

    const applyButtons = screen.getAllByRole("button", {
      name: "Apply filter",
    });
    fireEvent.click(applyButtons[0]!);

    expect(onFiltersChanged).toHaveBeenCalledWith({
      custom_field_427: [":checked"],
    });
  });

  test("can filter by credit card custom fields - Last 4 digits", async () => {
    await renderComponent(onFiltersChanged);

    const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
    fireEvent.click(filterTypeDropdowns[0]!);

    const creditCardFieldOptions = screen.getAllByText("CreditcardField");
    fireEvent.click(creditCardFieldOptions[0]!);

    const filterTypeSelects = screen.getAllByLabelText("Filter type");
    fireEvent.click(filterTypeSelects[0]!);

    const exactMatchOptions = screen.getAllByText("Exact match");
    fireEvent.click(exactMatchOptions[0]!);

    const creditCardInputs = screen.getAllByLabelText(
      "Enter the last four digits of the credit card"
    );
    fireEvent.change(creditCardInputs[0]!, {
      target: { value: "1234" },
    });

    const applyButtons = screen.getAllByRole("button", {
      name: "Apply filter",
    });
    fireEvent.click(applyButtons[0]!);

    expect(onFiltersChanged).toHaveBeenCalledWith({
      custom_field_431: [":*1234"],
    });
  });

  test("can filter by credit card custom fields - Any value", async () => {
    await renderComponent(onFiltersChanged);

    const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
    fireEvent.click(filterTypeDropdowns[0]!);

    const creditCardFieldOptions = screen.getAllByText("CreditcardField");
    fireEvent.click(creditCardFieldOptions[0]!);

    const filterTypeSelects = screen.getAllByLabelText("Filter type");
    fireEvent.click(filterTypeSelects[0]!);

    const anyValueOptions = screen.getAllByText("Any value");
    fireEvent.click(anyValueOptions[0]!);

    const applyButtons = screen.getAllByRole("button", {
      name: "Apply filter",
    });
    fireEvent.click(applyButtons[0]!);

    expect(onFiltersChanged).toHaveBeenCalledWith({
      custom_field_431: [":*"],
    });
  });

  test("displays an error if the format of the credit card filter is invalid", async () => {
    await renderComponent(onFiltersChanged);

    const filterTypeDropdowns = screen.getAllByLabelText("Select filter");
    fireEvent.click(filterTypeDropdowns[0]!);

    const creditcardFieldOptions = screen.getAllByText("CreditcardField");
    fireEvent.click(creditcardFieldOptions[0]!);

    const filterTypeSelects = screen.getAllByLabelText("Filter type");
    fireEvent.click(filterTypeSelects[0]!);

    const exactMatchOptions = screen.getAllByText("Exact match");
    fireEvent.click(exactMatchOptions[0]!);

    const creditCardInputs = screen.getAllByLabelText(
      "Enter the last four digits of the credit card"
    );

    fireEvent.change(creditCardInputs[0]!, {
      target: { value: "abcd" },
    });

    const applyButtons = screen.getAllByRole("button", {
      name: "Apply filter",
    });
    fireEvent.click(applyButtons[0]!);

    expect(creditCardInputs[0]!).toHaveAttribute("aria-invalid", "true");

    expect(
      screen.getByText(
        "Enter the last four digits of the credit card, using only numbers"
      )
    ).toBeInTheDocument();

    expect(onFiltersChanged).not.toHaveBeenCalled();
  });
});
