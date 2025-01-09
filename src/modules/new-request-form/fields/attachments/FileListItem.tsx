import { Anchor } from "@zendeskgarden/react-buttons";
import { File, FileList } from "@zendeskgarden/react-forms";
import { Progress } from "@zendeskgarden/react-loaders";
import { Tooltip } from "@zendeskgarden/react-tooltips";
import type { KeyboardEvent } from "react";
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

export function FileListItem({
  file,
  onRemove,
}: FileListItemProps): JSX.Element {
  const { t } = useTranslation();

  const handleFileKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.code === "Delete" || e.code === "Backspace") {
      e.preventDefault();
      onRemove();
    }
  };

  const handleCloseKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (
      e.code === "Enter" ||
      e.code === "Space" ||
      e.code === "Delete" ||
      e.code === "Backspace"
    ) {
      e.preventDefault();
      onRemove();
    }
  };

  const fileName =
    file.status === "pending" ? file.file_name : file.value.file_name;

  const stopUploadLabel = t(
    "new-request-form.attachments.stop-upload",
    "Stop upload"
  );
  const removeFileLabel = t(
    "new-request-form.attachments.remove-file",
    "Remove file"
  );

  return (
    <FileList.Item>
      <File
        type="generic"
        tabIndex={0}
        aria-label={t(
          "new-request-form.attachments.file",
          "File: {{fileName}}, press delete to remove",
          { fileName }
        )}
        onKeyDown={handleFileKeyDown}
      >
        {file.status === "pending" ? (
          <>
            <FileNameWrapper>{fileName}</FileNameWrapper>
            <Tooltip content={stopUploadLabel}>
              <File.Close
                aria-label={t(
                  "new-request-form.attachments.stop-upload-aria-label",
                  "Stop uploading {{fileName}}",
                  { fileName }
                )}
                aria-describedby={undefined}
                onClick={() => {
                  onRemove();
                }}
                onKeyDown={handleCloseKeyDown}
              />
            </Tooltip>
            <Progress
              value={file.progress}
              aria-label={t(
                "new-request-form.attachments.uploading",
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
            <Tooltip content={removeFileLabel}>
              <File.Delete
                aria-label={t(
                  "new-request-form.attachments.remove-file-aria-label",
                  "Remove file: {{fileName}}",
                  { fileName }
                )}
                aria-describedby={undefined}
                onClick={() => {
                  onRemove();
                }}
                onKeyDown={handleCloseKeyDown}
              />
            </Tooltip>
            <Progress value={100} aria-hidden="true" />
          </>
        )}
      </File>
    </FileList.Item>
  );
}
