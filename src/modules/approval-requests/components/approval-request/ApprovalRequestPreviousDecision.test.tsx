import { render } from "../../../test/render";
import { screen } from "@testing-library/react";
import ApprovalRequestPreviousDecision from "./ApprovalRequestPreviousDecision";
import type { ApprovalDecision } from "../../types";

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
    render(
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

    render(
      <ApprovalRequestPreviousDecision
        decision={decisionWithoutNotes}
        baseLocale="en-US"
      />
    );

    expect(screen.getByText(/approved/i)).toBeInTheDocument();
    expect(screen.queryByText(/"/)).not.toBeInTheDocument();
  });
});
