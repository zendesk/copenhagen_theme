export interface Request {
  id: number;
  subject: string;
  description: string;
  created_at: string;
  updated_at: string;
  status: "new" | "open" | "pending" | "hold" | "solved" | "closed";
  custom_status_id?: number;
  priority: string;
  requester_id: number;
  type: string;
  custom_fields: CustomField[];
}

interface CustomField {
  id: number;
  value: null | string | string[] | boolean;
}
