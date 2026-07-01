import { render } from "../test/render";
import { screen } from "@testing-library/react";
import { Applications } from "./Applications";

describe("Applications", () => {
  it("renders the description text", () => {
    render(<Applications />);

    expect(
      screen.getByText("This page will be used for SaaS management.")
    ).toBeInTheDocument();
  });
});
