export interface Field {
  name: string;
  value: string;
  error: string;
  label: string;
  required: boolean;
  description: string;
  type: string;
  id: string;
  options: Option[];
}

interface Option {
  name: string;
  value: string;
}
