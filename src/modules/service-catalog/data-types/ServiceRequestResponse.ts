export interface ServiceRequestResponse {
  error: string;
  description: string;
  details: {
    base: [
      {
        description: string;
        error: string;
        field_key: number;
      }
    ];
  };
}
