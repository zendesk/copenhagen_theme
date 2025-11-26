import { render } from "../../../test/render";
import { screen } from "@testing-library/react";
import ApprovalRequestBreadcrumbs from "./ApprovalRequestBreadcrumbs";

describe("ApprovalRequestBreadcrumbs", () => {
  it("renders breadcrumbs with organization name when organization exists", () => {
    render(
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
    render(
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
