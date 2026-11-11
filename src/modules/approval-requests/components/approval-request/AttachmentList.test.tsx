import { render } from "../../../test/render";
import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import AttachmentList, {
  getFileTypeIconKey,
  isPreviewable,
} from "./AttachmentList";
import type { ApprovalRequestAttachment } from "../../types";

jest.mock(
  "@zendeskgarden/svg-icons/src/16/download-stroke.svg",
  () => "svg-mock"
);
jest.mock("@zendeskgarden/svg-icons/src/16/eye-stroke.svg", () => "svg-mock");
jest.mock(
  "@zendeskgarden/svg-icons/src/16/file-document-stroke.svg",
  () => "svg-mock"
);
jest.mock(
  "@zendeskgarden/svg-icons/src/16/file-generic-stroke.svg",
  () => "svg-mock"
);
jest.mock(
  "@zendeskgarden/svg-icons/src/16/file-image-stroke.svg",
  () => "svg-mock"
);
jest.mock(
  "@zendeskgarden/svg-icons/src/16/file-pdf-stroke.svg",
  () => "svg-mock"
);
jest.mock(
  "@zendeskgarden/svg-icons/src/16/file-presentation-stroke.svg",
  () => "svg-mock"
);
jest.mock(
  "@zendeskgarden/svg-icons/src/16/file-spreadsheet-stroke.svg",
  () => "svg-mock"
);
jest.mock(
  "@zendeskgarden/svg-icons/src/16/file-zip-stroke.svg",
  () => "svg-mock"
);

const mockAttachment = (
  id: number,
  fileName: string,
  malwareScanStatus = "malware_not_found",
  contentType = "application/pdf"
): ApprovalRequestAttachment => ({
  id: `01M73KGZ2HQ94KS171HQJ6EXC${id}`,
  filename: fileName,
  content_url: `https://example.com/${fileName}`,
  content_type: contentType,
  size: 24,
  created_at: "2026-11-10T20:48:50Z",
  created_by: "approver",
  malware_scan_status: malwareScanStatus,
});

describe("AttachmentList", () => {
  it("renders the attachments header and each attachment", () => {
    const attachments = [
      mockAttachment(1, "generic file"),
      mockAttachment(2, "document.doc"),
    ];

    render(<AttachmentList attachments={attachments} />);

    expect(screen.getByText("Attachments")).toBeInTheDocument();
    expect(screen.getByText("generic file")).toBeInTheDocument();
    expect(screen.getByText("document.doc")).toBeInTheDocument();
  });

  it("renders a type-specific file icon based on the content type", () => {
    expect(getFileTypeIconKey("application/pdf")).toBe("pdf");
    expect(getFileTypeIconKey("image/png")).toBe("image");
    expect(getFileTypeIconKey("application/zip")).toBe("zip");
    expect(getFileTypeIconKey("text/csv")).toBe("spreadsheet");
    expect(
      getFileTypeIconKey(
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
    ).toBe("spreadsheet");
    expect(
      getFileTypeIconKey(
        "application/vnd.openxmlformats-officedocument.presentationml.presentation"
      )
    ).toBe("presentation");
    expect(getFileTypeIconKey("text/plain")).toBe("document");
    expect(
      getFileTypeIconKey(
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      )
    ).toBe("document");
    expect(getFileTypeIconKey("")).toBe("generic");
    expect(getFileTypeIconKey(undefined)).toBe("generic");
  });

  it("identifies previewable content types", () => {
    expect(isPreviewable("application/pdf")).toBe(true);
    expect(isPreviewable("image/png")).toBe(true);
    expect(isPreviewable("image/jpeg")).toBe(true);
    expect(isPreviewable("text/plain")).toBe(true);
    expect(isPreviewable("video/mp4")).toBe(true);
    expect(isPreviewable("video/webm")).toBe(true);
    expect(isPreviewable("audio/mpeg")).toBe(true);

    // Types the browser cannot render inline, or that would execute as live
    // documents and must not be previewed as a blob URL on the site's origin
    expect(
      isPreviewable(
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      )
    ).toBe(false);
    expect(isPreviewable("application/zip")).toBe(false);
    expect(isPreviewable("text/csv")).toBe(false);
    expect(isPreviewable("text/html")).toBe(false);
    expect(isPreviewable("image/svg+xml")).toBe(false);
    expect(isPreviewable("image/heic")).toBe(false);
    expect(isPreviewable("image/tiff")).toBe(false);
    expect(isPreviewable("video/quicktime")).toBe(false);
    expect(isPreviewable("video/x-msvideo")).toBe(false);
    expect(isPreviewable(undefined)).toBe(false);
  });

  it("hides the preview action for file types the browser cannot render inline", () => {
    const attachments = [
      mockAttachment(
        1,
        "report.docx",
        "malware_not_found",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ),
    ];

    render(<AttachmentList attachments={attachments} />);

    expect(
      screen.queryByRole("button", { name: "Preview file: report.docx" })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Download file: report.docx" })
    ).toBeInTheDocument();
  });

  it("shows the preview action for previewable file types", () => {
    const attachments = [
      mockAttachment(1, "photo.png", "malware_not_found", "image/png"),
    ];

    render(<AttachmentList attachments={attachments} />);

    expect(
      screen.getByRole("button", { name: "Preview file: photo.png" })
    ).toBeInTheDocument();
  });

  it("renders preview and download buttons for each attachment", () => {
    const attachments = [mockAttachment(1, "document.doc")];

    render(<AttachmentList attachments={attachments} />);

    expect(
      screen.getByRole("button", { name: "Preview file: document.doc" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Download file: document.doc" })
    ).toBeInTheDocument();
  });

  it("fetches the attachment and opens it as a typed blob when previewing", async () => {
    const attachments = [mockAttachment(1, "document.doc")];
    const mockBlob = new Blob(["file data"], { type: "application/pdf" });
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      blob: () => Promise.resolve(mockBlob),
    });
    const createObjectURLMock = jest.fn(() => "blob:mock-url");
    URL.createObjectURL = createObjectURLMock;
    const openMock = jest.spyOn(window, "open").mockReturnValue(null);

    render(<AttachmentList attachments={attachments} />);

    await userEvent.click(
      screen.getByRole("button", { name: "Preview file: document.doc" })
    );

    expect(global.fetch).toHaveBeenCalledWith(
      "https://example.com/document.doc"
    );
    expect(createObjectURLMock).toHaveBeenCalledWith(
      expect.objectContaining({ type: "application/pdf" })
    );
    expect(openMock).toHaveBeenCalledWith(
      "blob:mock-url",
      "_blank",
      "noopener,noreferrer"
    );

    jest.restoreAllMocks();
  });

  it("falls back to opening the content URL when the preview fetch fails", async () => {
    const attachments = [mockAttachment(1, "document.doc")];
    global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));
    const openMock = jest.spyOn(window, "open").mockReturnValue(null);

    render(<AttachmentList attachments={attachments} />);

    await userEvent.click(
      screen.getByRole("button", { name: "Preview file: document.doc" })
    );

    expect(openMock).toHaveBeenCalledWith(
      "https://example.com/document.doc",
      "_blank",
      "noopener,noreferrer"
    );

    jest.restoreAllMocks();
  });

  it("fetches the attachment and triggers a download named after the file when downloading", async () => {
    const attachments = [mockAttachment(1, "document.doc")];
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      blob: () =>
        Promise.resolve(new Blob(["file data"], { type: "application/pdf" })),
    });
    URL.createObjectURL = jest.fn(() => "blob:mock-url");
    const revokeObjectURLMock = jest.fn();
    URL.revokeObjectURL = revokeObjectURLMock;
    const openMock = jest.spyOn(window, "open").mockReturnValue(null);
    jest
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => {});
    let anchorElement: HTMLAnchorElement | undefined;
    const originalAppendChild = document.body.appendChild.bind(document.body);
    const appendChildSpy = jest
      .spyOn(document.body, "appendChild")
      .mockImplementation((node) => {
        anchorElement = node as HTMLAnchorElement;
        return originalAppendChild(node);
      });

    render(<AttachmentList attachments={attachments} />);

    await userEvent.click(
      screen.getByRole("button", { name: "Download file: document.doc" })
    );

    expect(global.fetch).toHaveBeenCalledWith(
      "https://example.com/document.doc"
    );
    expect(anchorElement).toBeDefined();
    expect(anchorElement).toHaveAttribute("href", "blob:mock-url");
    expect(anchorElement).toHaveAttribute("download", "document.doc");
    expect(openMock).not.toHaveBeenCalled();

    appendChildSpy.mockRestore();
    jest.restoreAllMocks();
  });

  it("falls back to opening the content URL when the download fetch fails", async () => {
    const attachments = [mockAttachment(1, "document.doc")];
    global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));
    const openMock = jest.spyOn(window, "open").mockReturnValue(null);

    render(<AttachmentList attachments={attachments} />);

    await userEvent.click(
      screen.getByRole("button", { name: "Download file: document.doc" })
    );

    expect(openMock).toHaveBeenCalledWith(
      "https://example.com/document.doc",
      "_blank",
      "noopener,noreferrer"
    );

    jest.restoreAllMocks();
  });

  it("renders all attachments without an expander when there are at most three", () => {
    const attachments = [
      mockAttachment(1, "file-1.doc"),
      mockAttachment(2, "file-2.doc"),
      mockAttachment(3, "file-3.doc"),
    ];

    render(<AttachmentList attachments={attachments} />);

    expect(screen.getByText("file-1.doc")).toBeInTheDocument();
    expect(screen.getByText("file-2.doc")).toBeInTheDocument();
    expect(screen.getByText("file-3.doc")).toBeInTheDocument();
    expect(screen.queryByText("+1 more")).not.toBeInTheDocument();
  });

  it("renders all attachments without an expander when there are exactly four", () => {
    const attachments = [
      mockAttachment(1, "file-1.doc"),
      mockAttachment(2, "file-2.doc"),
      mockAttachment(3, "file-3.doc"),
      mockAttachment(4, "file-4.doc"),
    ];

    render(<AttachmentList attachments={attachments} />);

    expect(screen.getByText("file-1.doc")).toBeInTheDocument();
    expect(screen.getByText("file-4.doc")).toBeInTheDocument();
    expect(screen.queryByText("+1 more")).not.toBeInTheDocument();
  });

  it("collapses attachments beyond four behind a '+N more' expander", () => {
    const attachments = [
      mockAttachment(1, "file-1.doc"),
      mockAttachment(2, "file-2.doc"),
      mockAttachment(3, "file-3.doc"),
      mockAttachment(4, "file-4.doc"),
      mockAttachment(5, "file-5.doc"),
    ];

    render(<AttachmentList attachments={attachments} />);

    expect(screen.getByText("file-1.doc")).toBeInTheDocument();
    expect(screen.getByText("file-2.doc")).toBeInTheDocument();
    expect(screen.getByText("file-3.doc")).toBeInTheDocument();
    expect(screen.getByText("file-4.doc")).toBeInTheDocument();
    expect(screen.queryByText("file-5.doc")).not.toBeInTheDocument();
    expect(screen.getByText("+1 more")).toBeInTheDocument();
  });

  it("expands and collapses the remaining attachments via the '+N more' expander", async () => {
    const attachments = [
      mockAttachment(1, "file-1.doc"),
      mockAttachment(2, "file-2.doc"),
      mockAttachment(3, "file-3.doc"),
      mockAttachment(4, "file-4.doc"),
      mockAttachment(5, "file-5.doc"),
    ];

    render(<AttachmentList attachments={attachments} />);

    await userEvent.click(screen.getByText("+1 more"));

    expect(screen.getByText("file-5.doc")).toBeInTheDocument();
    expect(screen.getByText("Show less")).toBeInTheDocument();

    await userEvent.click(screen.getByText("Show less"));

    expect(screen.queryByText("file-5.doc")).not.toBeInTheDocument();
    expect(screen.getByText("+1 more")).toBeInTheDocument();
  });

  it("renders a blocked state without preview or download links when the malware scan found malware", () => {
    const attachments = [mockAttachment(1, "suspicious.exe", "malware_found")];

    render(<AttachmentList attachments={attachments} />);

    expect(screen.getByText("suspicious.exe")).toBeInTheDocument();
    expect(screen.getByText("Blocked")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Preview file: suspicious.exe" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Download file: suspicious.exe" })
    ).not.toBeInTheDocument();
  });
});
