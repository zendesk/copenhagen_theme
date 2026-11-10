export interface AssetConfig {
  assetTypeIds: string[];
  assetIds: string[];
  isAssetTypeHidden: boolean;
  assetTypeHiddenValue: string;
  assetTypeLabel?: string;
  assetTypeDescription?: string;
  assetTypeIsRequired: boolean;
  assetLabel?: string;
  assetDescription?: string;
  assetIsRequired: boolean;
}
