import { useCallback, useState } from "react";
import type { Attachment } from "../../data-types";

export interface PendingFile {
  status: "pending";
  id: string;
  file_name: string;
  progress: number;
  xhr: XMLHttpRequest;
}

export interface UploadedFile {
  status: "uploaded";
  value: Attachment;
}

export interface ErrorFile {
  status: "error";
  id: string;
  file_name: string;
  error: string;
}

export type AttachedFile = PendingFile | UploadedFile | ErrorFile;

export function useAttachedFiles(initialValue: AttachedFile[]) {
  const [files, setFiles] = useState(initialValue);

  const addPendingFile = useCallback(
    (id: string, file_name: string, xhr: XMLHttpRequest) => {
      setFiles((current) => [
        ...current,
        { status: "pending", id, file_name, progress: 0, xhr },
      ]);
    },
    []
  );

  const setPendingFileProgress = useCallback((id: string, progress: number) => {
    setFiles((current) =>
      current.map((file) =>
        file.status === "pending" && file.id === id
          ? { ...file, progress }
          : file
      )
    );
  }, []);

  const removePendingFile = useCallback((id: string) => {
    setFiles((current) =>
      current.filter((file) => file.status !== "pending" || file.id !== id)
    );
  }, []);

  const removeUploadedFile = useCallback((id: string) => {
    setFiles((current) =>
      current.filter(
        (file) => file.status !== "uploaded" || file.value.id !== id
      )
    );
  }, []);

  const setUploaded = useCallback((pendingId: string, value: Attachment) => {
    setFiles((current) =>
      current.map((file) =>
        file.status === "pending" && file.id === pendingId
          ? { status: "uploaded", value }
          : file
      )
    );
  }, []);

  const setError = useCallback((pendingId: string, error: string) => {
    setFiles((current) => {
      return current.map((file) =>
          file.status === "pending" && file.id === pendingId
              ? {status: "error", id: pendingId, file_name: file.file_name, error}
              : file
      )
    });
  }, []);

  return {
    files,
    addPendingFile,
    setPendingFileProgress,
    removePendingFile,
    removeUploadedFile,
    setUploaded,
    setError
  };
}
