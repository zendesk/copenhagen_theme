import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import ApprovalStatusTag from "./ApprovalStatusTag";

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe("ApprovalStatusTag", () => {
  it("renders the active status tag correctly", () => {
    renderWithTheme(<ApprovalStatusTag status="active" />);

    expect(screen.getByText("Decision pending")).toBeInTheDocument();
  });

  it("renders the approved status tag correctly", () => {
    renderWithTheme(<ApprovalStatusTag status="approved" />);

    expect(screen.getByText("Approved")).toBeInTheDocument();
  });

  it("renders the rejected status tag correctly", () => {
    renderWithTheme(<ApprovalStatusTag status="rejected" />);

    expect(screen.getByText("Denied")).toBeInTheDocument();
  });

  it("renders the withdrawn status tag correctly", () => {
    renderWithTheme(<ApprovalStatusTag status="withdrawn" />);

    expect(screen.getByText("Withdrawn")).toBeInTheDocument();
  });
});
