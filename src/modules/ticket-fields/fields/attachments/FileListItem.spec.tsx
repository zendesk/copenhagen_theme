import { createRef } from "react";
import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { render } from "../../../test/render";
import { FileListItem } from "./FileListItem";
import type { AttachedFile } from "./useAttachedFiles";

jest.mock(
  "@zendeskgarden/svg-icons/src/16/trash-stroke.svg",
  () => "trash-svg"
);
jest.mock("@zendeskgarden/svg-icons/src/16/x-stroke.svg", () => "x-svg");

const uploadedFile: AttachedFile = {
  status: "uploaded",
  value: {
    id: "token-1",
    file_name: "report.pdf",
    url: "https://example.com/report.pdf",
  },
};

describe("FileListItem", () => {
  it("does not make the file row a tab stop and exposes a tabbable remove button", async () => {
    const user = userEvent.setup();
    const onRemove = jest.fn();

    render(<FileListItem file={uploadedFile} onRemove={onRemove} />);

    const removeButton = screen.getByRole("button", {
      name: "Remove file: report.pdf",
    });
    const fileLink = screen.getByRole("link", { name: /report\.pdf/ });

    expect(removeButton).not.toHaveAttribute("tabindex", "-1");
    expect(
      document.querySelector('[data-garden-id="forms.file"]')
    ).not.toHaveAttribute("tabindex");

    await user.tab();
    expect(fileLink).toHaveFocus();

    await user.tab();
    expect(removeButton).toHaveFocus();
  });

  it("calls onRemove when the remove button is activated", async () => {
    const user = userEvent.setup();
    const onRemove = jest.fn();

    render(<FileListItem file={uploadedFile} onRemove={onRemove} />);

    await user.click(
      screen.getByRole("button", { name: "Remove file: report.pdf" })
    );

    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("forwards a ref to the remove button", () => {
    const ref = createRef<HTMLButtonElement>();
    const onRemove = jest.fn();

    render(<FileListItem ref={ref} file={uploadedFile} onRemove={onRemove} />);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).toHaveAttribute(
      "aria-label",
      "Remove file: report.pdf"
    );
  });

  it("renders a stop-upload control for pending files", () => {
    const onRemove = jest.fn();
    const pendingFile: AttachedFile = {
      status: "pending",
      id: "pending-1",
      file_name: "uploading.png",
      progress: 40,
      xhr: { abort: jest.fn() } as unknown as XMLHttpRequest,
    };

    render(<FileListItem file={pendingFile} onRemove={onRemove} />);

    expect(
      screen.getByRole("button", { name: "Stop uploading uploading.png" })
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-garden-id="forms.file"]')
    ).not.toHaveAttribute("tabindex");
  });
});
