export interface ServiceRequestValidationError {
  description: string;
  error: string;
  field_id?: number | null;
}

export interface ServiceRequestResponse {
  error: string;
  description: string;
  details?: {
    base?: ServiceRequestValidationError[];
  };
}
