import { render } from "../../../test/render";
import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import {
  SortMenu,
  DEFAULT_SORT_OPTION,
  SORT_URL_PARAM,
  getSortFromUrl,
  getSortParams,
  isValidSortOption,
  type SortOption,
} from "./SortMenu";

describe("SortMenu helpers", () => {
  describe("getSortParams", () => {
    it("returns ascending name sort params for name_asc", () => {
      expect(getSortParams("name_asc")).toEqual({
        sort_by: "name",
        sort_order: "asc",
      });
    });

    it("returns descending name sort params for name_desc", () => {
      expect(getSortParams("name_desc")).toEqual({
        sort_by: "name",
        sort_order: "desc",
      });
    });

    it("returns descending created_at sort params for created_at_desc", () => {
      expect(getSortParams("created_at_desc")).toEqual({
        sort_by: "created_at",
        sort_order: "desc",
      });
    });
  });

  describe("isValidSortOption", () => {
    it("returns true for known sort options", () => {
      expect(isValidSortOption("name_asc")).toBe(true);
      expect(isValidSortOption("name_desc")).toBe(true);
      expect(isValidSortOption("created_at_desc")).toBe(true);
    });

    it("returns false for unknown strings", () => {
      expect(isValidSortOption("unknown_sort")).toBe(false);
      expect(isValidSortOption("")).toBe(false);
    });

    it("returns false for non-string values", () => {
      expect(isValidSortOption(null)).toBe(false);
      expect(isValidSortOption(undefined)).toBe(false);
      expect(isValidSortOption(42)).toBe(false);
      expect(isValidSortOption({})).toBe(false);
    });
  });

  describe("getSortFromUrl", () => {
    it("returns the default sort option when sort param is missing", () => {
      expect(getSortFromUrl("")).toBe(DEFAULT_SORT_OPTION);
      expect(getSortFromUrl("?category_id=cat-1")).toBe(DEFAULT_SORT_OPTION);
    });

    it("returns the default sort option for unrecognized values", () => {
      expect(getSortFromUrl(`?${SORT_URL_PARAM}=bogus`)).toBe(
        DEFAULT_SORT_OPTION
      );
    });

    it("returns the parsed sort option for valid values", () => {
      expect(getSortFromUrl(`?${SORT_URL_PARAM}=name_desc`)).toBe("name_desc");
      expect(getSortFromUrl(`?${SORT_URL_PARAM}=created_at_desc`)).toBe(
        "created_at_desc"
      );
      expect(getSortFromUrl(`?${SORT_URL_PARAM}=name_asc`)).toBe("name_asc");
    });

    it("returns the parsed sort option when combined with other params", () => {
      expect(
        getSortFromUrl(`?category_id=cat-1&${SORT_URL_PARAM}=name_desc`)
      ).toBe("name_desc");
    });
  });
});

describe("SortMenu", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the currently selected option as the button label", () => {
    render(<SortMenu selectedOption="name_desc" onChange={jest.fn()} />);

    expect(screen.getByRole("button", { name: /Z-A/ })).toBeInTheDocument();
  });

  it("renders all sort options when the menu is opened", async () => {
    render(<SortMenu selectedOption="name_asc" onChange={jest.fn()} />);

    await userEvent.setup().click(screen.getByRole("button"));

    expect(
      screen.getByRole("menuitemradio", { name: "A-Z" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("menuitemradio", { name: "Z-A" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("menuitemradio", { name: "Newest" })
    ).toBeInTheDocument();
  });

  it("marks the selected option as checked", async () => {
    render(<SortMenu selectedOption="created_at_desc" onChange={jest.fn()} />);

    await userEvent.setup().click(screen.getByRole("button"));

    expect(
      screen.getByRole("menuitemradio", { name: "Newest" })
    ).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("menuitemradio", { name: "A-Z" })).toHaveAttribute(
      "aria-checked",
      "false"
    );
  });

  it("calls onChange with the selected option when an item is clicked", async () => {
    const onChange = jest.fn();
    render(<SortMenu selectedOption="name_asc" onChange={onChange} />);

    const user = userEvent.setup();
    await user.click(screen.getByRole("button"));
    await user.click(screen.getByRole("menuitemradio", { name: "Z-A" }));

    expect(onChange).toHaveBeenCalledWith<[SortOption]>("name_desc");
  });
});
