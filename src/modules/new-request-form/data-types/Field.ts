export interface Field {
  id: number;
  name: string;
  value?: string | string[] | boolean;
  error: string | null;
  label: string;
  required: boolean;
  description: string;
  type: string;
  termsOfUseLink?: string;
  privacyNoticeLink?: string;
  options: FieldOption[];
  relationship_target_type?: string;
}

export interface FieldOption {
  name: string;
  value: string;
}
