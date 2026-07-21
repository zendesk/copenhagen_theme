export interface ServiceRequestValidationError {
  description: string;
  error: string;
  field_key?: number;
}

export interface ServiceRequestResponse {
  error: string;
  description: string;
  details?: {
    base?: ServiceRequestValidationError[];
  };
}
