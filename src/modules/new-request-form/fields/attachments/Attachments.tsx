import {
  FileUpload,
  Field as GardenField,
  Input,
  Label,
  Message,
  FileList,
} from "@zendeskgarden/react-forms";
import {
  Close,
  Notification,
  Title,
  useToast,
} from "@zendeskgarden/react-notifications";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import type { AttachmentField } from "../../data-types";
import { FileListItem } from "./FileListItem";
import type { AttachedFile } from "./useAttachedFiles";
import { useAttachedFiles } from "./useAttachedFiles";

interface AttachmentProps {
  field: AttachmentField;
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

export function Attachments({ field }: AttachmentProps): JSX.Element {
  const { label, error, name, attachments } = field;
  const {
    files,
    addPendingFile,
    setPendingFileProgress,
    setUploaded,
    removePendingFile,
    removeUploadedFile,
    setError
  } = useAttachedFiles(
    attachments.map((value) => ({
      status: "uploaded",
      value,
    })) ?? []
  );

  const { addToast } = useToast();
  const { t } = useTranslation();

  const errorMessage = (file: File, xhr: XMLHttpRequest) => {
    if (xhr.response?.error == "RecordInvalid") {
      return xhr.response?.details?.base?.[0]?.description;
    } else {
      return t(
        "new-request-form.attachments.upload-error-description",
        "There was an error uploading {{fileName}}. Try again or upload another file.",
        { fileName: file.name }
      );
    }
  };

  const notifyError = useCallback(
    (errorMessage: string) => {
      addToast(({ close }) => (
        <Notification type="error">
          <Title>
            {t(
              "new-request-form.attachments.upload-error-title",
              "Upload error"
            )}
          </Title>
          {errorMessage}
          <Close
            aria-label={t("new-request-form.close-label", "Close")}
            onClick={close}
          />
        </Notification>
      ));
    },
    [addToast, t]
  );

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const csrfToken = await fetchCsrfToken();
      for (const file of acceptedFiles) {
        // fetch doesn't support upload progress, so we use XMLHttpRequest
        const xhr = new XMLHttpRequest();

        const url = new URL(`${window.location.origin}/api/v2/uploads.json`);
        url.searchParams.append("filename", file.name);
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
            setError(pendingId, errorMessage(file, xhr));
          }
        });

        xhr.addEventListener("error", () => {
          notifyError(errorMessage(file, xhr));
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
      setError,
    ]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const handleRemove = async (file: AttachedFile) => {
    if (file.status === "pending") {
      file.xhr.abort();
      removePendingFile(file.id);
    } else if (file.status === "error") {
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
      <Label>{label}</Label>
      {error && <Message validation="error">{error}</Message>}
      <FileUpload {...getRootProps()} isDragging={isDragActive}>
        {isDragActive ? (
          <span>
            {t(
              "new-request-form.attachments.drop-files-label",
              "Drop files here"
            )}
          </span>
        ) : (
          <span>
            {t(
              "new-request-form.attachments.choose-file-label",
              "Choose a file or drag and drop here"
            )}
          </span>
        )}
        <Input {...getInputProps()} />
      </FileUpload>
      <FileList>
        {files.map((file) => (
          <FileListItem
            key={file.status === "pending" || file.status === "error" ? file.id : file.value.id}
            file={file}
            onRemove={() => {
              handleRemove(file);
            }}
          />
        ))}
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
