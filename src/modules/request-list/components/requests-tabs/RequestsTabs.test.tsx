import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import RequestsTabs from "./RequestsTabs";
import {
  CCD_REQUESTS_TAB_NAME,
  MY_REQUESTS_TAB_NAME,
  ORG_REQUESTS_TAB_NAME,
} from "../../data-types/request-list-params";

const organizations = [
  { id: 1, name: "Organization 1", default: true },
  { id: 2, name: "Organization 2", default: false },
];

test("<RequestsTabs /> renders 'Requests I am CC'd on' as selected when visibleTab is 'ccd-requests'", () => {
  render(
    <ThemeProvider>
      <RequestsTabs
        organizations={[]}
        selectedTab={{ name: "ccd-requests" }}
        onTabSelected={jest.fn()}
      />
    </ThemeProvider>
  );

  expect(
    screen.getByRole("button", { name: "Requests I am CC'd on" })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("tab", { name: "Requests I am CC'd on" })
  ).toHaveAttribute("aria-selected", "true");
});

test("<RequestsTabs /> renders 'My requests' as selected when visibleTab is 'my-requests'", () => {
  render(
    <ThemeProvider>
      <RequestsTabs
        organizations={[]}
        selectedTab={{ name: MY_REQUESTS_TAB_NAME }}
        onTabSelected={jest.fn()}
      />
    </ThemeProvider>
  );

  expect(
    screen.getByRole("button", { name: "My requests" })
  ).toBeInTheDocument();

  expect(screen.getByRole("tab", { name: "My requests" })).toHaveAttribute(
    "aria-selected",
    "true"
  );
});

test("<RequestsTabs /> renders 'Organizational requests' as selected when visibleTab is 'org-requests'", () => {
  render(
    <ThemeProvider>
      <RequestsTabs
        organizations={organizations}
        selectedTab={{ name: ORG_REQUESTS_TAB_NAME, organizationId: 1 }}
        onTabSelected={jest.fn()}
      />
    </ThemeProvider>
  );

  expect(
    screen.getByRole("button", { name: "Organizational requests" })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("tab", { name: "Organizational requests" })
  ).toHaveAttribute("aria-selected", "true");
});

test("<RequestsTabs /> calls onTabSelected when switching tabs", () => {
  const onTabSelected = jest.fn();

  render(
    <ThemeProvider>
      <RequestsTabs
        organizations={[]}
        selectedTab={{ name: CCD_REQUESTS_TAB_NAME }}
        onTabSelected={onTabSelected}
      />
    </ThemeProvider>
  );

  fireEvent.click(screen.getByRole("tab", { name: "My requests" }));

  expect(onTabSelected).toHaveBeenCalledWith({ name: MY_REQUESTS_TAB_NAME });
});

test("<RequestsTabs /> does not render the 'Organizational requests' tab if it's not available", () => {
  const onTabSelected = jest.fn();

  render(
    <ThemeProvider>
      <RequestsTabs
        organizations={[]}
        selectedTab={{ name: CCD_REQUESTS_TAB_NAME }}
        onTabSelected={onTabSelected}
      />
    </ThemeProvider>
  );

  expect(screen.queryByText("Organizational requests")).not.toBeInTheDocument();
});
