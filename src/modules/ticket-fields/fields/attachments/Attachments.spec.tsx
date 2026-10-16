import { screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { render } from "../../../test/render";
import { Attachments } from "./Attachments";
import type { AttachmentField } from "../../data-types/AttachmentsField";

jest.mock(
  "@zendeskgarden/svg-icons/src/16/trash-stroke.svg",
  () => "trash-svg"
);
jest.mock("@zendeskgarden/svg-icons/src/16/x-stroke.svg", () => "x-svg");

const fieldWithAttachments = (
  attachments: AttachmentField["attachments"]
): AttachmentField => ({
  name: "request[attachments]",
  label: "Attachments",
  error: null,
  attachments,
});

describe("Attachments", () => {
  beforeEach(() => {
    (globalThis.fetch as jest.Mock) = jest.fn((url: string) => {
      if (url.includes("/api/v2/users/me.json")) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({ user: { authenticity_token: "csrf-token" } }),
        });
      }

      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("moves focus to the dropzone after removing the last attachment", async () => {
    const user = userEvent.setup();

    render(
      <Attachments
        field={fieldWithAttachments([
          {
            id: "token-1",
            file_name: "report.pdf",
            url: "https://example.com/report.pdf",
          },
        ])}
        baseLocale="en-us"
      />
    );

    const removeButton = screen.getByRole("button", {
      name: "Remove file: report.pdf",
    });
    removeButton.focus();
    await user.click(removeButton);

    await waitFor(() => {
      expect(
        document.querySelector('[data-garden-id="forms.file_upload"]')
      ).toHaveFocus();
    });
    expect(
      screen.queryByRole("button", { name: "Remove file: report.pdf" })
    ).not.toBeInTheDocument();
  });

  it("moves focus to a remaining remove button after removing a non-last attachment", async () => {
    const user = userEvent.setup();

    render(
      <Attachments
        field={fieldWithAttachments([
          {
            id: "token-1",
            file_name: "first.pdf",
            url: "https://example.com/first.pdf",
          },
          {
            id: "token-2",
            file_name: "second.pdf",
            url: "https://example.com/second.pdf",
          },
        ])}
        baseLocale="en-us"
      />
    );

    await user.click(
      screen.getByRole("button", { name: "Remove file: first.pdf" })
    );

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Remove file: second.pdf" })
      ).toHaveFocus();
    });
  });
});
