export interface CustomStatus {
  id: number;
  status_category: "new" | "open" | "pending" | "hold" | "solved";
  label?: string;
  end_user_label?: string;
  description: string;
  end_user_description?: string;
}
