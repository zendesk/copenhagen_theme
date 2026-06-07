import { screen, fireEvent, within } from "@testing-library/react";
import { MultiSelect } from "./MultiSelect";
import type { TicketFieldObject } from "../data-types/TicketFieldObject";
import { render } from "../../test/render";

const baseField: TicketFieldObject = {
  id: 123,
  name: "test_multiselect",
  value: [],
  error: null,
  label: "Test MultiSelect",
  required: false,
  description: "",
  type: "multiselect",
  options: [
    { name: "Bass::Fender::Precision", value: "bass__fender__precision" },
    { name: "Bass::Fender::Jazz", value: "bass__fender__jazz" },
    { name: "Drums", value: "drums" },
  ],
};

function renderMultiSelect(overrides: Partial<TicketFieldObject> = {}) {
  const onChange = jest.fn();
  render(
    <MultiSelect field={{ ...baseField, ...overrides }} onChange={onChange} />
  );
  return { onChange, combobox: screen.getByLabelText("Test MultiSelect") };
}

describe("MultiSelect", () => {
  describe("selected value tags", () => {
    it("displays a tag with the label of a selected root-level value", () => {
      const { combobox } = renderMultiSelect({ value: ["drums"] });
      expect(combobox).toHaveTextContent("Drums");
    });

    it("displays a tag with the full label of a selected nested value", () => {
      const { combobox } = renderMultiSelect({
        value: ["bass__fender__precision"],
      });
      expect(combobox).toHaveTextContent("Bass > Fender > Precision");
    });

    it("renders hidden options for selected values without polluting the menu", () => {
      renderMultiSelect({ value: ["bass__fender__precision"] });
      const combobox = screen.getByLabelText("Test MultiSelect");
      fireEvent.click(combobox);

      const listbox = screen.getByRole("listbox");
      // Root level navigation is shown, not the hidden nested option.
      expect(within(listbox).getByText("Bass")).toBeInTheDocument();
      expect(within(listbox).getByText("Drums")).toBeInTheDocument();
    });
  });

  describe("navigation", () => {
    it("navigates into a subgroup and selects a nested value", () => {
      const { onChange, combobox } = renderMultiSelect();
      fireEvent.click(combobox);

      fireEvent.click(screen.getByText("Bass"));
      fireEvent.click(screen.getByText("Fender"));
      fireEvent.click(screen.getByText("Precision"));

      expect(onChange).toHaveBeenCalledWith(["bass__fender__precision"]);
    });
  });
});
