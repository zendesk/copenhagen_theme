import { screen, render } from "@testing-library/react";
import type { ReactElement } from "react";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import ApprovalRequestPreviousDecision from "./ApprovalRequestPreviousDecision";
import type { ApprovalDecision } from "../../types";

const renderWithTheme = (ui: ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

const mockDecision: ApprovalDecision = {
  decision_notes: "Looks good to me",
  decided_at: "2024-02-21T15:45:00Z",
  decided_by_user: {
    id: 456,
    name: "Jane Approver",
    photo: {
      content_url: null,
    },
  },
  status: "approved",
};

describe("ApprovalRequestPreviousDecision", () => {
  it("renders the previous decision header, status, and notes", () => {
    renderWithTheme(
      <ApprovalRequestPreviousDecision
        decision={mockDecision}
        baseLocale="en-US"
      />
    );

    expect(screen.getByText("Previous decision")).toBeInTheDocument();
    expect(screen.getByText(/approved/i)).toBeInTheDocument();
    expect(screen.getByText(/"Looks good to me"/)).toBeInTheDocument();
  });

  it("renders the decision without decision notes if they do not exist", () => {
    const decisionWithoutNotes: ApprovalDecision = {
      ...mockDecision,
      decision_notes: null,
    };

    renderWithTheme(
      <ApprovalRequestPreviousDecision
        decision={decisionWithoutNotes}
        baseLocale="en-US"
      />
    );

    expect(screen.getByText(/approved/i)).toBeInTheDocument();
    expect(screen.queryByText(/"/)).not.toBeInTheDocument();
  });
});
