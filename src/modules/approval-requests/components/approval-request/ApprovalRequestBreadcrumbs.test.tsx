import { screen, render } from "@testing-library/react";
import type { ReactElement } from "react";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import ApprovalRequestBreadcrumbs from "./ApprovalRequestBreadcrumbs";

const renderWithTheme = (ui: ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe("ApprovalRequestBreadcrumbs", () => {
  it("renders breadcrumbs with organization name when organization exists", () => {
    renderWithTheme(
      <ApprovalRequestBreadcrumbs
        helpCenterPath="/hc/en-us"
        organizations={[{ id: 1, name: "Test Organization" }]}
      />
    );

    const orgLink = screen.getByRole("link", { name: "Test Organization" });
    const approvalRequestsLink = screen.getByRole("link", {
      name: "Approval requests",
    });

    expect(orgLink).toBeInTheDocument();
    expect(orgLink).toHaveAttribute("href", "/hc/en-us");
    expect(approvalRequestsLink).toHaveAttribute(
      "href",
      "/hc/en-us/approval_requests"
    );
  });

  it("renders breadcrumbs without organization name when no organizations exist", () => {
    renderWithTheme(
      <ApprovalRequestBreadcrumbs
        helpCenterPath="/hc/en-us"
        organizations={[]}
      />
    );

    expect(
      screen.getByRole("link", { name: "Approval requests" })
    ).toBeInTheDocument();
  });
});
