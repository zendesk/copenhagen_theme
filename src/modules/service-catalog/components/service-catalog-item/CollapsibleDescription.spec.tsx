import { render } from "../../../test/render";
import { screen } from "@testing-library/react";
import { CollapsibleDescription } from "./CollapsibleDescription";

describe("CollapsibleDescription", () => {
  const defaultProps = {
    title: "Order a new laptop",
    description: "<p>Request a brand new laptop.</p>",
    thumbnailUrl: "",
  };

  it("renders the title", () => {
    render(<CollapsibleDescription {...defaultProps} />);

    expect(screen.getByText("Order a new laptop")).toBeInTheDocument();
  });

  it("renders safe description markup", () => {
    render(<CollapsibleDescription {...defaultProps} />);

    expect(screen.getByText("Request a brand new laptop.")).toBeInTheDocument();
    expect(
      document.querySelector(".service-catalog-description")
    ).toBeInTheDocument();
  });

  it("does not execute XSS payloads in the description", () => {
    const onError = jest.fn();
    (window as unknown as { __xss?: () => void }).__xss = onError;

    render(
      <CollapsibleDescription
        {...defaultProps}
        description={'<img src=x onerror="window.__xss()">Safe content'}
      />
    );

    expect(onError).not.toHaveBeenCalled();
    expect(document.querySelector("img[onerror]")).toBeNull();
    expect(screen.getByText("Safe content")).toBeInTheDocument();

    delete (window as unknown as { __xss?: () => void }).__xss;
  });

  it("does not render the description container when the sanitized description is empty", () => {
    render(
      <CollapsibleDescription
        {...defaultProps}
        description={"<script>alert(1)</script>"}
      />
    );

    expect(
      document.querySelector(".service-catalog-description")
    ).not.toBeInTheDocument();
  });
});
