import "@testing-library/jest-dom";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import { organizations, ticketFields } from "../../../apiMocks";
import type { FilterValuesMap } from "../../../data-types/FilterValue";
import { FilterTags } from "./FilterTags";

const onFiltersChangedMock = jest.fn();

function renderComponent(filters: FilterValuesMap) {
  return render(
    <ThemeProvider>
      <FilterTags
        filters={filters}
        ticketFields={ticketFields}
        organizations={organizations}
        onFiltersChanged={onFiltersChangedMock}
        customStatusOptions={[]}
      />
    </ThemeProvider>
  );
}

describe("FilterTags", () => {
  test("renders status filter tag", () => {
    const { container } = renderComponent({ status: [":open :new :hold"] });

    expect(container).toHaveTextContent("Status Open");
  });

  test("renders the updated_at tag with the month and year only once, when it's within the same month and year", () => {
    const { container } = renderComponent({
      updated_at: [">=2021-05-01", "<=2021-05-31"],
    });

    expect(container).toHaveTextContent("Updated date May 1 – 31, 2021");
  });

  test("renders the created_at tag with both years when they're different", () => {
    const { container } = renderComponent({
      created_at: [">=2022-03-02", "<=2023-03-02"],
    });

    expect(container).toHaveTextContent(
      "Created date March 2, 2022 – March 2, 2023"
    );
  });

  test("renders organization filter tag", () => {
    const { container } = renderComponent({ organization: [":1"] });

    expect(container).toHaveTextContent("Organization My Organization");
  });

  test("renders custom dropdown filter tag", () => {
    const { container } = renderComponent({
      custom_field_420: [":first", ":second"],
    });

    expect(container).toHaveTextContent(
      "DropdownFieldEndUser Dropdown Field Option #1"
    );
    expect(container).toHaveTextContent(
      "DropdownFieldEndUser Dropdown Field Option #2"
    );
  });

  test("renders custom multiselect filter tag", () => {
    const { container } = renderComponent({
      custom_field_421: [":first", ":second"],
    });

    expect(container).toHaveTextContent(
      "MultiselectFieldEndUser Multiselect Field Option #1"
    );
    expect(container).toHaveTextContent(
      "MultiselectFieldEndUser Multiselect Field Option #2"
    );
  });

  test("renders custom date filter tag", () => {
    jest.useFakeTimers().setSystemTime(new Date("2023-02-21T00:00:00Z"));
    const { container } = renderComponent({
      custom_field_422: [">2023-02-20"],
    });

    expect(container).toHaveTextContent("DateField In the past day");
  });

  test("renders custom text filter tag - any value", () => {
    const { container } = renderComponent({
      custom_field_425: [":*"],
    });

    expect(container).toHaveTextContent("TextField");
  });

  test("renders custom text filter tag - exact match", () => {
    const { container } = renderComponent({
      custom_field_425: [`:"foo bar"`],
    });

    expect(container).toHaveTextContent("TextField foo bar");
  });

  test("renders custom checkbox filter tag", () => {
    const { container } = renderComponent({
      custom_field_427: [":checked"],
    });

    expect(container).toHaveTextContent("CheckboxField Selected");
  });

  test("renders custom number filter tag - any value", () => {
    const { container } = renderComponent({
      custom_field_428: [":*"],
    });

    expect(container).toHaveTextContent("NumberField");
  });

  test("renders custom number filter tag - range", () => {
    const { container } = renderComponent({
      custom_field_428: [">=1", "<=5"],
    });

    expect(container).toHaveTextContent("NumberField 1 - 5");
  });

  test("renders custom number filter tag - exact match", () => {
    const { container } = renderComponent({
      custom_field_428: [":42"],
    });

    expect(container).toHaveTextContent("NumberField 42");
  });

  test("renders custom credit card filter tag - any value", () => {
    const { container } = renderComponent({
      custom_field_431: [":*"],
    });

    expect(container).toHaveTextContent("CreditcardField");
  });

  test("renders custom credit card filter tag - exact match", () => {
    const { container } = renderComponent({
      custom_field_431: [":*1231"],
    });

    expect(container).toHaveTextContent("CreditcardField XXXXXXXXXXXX1231");
  });

  test("removes a filter when clicked", () => {
    renderComponent({
      status: [":open :new :hold"],
      custom_field_420: [":first", ":second"],
    });

    const openFilterContainer = screen
      .getByText("Status")
      .closest("div") as HTMLDivElement;

    fireEvent.click(within(openFilterContainer).getByRole("button"));

    expect(onFiltersChangedMock).toBeCalledWith({
      custom_field_420: [":first", ":second"],
    });
  });

  test("removes a filter when backspace pressed", () => {
    renderComponent({
      status: [":open :new :hold"],
      custom_field_420: [":first", ":second"],
    });

    const openFilterContainer = screen
      .getByText("Status")
      .closest("div") as HTMLDivElement;

    fireEvent.keyDown(openFilterContainer, { code: "Backspace" });

    expect(onFiltersChangedMock).toBeCalledWith({
      custom_field_420: [":first", ":second"],
    });
  });

  test("removes all filters", () => {
    renderComponent({
      status: [":open :new :hold"],
      custom_field_420: [":first", ":second"],
    });

    fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));

    expect(onFiltersChangedMock).toBeCalledWith({});
  });
});
