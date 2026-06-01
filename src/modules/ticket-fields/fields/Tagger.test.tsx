import { screen, fireEvent, within } from "@testing-library/react";
import { Tagger } from "./Tagger";
import type { TicketFieldObject } from "../data-types/TicketFieldObject";
import { render } from "../../test/render";

const baseField: TicketFieldObject = {
  id: 123,
  name: "test_tagger",
  value: "",
  error: null,
  label: "Test Tagger",
  required: false,
  description: "",
  type: "tagger",
  options: [
    { name: "Bass::Fender::Precision", value: "bass__fender__precision" },
    { name: "Bass::Fender::Jazz", value: "bass__fender__jazz" },
    { name: "Drums", value: "drums" },
  ],
};

function renderTagger(overrides: Partial<TicketFieldObject> = {}) {
  const onChange = jest.fn();
  render(<Tagger field={{ ...baseField, ...overrides }} onChange={onChange} />);
  return { onChange, combobox: screen.getByLabelText("Test Tagger") };
}

describe("Tagger", () => {
  describe("selected value label", () => {
    it("displays the label of a selected root-level value", () => {
      const { combobox } = renderTagger({ value: "drums" });
      expect(combobox).toHaveTextContent("Drums");
    });

    it("displays the full label of a selected nested value", () => {
      const { combobox } = renderTagger({ value: "bass__fender__precision" });
      expect(combobox).toHaveTextContent("Bass > Fender > Precision");
    });

    it("displays the empty value placeholder when no value is selected", () => {
      const { combobox } = renderTagger({ value: "" });
      expect(combobox).toHaveTextContent("-");
    });
  });

  describe("navigation", () => {
    it("opens at the group containing the selected nested value", () => {
      const { combobox } = renderTagger({ value: "bass__fender__precision" });
      fireEvent.click(combobox);

      const listbox = screen.getByRole("listbox");
      // Sibling leaf options of the selected value are shown.
      expect(within(listbox).getByText("Precision")).toBeInTheDocument();
      expect(within(listbox).getByText("Jazz")).toBeInTheDocument();
    });

    it("navigates from the root into a subgroup and selects a nested value", () => {
      const { onChange, combobox } = renderTagger();
      fireEvent.click(combobox);

      fireEvent.click(screen.getByText("Bass"));
      fireEvent.click(screen.getByText("Fender"));
      fireEvent.click(screen.getByText("Precision"));

      expect(onChange).toHaveBeenCalledWith("bass__fender__precision");
    });
  });
});
