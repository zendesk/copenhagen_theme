import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { useState } from "react";
import { render } from "../../../../test/render";
import type { Organization } from "../../../data-types";
import OrganizationsDropdown from "./OrganizationsDropdown";

const organizations: Organization[] = [
  { id: 1, name: "Support", default: true },
  { id: 2, name: "TEST", default: false },
  { id: 3, name: "Sales", default: false },
];

function ControlledDropdown({
  onOrganizationSelected,
}: {
  onOrganizationSelected: (id: number) => void;
}) {
  const [currentOrganizationId, setCurrentOrganizationId] = useState(1);

  return (
    <OrganizationsDropdown
      organizations={organizations}
      currentOrganizationId={currentOrganizationId}
      onOrganizationSelected={(id) => {
        setCurrentOrganizationId(id);
        onOrganizationSelected(id);
      }}
    />
  );
}

const getOptionNames = () =>
  screen.getAllByRole("option").map((option) => option.textContent);

describe("<OrganizationsDropdown />", () => {
  const onOrganizationSelected = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows the selected organization in the input", () => {
    render(
      <ControlledDropdown onOrganizationSelected={onOrganizationSelected} />
    );

    expect(screen.getByLabelText("Organization")).toHaveValue("Support");
  });

  it("shows all organizations when opened with an organization selected", async () => {
    const user = userEvent.setup();
    render(
      <ControlledDropdown onOrganizationSelected={onOrganizationSelected} />
    );

    await user.click(screen.getByLabelText("Organization"));

    expect(getOptionNames()).toEqual(["Support", "TEST", "Sales"]);
  });

  it("shows all organizations again after selecting one", async () => {
    const user = userEvent.setup();
    render(
      <ControlledDropdown onOrganizationSelected={onOrganizationSelected} />
    );

    const input = screen.getByLabelText("Organization");

    await user.click(input);
    await user.click(screen.getByRole("option", { name: "TEST" }));

    expect(onOrganizationSelected).toHaveBeenCalledWith(2);
    expect(input).toHaveValue("TEST");

    await user.click(input);

    expect(getOptionNames()).toEqual(["Support", "TEST", "Sales"]);
  });

  it("shows all organizations again after filtering and selecting one", async () => {
    const user = userEvent.setup();
    render(
      <ControlledDropdown onOrganizationSelected={onOrganizationSelected} />
    );

    const input = screen.getByLabelText("Organization");

    await user.clear(input);
    await user.type(input, "s");
    await user.click(screen.getByRole("option", { name: "Sales" }));

    expect(onOrganizationSelected).toHaveBeenCalledWith(3);
    expect(input).toHaveValue("Sales");

    await user.click(input);

    expect(getOptionNames()).toEqual(["Support", "TEST", "Sales"]);
  });

  it("shows all organizations again after selecting one with the keyboard", async () => {
    const user = userEvent.setup();
    render(
      <ControlledDropdown onOrganizationSelected={onOrganizationSelected} />
    );

    const input = screen.getByLabelText("Organization");

    await user.clear(input);
    await user.type(input, "sa");
    await user.keyboard("{ArrowDown}{Enter}");

    expect(onOrganizationSelected).toHaveBeenCalledWith(3);
    expect(input).toHaveValue("Sales");

    await user.click(input);

    expect(getOptionNames()).toEqual(["Support", "TEST", "Sales"]);
  });

  it("filters organizations while typing", async () => {
    const user = userEvent.setup();
    render(
      <ControlledDropdown onOrganizationSelected={onOrganizationSelected} />
    );

    const input = screen.getByLabelText("Organization");

    await user.clear(input);
    await user.type(input, "sa");

    expect(getOptionNames()).toEqual(["Sales"]);
  });

  it("shows all organizations when the input is cleared", async () => {
    const user = userEvent.setup();
    render(
      <ControlledDropdown onOrganizationSelected={onOrganizationSelected} />
    );

    const input = screen.getByLabelText("Organization");

    await user.clear(input);
    await user.type(input, "sa");
    await user.clear(input);

    expect(getOptionNames()).toEqual(["Support", "TEST", "Sales"]);
  });

  it("shows a disabled 'No matches found' option when nothing matches", async () => {
    const user = userEvent.setup();
    render(
      <ControlledDropdown onOrganizationSelected={onOrganizationSelected} />
    );

    const input = screen.getByLabelText("Organization");

    await user.clear(input);
    await user.type(input, "xyz");

    const option = screen.getByRole("option", { name: "No matches found" });
    expect(option).toHaveAttribute("aria-disabled", "true");
  });
});
