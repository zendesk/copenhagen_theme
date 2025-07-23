import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { DEFAULT_THEME } from "@zendeskgarden/react-theming";
import ServiceCatalogListItem from "./ServiceCatalogListItem";
import type { ServiceCatalogItem } from "../../data-types/ServiceCatalogItem";
import { userEvent } from "@testing-library/user-event";

jest.mock("@zendeskgarden/svg-icons/src/16/shapes-fill.svg", () => {
  return function MockShapesIcon() {
    return <div data-testid="atl-nacional" />;
  };
});

const theme = {
  ...DEFAULT_THEME,
  colors: {
    ...DEFAULT_THEME.colors,
    foreground: "#ff0000",
    primaryHue: "#0000ff",
  },
};

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("ServiceCatalogListItem", () => {
  const mockServiceItem: ServiceCatalogItem = {
    id: 1989,
    name: "Atl Nacional keyboard",
    description: "This is a keyboard &quot;from&quot; Atl Nacional",
    form_id: 456,
    thumbnail_url: "",
  };

  const mockHelpCenterPath = "/hc/en-us";

  beforeEach(() => jest.clearAllMocks());

  describe("Rendering", () => {
    it("should render the service item with correct content", () => {
      renderWithTheme(
        <ServiceCatalogListItem
          serviceItem={mockServiceItem}
          helpCenterPath={mockHelpCenterPath}
        />
      );

      expect(screen.getByText(mockServiceItem.name)).toBeInTheDocument();
      expect(
        screen.getByText('This is a keyboard "from" Atl Nacional')
      ).toBeInTheDocument();
      expect(screen.getByTestId("atl-nacional")).toBeInTheDocument();
    });

    it("should render as a link with correct href", () => {
      renderWithTheme(
        <ServiceCatalogListItem
          serviceItem={mockServiceItem}
          helpCenterPath={mockHelpCenterPath}
        />
      );

      const linkElement = screen.getByRole("link");

      expect(linkElement).toHaveAttribute(
        "href",
        `${mockHelpCenterPath}/services/${mockServiceItem.id}`
      );
    });

    it("should use the theme foreground color as text color", () => {
      renderWithTheme(
        <ServiceCatalogListItem
          serviceItem={mockServiceItem}
          helpCenterPath={mockHelpCenterPath}
        />
      );

      const itemContainer = screen.getByTestId(
        "service-catalog-list-item-container"
      );
      expect(itemContainer).toHaveStyle(`color: ${theme.colors.foreground}`);
    });

    it("should use primaryHue as card border color on hover", async () => {
      renderWithTheme(
        <ServiceCatalogListItem
          serviceItem={mockServiceItem}
          helpCenterPath={mockHelpCenterPath}
        />
      );

      const user = userEvent.setup();
      const itemContainer = screen.getByTestId(
        "service-catalog-list-item-container"
      );
      const defaultBorderColor = DEFAULT_THEME.palette.grey?.[300];

      expect(defaultBorderColor).toBeTruthy();
      expect(itemContainer).toHaveStyle(`border-color: ${defaultBorderColor}`);

      await user.hover(itemContainer);

      expect(itemContainer).toHaveStyle(
        `border-color: ${theme.colors.primaryHue}`
      );
    });
  });
});
