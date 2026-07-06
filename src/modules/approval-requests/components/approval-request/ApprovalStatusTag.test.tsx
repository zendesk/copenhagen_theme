import { render } from "../../../test/render";
import { screen } from "@testing-library/react";
import ApprovalStatusTag from "./ApprovalStatusTag";

describe("ApprovalStatusTag", () => {
  it("renders the active status tag correctly", () => {
    render(<ApprovalStatusTag status="active" />);

    expect(screen.getByText("Decision pending")).toBeInTheDocument();
  });

  it("renders the approved status tag correctly", () => {
    render(<ApprovalStatusTag status="approved" />);

    expect(screen.getByText("Approved")).toBeInTheDocument();
  });

  it("renders the rejected status tag correctly", () => {
    render(<ApprovalStatusTag status="rejected" />);

    expect(screen.getByText("Denied")).toBeInTheDocument();
  });

  it("renders the withdrawn status tag correctly", () => {
    render(<ApprovalStatusTag status="withdrawn" />);

    expect(screen.getByText("Withdrawn")).toBeInTheDocument();
  });
});
