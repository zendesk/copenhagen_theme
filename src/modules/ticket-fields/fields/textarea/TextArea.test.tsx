import { fireEvent, screen } from "@testing-library/react";
import { render } from "../../../test/render";
import { TextArea } from "./TextArea";
import type { TicketFieldObject } from "../../data-types/TicketFieldObject";

jest.mock("./useWysiwyg", () => ({
  useWysiwyg: () => () => undefined,
}));

const field: TicketFieldObject = {
  id: 1,
  name: "request[description]",
  type: "description",
  description: "",
  label: "Description",
  required: true,
  options: [],
  value: "",
  error: null,
};

const renderTextArea = (hasWysiwyg: boolean, onChange: jest.Mock) =>
  render(
    <TextArea
      field={field}
      hasWysiwyg={hasWysiwyg}
      baseLocale="en-us"
      hasAtMentions={false}
      userRole="end_user"
      brandId={1}
      onChange={onChange}
    />
  );

describe("TextArea", () => {
  it("reports values the WYSIWYG editor writes and announces with an input event", () => {
    const onChange = jest.fn();
    renderTextArea(true, onChange);
    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

    textarea.value = "<p>Printer is broken</p>";
    textarea.dispatchEvent(new Event("input", { bubbles: true }));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("<p>Printer is broken</p>");
  });

  it("reports typing once for a plain textarea", () => {
    const onChange = jest.fn();
    renderTextArea(false, onChange);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "plain text" },
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("plain text");
  });
});
