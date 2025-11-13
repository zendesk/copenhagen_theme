import type { BaseTicketField } from "./BaseTicketField";

/**
 * This interface represents the
 * [ticket field object](https://developer.zendesk.com/api-reference/help_center/help-center-templates/objects/#ticket-field-object)
 * available in the New Request Page template.
 */
export interface TicketFieldObject extends BaseTicketField {
  id: number;
  name: string;
  value: string | string[] | boolean | null;
  error: string | null;
  label: string;
  required: boolean;
  options: TicketFieldOptionObject[];
}

export interface TicketFieldOptionObject {
  name: string;
  value: string;
}

/**
 * Extended option type for ITAM (IT Asset Management) assets from Service Catalog.
 * These options include additional metadata like serial numbers and asset type IDs.
 */
export interface ITAMAssetOptionObject extends TicketFieldOptionObject {
  serialNumber?: string;
  item_asset_type_id?: string;
}
