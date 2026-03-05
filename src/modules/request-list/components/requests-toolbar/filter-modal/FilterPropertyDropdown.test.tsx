import { fireEvent, screen } from "@testing-library/react";
import { render } from "../../../../test/render";
import { FilterPropertyDropdown } from "./FilterPropertyDropdown";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { ticketFields, organizations } from "../../../apiMocks";

describe("<FilterPropertyDropdown />", () => {
  const onSelectMock = jest.fn();

  const duplicateLabelTicketFields = [
    ...ticketFields,
    {
      active: true,
      id: 500,
      description: "Credit Card Field Duplicate",
      title: "Credit Card Field Duplicate",
      title_in_portal: "CreditcardField",
      type: "text",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    render(
      <FilterPropertyDropdown
        ticketFields={duplicateLabelTicketFields}
        organizations={organizations}
        selectedProperty={undefined}
        hasCustomStatuses={false}
        onSelect={onSelectMock}
        errors={{}}
      />
    );
  };

  test("correctly selects first option with duplicate label by id", async () => {
    renderComponent();

    const filterDropdowns = screen.getAllByLabelText("Select filter");
    fireEvent.click(filterDropdowns[0]!);

    const creditCardOptions = screen.getAllByText("CreditcardField");
    expect(creditCardOptions).toHaveLength(2);

    expect(creditCardOptions[0]).toBeDefined();

    fireEvent.click(creditCardOptions[0] as HTMLElement);

    expect(onSelectMock).toHaveBeenCalled();
    expect(onSelectMock.mock.calls[0][0]).toHaveProperty(
      "label",
      "CreditcardField"
    );
    expect(onSelectMock.mock.calls[0][0]).toHaveProperty("identifier", "431");
  });

  test("correctly selects second option with duplicate label by id", async () => {
    renderComponent();

    const filterDropdowns = screen.getAllByLabelText("Select filter");
    fireEvent.click(filterDropdowns[0]!);

    const creditCardOptions = screen.getAllByText("CreditcardField");
    expect(creditCardOptions).toHaveLength(2);

    expect(creditCardOptions[1]).toBeDefined();

    fireEvent.click(creditCardOptions[1] as HTMLElement);

    expect(onSelectMock).toHaveBeenCalled();
    expect(onSelectMock.mock.calls[0][0]).toHaveProperty(
      "label",
      "CreditcardField"
    );
    expect(onSelectMock.mock.calls[0][0]).toHaveProperty("identifier", "500");
  });

  test("allows deleting text and typing new filter", async () => {
    renderComponent();
    const user = userEvent.setup();

    const filterDropdowns = screen.getAllByLabelText("Select filter");
    fireEvent.click(filterDropdowns[0]!);

    const input = filterDropdowns[0]!;

    await user.clear(input);
    await user.type(input, "Date");

    expect(screen.getByText("DateField")).toBeInTheDocument();
    expect(screen.queryByText("CreditcardField")).not.toBeInTheDocument();

    const dateFieldOptions = screen.getAllByText("DateField");
    fireEvent.click(dateFieldOptions[0]!);

    expect(onSelectMock).toHaveBeenCalledWith(
      expect.objectContaining({
        identifier: "422",
        label: "DateField",
      })
    );

    jest.clearAllMocks();

    const filterDropdowns2 = screen.getAllByLabelText("Select filter");
    fireEvent.click(filterDropdowns2[0]!);

    await user.clear(filterDropdowns2[0]!);
    await user.type(filterDropdowns2[0]!, "Created");

    expect(screen.getByText("Created date")).toBeInTheDocument();

    const createdDateOptions = screen.getAllByText("Created date");
    fireEvent.click(createdDateOptions[0]!);

    expect(onSelectMock).toHaveBeenCalledWith(
      expect.objectContaining({
        identifier: "created_at",
        label: "Created date",
      })
    );
  });
});
