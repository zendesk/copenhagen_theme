export interface Field {
  name: string;
  value: string;
  error: string;
  label: string;
  required: boolean;
  description: string;
  type: string;
  id: string;
  options: FieldOption[];
  attachments?: Attachment[];
}

export interface FieldOption {
  name: string;
  value: string;
}

export interface Attachment {
  id: string;
  file_name: string;
  url: string;
}
