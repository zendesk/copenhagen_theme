import { useState } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import { Button } from "@zendeskgarden/react-buttons";
import { Spinner } from "@zendeskgarden/react-loaders";
import { Tooltip } from "@zendeskgarden/react-tooltips";
import { MD } from "@zendeskgarden/react-typography";
import { Tag } from "@zendeskgarden/react-tags";
import { getColor } from "@zendeskgarden/react-theming";
import DownloadIcon from "@zendeskgarden/svg-icons/src/16/download-stroke.svg";
import EyeIcon from "@zendeskgarden/svg-icons/src/16/eye-stroke.svg";
import FileDocumentIcon from "@zendeskgarden/svg-icons/src/16/file-document-stroke.svg";
import FileGenericIcon from "@zendeskgarden/svg-icons/src/16/file-generic-stroke.svg";
import FileImageIcon from "@zendeskgarden/svg-icons/src/16/file-image-stroke.svg";
import FilePdfIcon from "@zendeskgarden/svg-icons/src/16/file-pdf-stroke.svg";
import FilePresentationIcon from "@zendeskgarden/svg-icons/src/16/file-presentation-stroke.svg";
import FileSpreadsheetIcon from "@zendeskgarden/svg-icons/src/16/file-spreadsheet-stroke.svg";
import FileZipIcon from "@zendeskgarden/svg-icons/src/16/file-zip-stroke.svg";
import type { ApprovalRequestAttachment } from "../../types";

// Show up to this many attachments; anything beyond collapses behind a
// "+N more" expander
const MAX_VISIBLE_ATTACHMENTS = 4;
const MALWARE_FOUND_STATUS = "malware_found";

export type FileTypeIconKey =
  | "pdf"
  | "image"
  | "spreadsheet"
  | "presentation"
  | "zip"
  | "document"
  | "generic";

// Strict allowlist of content types the browser reliably renders inline when
// previewing. Everything else is download-only. Note that `image/svg+xml` and
// `text/html` are deliberately excluded: they execute as live documents and
// must never be previewed as a blob URL on the site's origin.
const PREVIEWABLE_CONTENT_TYPES = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/webp",
  "image/bmp",
  "text/plain",
  "video/mp4",
  "video/webm",
  "audio/mpeg",
  "audio/mp4",
  "audio/ogg",
  "audio/wav",
  "audio/webm",
]);

export function isPreviewable(contentType: string | undefined): boolean {
  return PREVIEWABLE_CONTENT_TYPES.has(contentType?.toLowerCase() ?? "");
}

export function getFileTypeIconKey(
  contentType: string | undefined
): FileTypeIconKey {
  const type = contentType?.toLowerCase() ?? "";

  if (type === "application/pdf") {
    return "pdf";
  }
  if (type.startsWith("image/")) {
    return "image";
  }
  if (
    type === "text/csv" ||
    type === "application/vnd.ms-excel" ||
    type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    return "spreadsheet";
  }
  if (
    type === "application/vnd.ms-powerpoint" ||
    type ===
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  ) {
    return "presentation";
  }
  if (
    type === "application/zip" ||
    type === "application/x-zip-compressed" ||
    type === "application/x-zip"
  ) {
    return "zip";
  }
  if (
    type.startsWith("text/") ||
    type === "application/msword" ||
    type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return "document";
  }

  return "generic";
}

const FILE_TYPE_ICONS: Record<FileTypeIconKey, typeof FileGenericIcon> = {
  pdf: FilePdfIcon,
  image: FileImageIcon,
  spreadsheet: FileSpreadsheetIcon,
  presentation: FilePresentationIcon,
  zip: FileZipIcon,
  document: FileDocumentIcon,
  generic: FileGenericIcon,
};

const AttachmentSection = styled.div`
  margin-top: ${(props) => props.theme.space.md}; /* 20px */
`;

const AttachmentsLabel = styled(MD)`
  margin-bottom: ${(props) => props.theme.space.xs}; /* 8px */
`;

const AttachmentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${(props) => props.theme.space.xs}; /* 8px */

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const AttachmentRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.space.xs}; /* 8px */
  min-width: 0;
  border: ${(props) => props.theme.borders.sm}
    ${({ theme }) => getColor({ theme, hue: "grey", shade: 300 })};
  border-radius: ${(props) => props.theme.borderRadii.md}; /* 4px */
  padding: ${(props) => `${props.theme.space.xxs} ${props.theme.space.sm}`};
`;

const AttachmentFileIcon = styled.div`
  flex-shrink: 0;
  display: inline-flex;

  svg {
    color: ${({ theme }) => getColor({ theme, hue: "grey", shade: 600 })};
  }
`;

const AttachmentName = styled(MD)`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const iconActionCss = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: ${(props) => props.theme.borderRadii.md}; /* 4px */
  padding: ${(props) => props.theme.space.xxs}; /* 4px */

  svg {
    color: ${({ theme }) => getColor({ theme, hue: "grey", shade: 600 })};
  }

  &:hover svg {
    color: ${({ theme }) => getColor({ theme, hue: "grey", shade: 700 })};
  }
`;

const IconButton = styled(Button)`
  ${iconActionCss}
`;

const PREVIEW_BLOB_URL_KEEP_ALIVE_MS = 60000;
const FETCH_TIMEOUT_MS = 30000;

const ShowMoreButton = styled(Button).attrs({ isLink: true })`
  margin-top: ${(props) => props.theme.space.sm}; /* 12px */
`;

const BlockedTag = styled(Tag)`
  flex-shrink: 0;
`;

interface AttachmentListProps {
  attachments: ApprovalRequestAttachment[];
}

function AttachmentList({ attachments }: AttachmentListProps) {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [busyAttachmentId, setBusyAttachmentId] = useState<string | null>(null);

  const isCollapsible = attachments.length > MAX_VISIBLE_ATTACHMENTS;
  const visibleAttachments =
    isExpanded || !isCollapsible
      ? attachments
      : attachments.slice(0, MAX_VISIBLE_ATTACHMENTS);
  const hiddenCount = attachments.length - MAX_VISIBLE_ATTACHMENTS;

  const previewLabel = t(
    "approval-requests.request.ticket-details.attachments.preview-file",
    "Preview file"
  );
  const downloadLabel = t(
    "approval-requests.request.ticket-details.attachments.download-file",
    "Download file"
  );
  const blockedLabel = t(
    "approval-requests.request.ticket-details.attachments.blocked-file",
    "Blocked"
  );

  // Fetch and handle as a typed blob; on timeout or error, fall back to a
  // native open. Attachments are capped at 10MB by the API.
  const fetchAttachmentAsBlob = async (
    attachment: ApprovalRequestAttachment
  ): Promise<Blob> => {
    const response = await fetch(attachment.content_url, {
      // AbortSignal.timeout isn't available in all runtimes; degrade to no timeout
      signal: AbortSignal.timeout?.call(AbortSignal, FETCH_TIMEOUT_MS),
    });

    if (!response.ok) {
      throw new Error("Error fetching attachment");
    }

    const data = await response.blob();

    return new Blob([data], { type: attachment.content_type });
  };

  const runWithBusyState = async (
    attachment: ApprovalRequestAttachment,
    action: () => Promise<void>
  ) => {
    setBusyAttachmentId(attachment.id);

    try {
      await action();
    } finally {
      setBusyAttachmentId(null);
    }
  };

  const handlePreview = async (attachment: ApprovalRequestAttachment) => {
    let blobUrl: string | undefined;

    try {
      const blob = await fetchAttachmentAsBlob(attachment);
      blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, "_blank", "noopener,noreferrer");
      setTimeout(
        () => URL.revokeObjectURL(blobUrl!),
        PREVIEW_BLOB_URL_KEEP_ALIVE_MS
      );
    } catch {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }

      window.open(attachment.content_url, "_blank", "noopener,noreferrer");
    }
  };

  const handleDownload = async (attachment: ApprovalRequestAttachment) => {
    let blobUrl: string | undefined;

    try {
      const blob = await fetchAttachmentAsBlob(attachment);
      blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = attachment.filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(
        () => URL.revokeObjectURL(blobUrl!),
        PREVIEW_BLOB_URL_KEEP_ALIVE_MS
      );
    } catch {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }

      window.open(attachment.content_url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <AttachmentSection>
      <AttachmentsLabel isBold>
        {t(
          "approval-requests.request.ticket-details.attachments.header",
          "Attachments"
        )}
      </AttachmentsLabel>
      <AttachmentsGrid>
        {visibleAttachments.map((attachment) => {
          const isBlocked =
            attachment.malware_scan_status === MALWARE_FOUND_STATUS;
          const isPreviewableFile = isPreviewable(attachment.content_type);
          const FileTypeIcon =
            FILE_TYPE_ICONS[getFileTypeIconKey(attachment.content_type)];

          return (
            <AttachmentRow key={attachment.id}>
              <AttachmentFileIcon aria-hidden="true">
                <FileTypeIcon />
              </AttachmentFileIcon>
              <AttachmentName title={attachment.filename}>
                {attachment.filename}
              </AttachmentName>
              {isBlocked ? (
                <Tooltip
                  content={t(
                    "approval-requests.request.ticket-details.attachments.blocked-file-tooltip",
                    "This file is unavailable because malware was detected"
                  )}
                >
                  <BlockedTag hue="red">{blockedLabel}</BlockedTag>
                </Tooltip>
              ) : (
                <>
                  {isPreviewableFile && (
                    <Tooltip content={previewLabel}>
                      <IconButton
                        isBasic
                        isPill
                        focusInset
                        disabled={busyAttachmentId === attachment.id}
                        onClick={() =>
                          runWithBusyState(attachment, () =>
                            handlePreview(attachment)
                          )
                        }
                        aria-label={t(
                          "approval-requests.request.ticket-details.attachments.preview-file-aria-label",
                          "Preview file: {{fileName}}",
                          { fileName: attachment.filename }
                        )}
                      >
                        {busyAttachmentId === attachment.id ? (
                          <Spinner size="small" />
                        ) : (
                          <EyeIcon aria-hidden="true" />
                        )}
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip content={downloadLabel}>
                    <IconButton
                      isBasic
                      isPill
                      focusInset
                      disabled={busyAttachmentId === attachment.id}
                      onClick={() =>
                        runWithBusyState(attachment, () =>
                          handleDownload(attachment)
                        )
                      }
                      aria-label={t(
                        "approval-requests.request.ticket-details.attachments.download-file-aria-label",
                        "Download file: {{fileName}}",
                        { fileName: attachment.filename }
                      )}
                    >
                      {busyAttachmentId === attachment.id ? (
                        <Spinner size="small" />
                      ) : (
                        <DownloadIcon aria-hidden="true" />
                      )}
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </AttachmentRow>
          );
        })}
      </AttachmentsGrid>
      {isCollapsible &&
        hiddenCount > 0 &&
        (isExpanded ? (
          <ShowMoreButton
            onClick={() => setIsExpanded(false)}
            aria-label={t(
              "approval-requests.request.ticket-details.attachments.show-less-aria-label",
              "Show fewer attachments"
            )}
          >
            {t(
              "approval-requests.request.ticket-details.attachments.show-less",
              "Show less"
            )}
          </ShowMoreButton>
        ) : (
          <ShowMoreButton
            onClick={() => setIsExpanded(true)}
            aria-label={t(
              "approval-requests.request.ticket-details.attachments.show-more-aria-label",
              "Show {{count}} more attachments",
              { count: hiddenCount }
            )}
          >
            {t(
              "approval-requests.request.ticket-details.attachments.show-more",
              "+{{count}} more",
              { count: hiddenCount }
            )}
          </ShowMoreButton>
        ))}
    </AttachmentSection>
  );
}

export default AttachmentList;
