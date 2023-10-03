export interface Field {
  id: number;
  name: string;
  value?: string | string[] | boolean;
  error: string;
  label: string;
  required: boolean;
  description: string;
  type: string;
  options: FieldOption[];
}

export interface FieldOption {
  name: string;
  value: string;
}
