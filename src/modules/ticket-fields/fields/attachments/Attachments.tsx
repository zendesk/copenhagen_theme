import {
  FileUpload,
  Field as GardenField,
  Input,
  FileList,
} from "@zendeskgarden/react-forms";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import type { AttachmentField } from "../../data-types/AttachmentsField";
import { FileListItem } from "./FileListItem";
import type { AttachedFile } from "./useAttachedFiles";
import { useAttachedFiles } from "./useAttachedFiles";
import { notify } from "../../../shared";
import styled from "styled-components";

const StyledErrorMessage = styled(GardenField.Message)<{
  hasDescription?: boolean;
}>`
  margin-top: ${(props) => (props.hasDescription ? props.theme.space.xxs : 0)};
`;

const VisuallyHiddenLiveRegion = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

interface AttachmentProps {
  field: AttachmentField;
  baseLocale: string;
  onUploadingChange?: (isUploading: boolean) => void;
}

async function fetchCsrfToken() {
  const response = await fetch("/api/v2/users/me.json");
  const {
    user: { authenticity_token },
  } = await response.json();
  return authenticity_token as string;
}

export interface UploadFileResponse {
  upload: {
    attachment: {
      file_name: string;
      content_url: string;
    };
    token: string;
  };
}

function getFileKey(file: AttachedFile): string {
  return file.status === "pending" ? file.id : file.value.id;
}

function getFileName(file: AttachedFile): string {
  return file.status === "pending" ? file.file_name : file.value.file_name;
}

export function Attachments({
  field,
  baseLocale,
  onUploadingChange,
}: AttachmentProps): JSX.Element {
  const { label, error, name, attachments } = field;
  const {
    files,
    addPendingFile,
    setPendingFileProgress,
    setUploaded,
    removePendingFile,
    removeUploadedFile,
  } = useAttachedFiles(
    attachments.map((value) => ({
      status: "uploaded",
      value,
    })) ?? []
  );
  const { t } = useTranslation();
  const [liveMessage, setLiveMessage] = useState("");
  const fileUploadRef = useRef<HTMLDivElement>(null);
  const removeButtonRefs = useRef<Map<string, HTMLButtonElement | null>>(
    new Map()
  );

  const isUploading = files.some((file) => file.status === "pending");

  useEffect(() => {
    onUploadingChange?.(isUploading);
  }, [isUploading, onUploadingChange]);

  const setRemoveButtonRef = useCallback(
    (key: string, node: HTMLButtonElement | null) => {
      if (node) {
        removeButtonRefs.current.set(key, node);
      } else {
        removeButtonRefs.current.delete(key);
      }
    },
    []
  );

  const focusAfterRemoval = useCallback(
    (removedIndex: number, remainingKeys: string[]) => {
      const fallbackKey =
        remainingKeys[removedIndex - 1] ?? remainingKeys[removedIndex] ?? null;
      const fallbackButton = fallbackKey
        ? removeButtonRefs.current.get(fallbackKey)
        : null;

      if (fallbackButton) {
        fallbackButton.focus();
        return;
      }

      const uploadRoot = fileUploadRef.current;
      const focusTarget =
        uploadRoot?.querySelector<HTMLElement>(
          'input[type="file"], button, [tabindex]:not([tabindex="-1"])'
        ) ?? uploadRoot;

      focusTarget?.focus();
    },
    []
  );

  const uploadFailedTitle = useCallback(
    (file: File) => {
      return t("cph-theme-ticket-fields.upload-failed-title", "Upload failed", {
        fileName: file.name,
      });
    },
    [t]
  );

  const convertError = useCallback(
    (file: File, xhr: XMLHttpRequest) => {
      if (
        xhr.response?.error == "RecordInvalid" &&
        !!xhr.response?.details?.base
      ) {
        const errorMessage = xhr.response?.details?.base
          ?.map(
            (errorString: { description: string }) => errorString?.description
          )
          .join(t("cph-theme-ticket-fields.attachments.error-separator", "; "));
        return {
          title: uploadFailedTitle(file),
          errorMessage,
        };
      } else if (
        xhr.response?.error == "AttachmentFilenameTooLong" ||
        xhr.response?.error == "AttachmentTooLarge"
      ) {
        return {
          title: uploadFailedTitle(file),
          errorMessage: xhr.response?.description,
        };
      } else {
        return {
          title: t(
            "cph-theme-ticket-fields.attachments.upload-error-title",
            "Upload error"
          ),
          errorMessage: t(
            "cph-theme-ticket-fields.attachments.upload-error-description",
            "There was an error uploading {{fileName}}. Try again or upload another file.",
            { fileName: file.name }
          ),
        };
      }
    },
    [t, uploadFailedTitle]
  );

  const notifyError = useCallback((title: string, errorMessage: string) => {
    notify({
      title,
      message: errorMessage,
      type: "error",
    });
  }, []);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const csrfToken = await fetchCsrfToken();
      for (const file of acceptedFiles) {
        // fetch doesn't support upload progress, so we use XMLHttpRequest
        const xhr = new XMLHttpRequest();

        const url = new URL(`${window.location.origin}/api/v2/uploads.json`);
        url.searchParams.append("filename", file.name);
        url.searchParams.append("locale", baseLocale);
        xhr.open("POST", url);

        // If the browser returns a type for the file, use it as the Content-Type header,
        // otherwise we fall back to application/octet-stream and let the backend
        // determine the file type.
        if (file.type) {
          xhr.setRequestHeader("Content-Type", file.type);
        } else {
          xhr.setRequestHeader("Content-Type", "application/octet-stream");
        }
        xhr.setRequestHeader("X-CSRF-Token", csrfToken);
        xhr.responseType = "json";

        const pendingId = crypto.randomUUID();

        addPendingFile(pendingId, file.name, xhr);

        xhr.upload.addEventListener("progress", ({ loaded, total }) => {
          const progress = Math.round((loaded / total) * 100);

          // There is a bit of delay between the upload ending and the
          // load event firing, so we don't want to set the progress to 100
          // otherwise it is not clear that the upload is still in progress.
          if (progress <= 90) {
            setPendingFileProgress(pendingId, progress);
          }
        });

        xhr.addEventListener("load", () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const {
              upload: {
                attachment: { file_name, content_url },
                token,
              },
            } = xhr.response as UploadFileResponse;
            setUploaded(pendingId, { id: token, file_name, url: content_url });
          } else {
            const { title, errorMessage } = convertError(file, xhr);
            notifyError(title, errorMessage);
            removePendingFile(pendingId);
          }
        });

        xhr.addEventListener("error", () => {
          const { title, errorMessage } = convertError(file, xhr);
          notifyError(title, errorMessage);
          removePendingFile(pendingId);
        });

        xhr.send(file);
      }
    },
    [
      addPendingFile,
      removePendingFile,
      setPendingFileProgress,
      setUploaded,
      notifyError,
      convertError,
      baseLocale,
    ]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const handleRemove = async (file: AttachedFile, index: number) => {
    const fileName = getFileName(file);
    const remainingKeys = files
      .filter((_, i) => i !== index)
      .map((entry) => getFileKey(entry));

    /*
     * Focus-first: move keyboard focus before the item unmounts so focus does
     * not drop to document.body (PromptInput TagGroup pattern).
     */
    focusAfterRemoval(index, remainingKeys);
    setLiveMessage(
      t(
        "cph-theme-ticket-fields.attachments.file-removed",
        "Removed {{fileName}}",
        { fileName }
      )
    );

    if (file.status === "pending") {
      file.xhr.abort();
      removePendingFile(file.id);
    } else {
      const csrfToken = await fetchCsrfToken();
      const token = file.value.id;
      removeUploadedFile(file.value.id);
      await fetch(`/api/v2/uploads/${token}.json`, {
        method: "DELETE",
        headers: { "X-CSRF-Token": csrfToken },
      });
    }
  };

  return (
    <GardenField>
      <GardenField.Label>
        {label}
        {field.isRequired ? "*" : ""}
      </GardenField.Label>

      {field.description && (
        <GardenField.Hint>{field.description}</GardenField.Hint>
      )}

      {error && (
        <StyledErrorMessage
          validation="error"
          hasDescription={!!field.description}
        >
          {error}
        </StyledErrorMessage>
      )}

      <div ref={fileUploadRef}>
        <FileUpload {...getRootProps()} isDragging={isDragActive}>
          {isDragActive ? (
            <span>
              {t(
                "cph-theme-ticket-fields.attachments.drop-files-label",
                "Drop files here"
              )}
            </span>
          ) : (
            <span>
              {t(
                "cph-theme-ticket-fields.attachments.choose-file-label",
                "Choose a file or drag and drop here"
              )}
            </span>
          )}
          <Input {...getInputProps()} />
        </FileUpload>
      </div>
      <VisuallyHiddenLiveRegion aria-live="polite" aria-atomic="true">
        {liveMessage}
      </VisuallyHiddenLiveRegion>
      <FileList>
        {files.map((file, index) => {
          const key = getFileKey(file);

          return (
            <FileListItem
              key={key}
              ref={(node) => setRemoveButtonRef(key, node)}
              file={file}
              onRemove={() => {
                void handleRemove(file, index);
              }}
            />
          );
        })}
      </FileList>
      {files.map(
        (file) =>
          file.status === "uploaded" && (
            <input
              key={file.value.id}
              type="hidden"
              name={name}
              value={JSON.stringify(file.value)}
            />
          )
      )}
    </GardenField>
  );
}
