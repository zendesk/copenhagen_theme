import { Anchor } from "@zendeskgarden/react-buttons";
import { File, FileList } from "@zendeskgarden/react-forms";
import { Progress } from "@zendeskgarden/react-loaders";
import { focusStyles, getColor } from "@zendeskgarden/react-theming";
import { Tooltip } from "@zendeskgarden/react-tooltips";
import TrashIcon from "@zendeskgarden/svg-icons/src/16/trash-stroke.svg";
import XIcon from "@zendeskgarden/svg-icons/src/16/x-stroke.svg";
import type { ForwardedRef, KeyboardEvent, Ref } from "react";
import { forwardRef } from "react";
import styled from "styled-components";
import type { AttachedFile } from "./useAttachedFiles";
import { useTranslation } from "react-i18next";

interface FileListItemProps {
  file: AttachedFile;
  onRemove: () => void;
}

const FileNameWrapper = styled.div`
  flex: 1;
`;

/*
 * Custom remove control — keyboard tab stop for remove/stop-upload. Garden's
 * File.Close / File.Delete hardcode tabIndex={-1} after props, so they cannot
 * be reached by Tab. Unlike PromptInput FileTag (one tab stop; ring on the
 * chip via :has), HC attachments also tab to the file link, so the focus ring
 * stays on this button — not the whole File chip.
 */
const StyledRemoveButton = styled.button<{ $isDanger?: boolean }>`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  transition: opacity 0.25s ease-in-out;
  opacity: 0.8;
  border: none;
  border-radius: ${(props) => props.theme.borderRadii.md};
  background: transparent;
  cursor: pointer;
  padding: 0;
  color: ${(props) =>
    getColor({
      theme: props.theme,
      variable: props.$isDanger ? "foreground.danger" : "foreground.subtle",
    })};
  appearance: none;

  &:hover {
    opacity: 0.9;
  }

  &:focus {
    outline: none;
  }

  ${(props) =>
    focusStyles({
      theme: props.theme,
      selector: "&:focus-visible",
      color: { variable: "border.primaryEmphasis" },
    })}
`;

const StyledAttachmentFile = styled(File)`
  & ${StyledRemoveButton} {
    width: ${(props) => `${props.theme.space.base * 10}px`};
    height: ${(props) => `${props.theme.space.base * 10}px`};
    margin-inline-end: ${(props) => `-${props.theme.space.base * 3}px`};
  }
`;
const RemoveButton = forwardRef(function RemoveButton(
  {
    ariaLabel,
    isDanger,
    onRemove,
    tooltip,
  }: {
    ariaLabel: string;
    isDanger?: boolean;
    onRemove: () => void;
    tooltip: string;
  },
  ref: ForwardedRef<HTMLButtonElement>
) {
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "Delete" && event.key !== "Backspace") {
      return;
    }

    event.preventDefault();
    onRemove();
  };

  return (
    <Tooltip content={tooltip}>
      <StyledRemoveButton
        ref={ref}
        type="button"
        $isDanger={isDanger}
        aria-label={ariaLabel}
        aria-describedby={undefined}
        onClick={onRemove}
        onKeyDown={handleKeyDown}
      >
        {isDanger ? (
          <TrashIcon aria-hidden="true" focusable="false" />
        ) : (
          <XIcon aria-hidden="true" focusable="false" />
        )}
      </StyledRemoveButton>
    </Tooltip>
  );
});

export const FileListItem = forwardRef(function FileListItem(
  { file, onRemove }: FileListItemProps,
  ref: Ref<HTMLButtonElement>
): JSX.Element {
  const { t } = useTranslation();

  const fileName =
    file.status === "pending" ? file.file_name : file.value.file_name;

  const stopUploadLabel = t(
    "cph-theme-ticket-fields.attachments.stop-upload",
    "Stop upload"
  );
  const removeFileLabel = t(
    "cph-theme-ticket-fields.attachments.remove-file",
    "Remove file"
  );

  return (
    <FileList.Item>
      <StyledAttachmentFile type="generic">
        {file.status === "pending" ? (
          <>
            <FileNameWrapper>{fileName}</FileNameWrapper>
            <RemoveButton
              ref={ref}
              tooltip={stopUploadLabel}
              ariaLabel={t(
                "cph-theme-ticket-fields.attachments.stop-upload-aria-label",
                "Stop uploading {{fileName}}",
                { fileName }
              )}
              onRemove={onRemove}
            />
            <Progress
              value={file.progress}
              aria-label={t(
                "cph-theme-ticket-fields.attachments.uploading",
                "Uploading {{fileName}}",
                { fileName }
              )}
            />
          </>
        ) : (
          <>
            <FileNameWrapper>
              <Anchor isExternal href={file.value.url} target="_blank">
                {fileName}
              </Anchor>
            </FileNameWrapper>
            <RemoveButton
              ref={ref}
              isDanger
              tooltip={removeFileLabel}
              ariaLabel={t(
                "cph-theme-ticket-fields.attachments.remove-file-aria-label",
                "Remove file: {{fileName}}",
                { fileName }
              )}
              onRemove={onRemove}
            />
            <Progress value={100} aria-hidden="true" />
          </>
        )}
      </StyledAttachmentFile>
    </FileList.Item>
  );
});
