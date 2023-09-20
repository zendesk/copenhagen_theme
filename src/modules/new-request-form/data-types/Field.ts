export interface Field {
  id: number;
  name: string;
  value?: string | boolean;
  error: string;
  label: string;
  required: boolean;
  description: string;
  type: string;
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
