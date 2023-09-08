import { Anchor } from "@zendeskgarden/react-buttons";
import { File, FileList } from "@zendeskgarden/react-forms";
import { Progress } from "@zendeskgarden/react-loaders";
import { Tooltip } from "@zendeskgarden/react-tooltips";
import type { KeyboardEvent } from "react";
import styled from "styled-components";
import type { AttachedFile } from "./useAttachedFiles";

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

  return (
    <FileList.Item>
      <File type="generic" title={fileName} onKeyDown={handleFileKeyDown}>
        {file.status === "pending" ? (
          <>
            <FileNameWrapper>{fileName}</FileNameWrapper>
            <Tooltip content="Stop upload">
              <File.Close
                aria-label="Stop upload"
                onClick={() => {
                  onRemove();
                }}
                onKeyDown={handleCloseKeyDown}
              />
            </Tooltip>
            <Progress
              value={file.progress}
              aria-label={`Uploading ${fileName}`}
            />
          </>
        ) : (
          <>
            <FileNameWrapper>
              <Anchor isExternal href={file.value.url} target="_blank">
                {fileName}
              </Anchor>
            </FileNameWrapper>
            <Tooltip content="Remove file">
              <File.Delete
                aria-label="Remove file"
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
