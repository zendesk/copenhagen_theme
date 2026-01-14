import { screen, fireEvent, within } from "@testing-library/react";
import { RequestsColumnFilter } from "./RequestsColumnFilter";
import type { RequestAttribute } from "../RequestAttribute";
import localStorage from "../../../utils/localStorage";

import { ticketFields } from "../../../apiMocks";
import { DEFAULT_DESKTOP_COLUMNS } from "../RequestsTable";
import { render } from "../../../../test/render";

const HIDDEN_FIELDS = [
  "description",
  "group",
  "assignee",
  "custom_status",
  "lookup",
];

const requestAttributesLabels: Record<string, string> = {
  id: "ID",
  created_at: "Created date",
  updated_at: "Updated date",
  status: "Status",
};

const createRequestAttributes = (): RequestAttribute[] => {
  return [
    ...DEFAULT_DESKTOP_COLUMNS.map((identifier) => {
      const label =
        requestAttributesLabels[identifier] ??
        ticketFields.find((field) => field.type === identifier)
          ?.title_in_portal;
      return { identifier, label: label || identifier };
    }),
    ...ticketFields
      .filter((field) => !DEFAULT_DESKTOP_COLUMNS.includes(field.type))
      .filter((field) => !HIDDEN_FIELDS.includes(field.type))
      .map(({ id, title_in_portal }) => ({
        identifier: String(id),
        label: title_in_portal,
      })),
  ];
};

interface RenderComponentOptions {
  selectedColumns?: string[];
  onSelectedColumnsChanged?: (identifiers: string[]) => void;
  requestAttributes?: RequestAttribute[];
}

const renderComponent = ({
  selectedColumns = DEFAULT_DESKTOP_COLUMNS,
  onSelectedColumnsChanged = jest.fn(),
  requestAttributes = createRequestAttributes(),
}: RenderComponentOptions = {}) => {
  return {
    onSelectedColumnsChanged,
    ...render(
      <RequestsColumnFilter
        selectedColumns={selectedColumns}
        onSelectedColumnsChanged={onSelectedColumnsChanged}
        requestAttributes={requestAttributes}
        defaultDesktopColumns={DEFAULT_DESKTOP_COLUMNS}
      />
    ),
  };
};

beforeEach(() => {
  jest.useFakeTimers().setSystemTime(new Date(2021, 5, 3));
});

afterEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

afterAll(() => {
  jest.useRealTimers();
});

describe("Columns", () => {
  test("<RequestsColumnFilter /> calls onSelectedColumnsChanged when columns are toggled", () => {
    const selectedColumnIdentifiers = DEFAULT_DESKTOP_COLUMNS;
    const onSelectedColumnsChanged = jest.fn();

    renderComponent({
      selectedColumns: selectedColumnIdentifiers,
      onSelectedColumnsChanged,
    });

    fireEvent.click(
      screen.getByRole("button", { name: "Show and hide columns" })
    );
    fireEvent.click(screen.getByRole("menuitem", { name: "ID" }));

    expect(onSelectedColumnsChanged).toHaveBeenCalledWith(
      selectedColumnIdentifiers.filter((identifier) => identifier !== "id")
    );
  });

  test("<RequestsColumnFilter /> can toggle removable columns", () => {
    const onSelectedColumnsChanged = jest.fn();

    renderComponent({ onSelectedColumnsChanged });

    fireEvent.click(
      screen.getByRole("button", { name: "Show and hide columns" })
    );

    // Deselect Status and ID
    fireEvent.click(screen.getByRole("menuitem", { name: "Status" }));
    expect(onSelectedColumnsChanged).toHaveBeenCalledWith(
      DEFAULT_DESKTOP_COLUMNS.filter((id) => id !== "status")
    );

    fireEvent.click(screen.getByRole("menuitem", { name: "ID" }));
    expect(onSelectedColumnsChanged).toHaveBeenCalledWith(
      DEFAULT_DESKTOP_COLUMNS.filter((id) => id !== "id")
    );
  });

  test("<RequestsColumnFilter /> shows all default desktop columns in dropdown", () => {
    renderComponent();

    fireEvent.click(
      screen.getByRole("button", { name: "Show and hide columns" })
    );

    // All default desktop columns should be shown in the dropdown
    expect(
      screen.getByRole("menuitem", { name: "Subject" })
    ).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "ID" })).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", { name: "Status" })
    ).toBeInTheDocument();
  });

  test("<RequestsColumnFilter /> can show and hide custom fields columns", () => {
    const onSelectedColumnsChanged = jest.fn();

    const { unmount } = renderComponent({ onSelectedColumnsChanged });

    // Open dropdown and modal to add DropdownFieldEndUser
    fireEvent.click(
      screen.getByRole("button", { name: "Show and hide columns" })
    );
    fireEvent.click(screen.getByRole("menuitem", { name: "See more columns" }));
    fireEvent.click(screen.getByLabelText("Show DropdownFieldEndUser column"));
    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(onSelectedColumnsChanged).toHaveBeenCalledWith(
      expect.arrayContaining([...DEFAULT_DESKTOP_COLUMNS, "420"])
    );

    unmount();

    // Re-render with DropdownFieldEndUser selected
    onSelectedColumnsChanged.mockClear();
    const { unmount: unmount2 } = renderComponent({
      selectedColumns: [...DEFAULT_DESKTOP_COLUMNS, "420"],
      onSelectedColumnsChanged,
    });

    fireEvent.click(
      screen.getByRole("button", { name: "Show and hide columns" })
    );
    fireEvent.click(screen.getByRole("menuitem", { name: "See more columns" }));
    fireEvent.click(screen.getByLabelText("Hide DropdownFieldEndUser column"));
    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(onSelectedColumnsChanged).toHaveBeenCalledWith(
      DEFAULT_DESKTOP_COLUMNS
    );

    unmount2();

    // Test with NumberField
    onSelectedColumnsChanged.mockClear();
    const { unmount: unmount3 } = renderComponent({ onSelectedColumnsChanged });

    fireEvent.click(
      screen.getByRole("button", { name: "Show and hide columns" })
    );
    fireEvent.click(screen.getByRole("menuitem", { name: "See more columns" }));
    fireEvent.click(screen.getByLabelText("Show NumberField column"));
    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(onSelectedColumnsChanged).toHaveBeenCalledWith(
      expect.arrayContaining([...DEFAULT_DESKTOP_COLUMNS, "428"])
    );

    unmount3();

    onSelectedColumnsChanged.mockClear();
    const { unmount: unmount4 } = renderComponent({
      selectedColumns: [...DEFAULT_DESKTOP_COLUMNS, "428"],
      onSelectedColumnsChanged,
    });

    fireEvent.click(
      screen.getByRole("button", { name: "Show and hide columns" })
    );
    fireEvent.click(screen.getByRole("menuitem", { name: "NumberField" }));

    expect(onSelectedColumnsChanged).toHaveBeenCalledWith(
      DEFAULT_DESKTOP_COLUMNS
    );

    // Verify NumberField is no longer in dropdown after being deselected
    fireEvent.click(
      screen.getByRole("button", { name: "Show and hide columns" })
    );

    expect(
      screen.queryByRole("menuitem", { name: "NumberField" })
    ).not.toBeInTheDocument();

    unmount4();
  });

  test("<RequestsColumnFilter /> can show and hide all columns", () => {
    const onSelectedColumnsChanged = jest.fn();
    const requestAttributes = createRequestAttributes();

    const { unmount } = renderComponent({ onSelectedColumnsChanged });

    fireEvent.click(
      screen.getByRole("button", { name: "Show and hide columns" })
    );
    fireEvent.click(screen.getByRole("menuitem", { name: "See more columns" }));
    fireEvent.click(screen.getByLabelText("Show all columns"));
    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    const allColumnIds = requestAttributes.map((attr) => attr.identifier);
    expect(onSelectedColumnsChanged).toHaveBeenCalledWith(
      expect.arrayContaining(allColumnIds)
    );

    unmount();

    onSelectedColumnsChanged.mockClear();
    const { unmount: unmount2 } = renderComponent({
      selectedColumns: allColumnIds,
      onSelectedColumnsChanged,
    });

    fireEvent.click(
      screen.getByRole("button", { name: "Show and hide columns" })
    );
    fireEvent.click(screen.getByRole("menuitem", { name: "See more columns" }));
    fireEvent.click(screen.getByLabelText("Hide all columns"));
    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    // Should have empty array when all deselected
    expect(onSelectedColumnsChanged).toHaveBeenCalledWith([]);

    unmount2();
  });

  test("<RequestsColumnFilter /> can search for column name in the column selection modal", () => {
    const onSelectedColumnsChanged = jest.fn();

    renderComponent({ onSelectedColumnsChanged });

    fireEvent.click(
      screen.getByRole("button", { name: "Show and hide columns" })
    );
    fireEvent.click(screen.getByRole("menuitem", { name: "See more columns" }));

    const searchBox = screen.getByRole("searchbox", {
      name: "Search for columns",
    });
    fireEvent.change(searchBox, { target: { value: "enduser" } });

    const modal = screen.getByRole("dialog");
    const checkboxes = within(modal).getAllByRole("checkbox");
    // Should have: select all checkbox + DropdownFieldEndUser + MultiselectFieldEndUser
    expect(checkboxes.length).toBe(3);

    const selectAllCheckbox = checkboxes[0] as HTMLInputElement;
    expect(selectAllCheckbox.checked).toBe(false);
    expect(selectAllCheckbox.indeterminate).toBe(false);

    fireEvent.click(selectAllCheckbox);

    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    // Should have selected the default columns plus the two EndUser fields
    expect(onSelectedColumnsChanged).toHaveBeenCalledWith(
      expect.arrayContaining([
        ...DEFAULT_DESKTOP_COLUMNS,
        "420", // DropdownFieldEndUser
        "421", // MultiselectFieldEndUser
      ])
    );
  });
});
