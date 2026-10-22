import { render, screen } from "@testing-library/react";
import { RequestFormField } from "./RequestFormField";
import type { TicketFieldObject } from "./data-types/TicketFieldObject";

jest.mock("./fields/textarea/TextArea", () => ({
  TextArea: ({ hasWysiwyg }: { hasWysiwyg: boolean }) => (
    <div data-testid="textarea" data-wysiwyg={String(hasWysiwyg)} />
  ),
}));

const makeField = (type: string): TicketFieldObject => ({
  id: 1,
  name: "custom_fields_1",
  type,
  description: "",
  label: "Description",
  required: true,
  options: [],
  value: null,
  error: null,
});

const renderField = (field: TicketFieldObject) =>
  render(
    <RequestFormField
      field={field}
      baseLocale="en-us"
      hasAtMentions={false}
      userRole="end_user"
      userId={1}
      defaultOrganizationId={null}
      brandId={1}
      visibleFields={[field]}
      handleChange={jest.fn()}
    />
  );

describe("RequestFormField", () => {
  it("renders Description with the rich text editor enabled", () => {
    renderField(makeField("description"));

    expect(screen.getByTestId("textarea")).toHaveAttribute(
      "data-wysiwyg",
      "true"
    );
  });

  it("keeps custom textarea fields plain text", () => {
    renderField(makeField("textarea"));

    expect(screen.getByTestId("textarea")).toHaveAttribute(
      "data-wysiwyg",
      "false"
    );
  });
});
