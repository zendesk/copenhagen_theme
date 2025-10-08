import { screen } from "@testing-library/react";
import NewCommentIndicator from "../NewCommentIndicator";
import { renderWithTheme } from "../../../../testHelpers";

describe("NewCommentIndicator", () => {
  it("renders singular new comment text when unreadCount is 1", () => {
    renderWithTheme(<NewCommentIndicator unreadCount={1} />);
    expect(screen.getByText("New comment")).toBeInTheDocument();
  });

  it("renders plural new comments text when unreadCount is greater than 1", () => {
    renderWithTheme(<NewCommentIndicator unreadCount={5} />);
    expect(screen.getByText("New comments")).toBeInTheDocument();
  });
});
