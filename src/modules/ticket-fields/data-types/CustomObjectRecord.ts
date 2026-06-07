export interface CustomObjectRecord {
  id: string;
  name: string;
  custom_object_key: string;
  custom_object_fields: Record<string, string | number | boolean | unknown>;
}
