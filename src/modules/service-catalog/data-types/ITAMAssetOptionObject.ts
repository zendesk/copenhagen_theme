import type { TicketFieldOptionObject } from "../../ticket-fields/data-types/TicketFieldObject";

/**
 * Extended option type for ITAM (IT Asset Management) assets from Service Catalog.
 * These options include additional metadata like serial numbers and asset type IDs.
 */
export interface ITAMAssetOptionObject extends TicketFieldOptionObject {
  serialNumber?: string;
  item_asset_type_id?: string;
}
