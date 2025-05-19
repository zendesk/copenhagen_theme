export interface Attachment {
  id: string;
  file_name: string;
  url: string;
  error?: string;
}

export interface AttachmentField {
  name: string;
  label: string;
  error: string | null;
  attachments: Attachment[];
}
