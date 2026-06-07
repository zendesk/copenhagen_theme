# DCR (Data Collection Rule) Ingestion Reference

## DCR ARM Template

Full ARM template for a DCR that targets a custom `_CL` table via the Log Ingestion API.

```json
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {
    "workspaceName": { "type": "string" },
    "workspaceResourceId": { "type": "string" },
    "dceName": { "type": "string" },
    "dcrName": { "type": "string" },
    "tableName": { "type": "string", "defaultValue": "ProductHubSpotContacts_CL" },
    "location": { "type": "string", "defaultValue": "[resourceGroup().location]" }
  },
  "resources": [
    {
      "type": "Microsoft.Insights/dataCollectionEndpoints",
      "apiVersion": "2022-06-01",
      "name": "[parameters('dceName')]",
      "location": "[parameters('location')]",
      "properties": {
        "networkAcls": {
          "publicNetworkAccess": "Enabled"
        }
      }
    },
    {
      "type": "Microsoft.Insights/dataCollectionRules",
      "apiVersion": "2022-06-01",
      "name": "[parameters('dcrName')]",
      "location": "[parameters('location')]",
      "dependsOn": [
        "[resourceId('Microsoft.Insights/dataCollectionEndpoints', parameters('dceName'))]"
      ],
      "properties": {
        "dataCollectionEndpointId": "[resourceId('Microsoft.Insights/dataCollectionEndpoints', parameters('dceName'))]",
        "streamDeclarations": {
          "[concat('Custom-', parameters('tableName'))]": {
            "columns": [
              { "name": "TimeGenerated", "type": "datetime" },
              { "name": "ContactId",     "type": "string" },
              { "name": "Email",         "type": "string" },
              { "name": "FirstName",     "type": "string" },
              { "name": "LastName",      "type": "string" },
              { "name": "LifecycleStage","type": "string" },
              { "name": "CreateDate",    "type": "datetime" },
              { "name": "LastModified",  "type": "datetime" },
              { "name": "RawProperties", "type": "dynamic" }
            ]
          }
        },
        "destinations": {
          "logAnalytics": [
            {
              "workspaceResourceId": "[parameters('workspaceResourceId')]",
              "name": "la-destination"
            }
          ]
        },
        "dataFlows": [
          {
            "streams": ["[concat('Custom-', parameters('tableName'))]"],
            "destinations": ["la-destination"],
            "transformKql": "source | extend TimeGenerated = now()",
            "outputStream": "[concat('Custom-', parameters('tableName'))]"
          }
        ]
      }
    }
  ],
  "outputs": {
    "dcrImmutableId": {
      "type": "string",
      "value": "[reference(resourceId('Microsoft.Insights/dataCollectionRules', parameters('dcrName'))).immutableId]"
    },
    "dceLogsIngestionEndpoint": {
      "type": "string",
      "value": "[reference(resourceId('Microsoft.Insights/dataCollectionEndpoints', parameters('dceName'))).logsIngestion.endpoint]"
    }
  }
}
```

## DCR Key Concepts

| Property | Notes |
| ---------- | ------- |
| `streamDeclarations` | Defines the input schema the client sends. Name must be `Custom-<TableName>`. |
| `transformKql` | KQL applied at ingestion time. Use to rename fields, filter, or cast types. Use `source` to reference the incoming stream. |
| `outputStream` | Must match the target table (`Custom-<TableName>`). |
| `dataCollectionEndpointId` | Required when using the Log Ingestion API. Not needed for diagnostics/agent flows. |
| `immutableId` | The `rule_id` value used by the SDK client for uploads. Retrieve from ARM outputs or `az monitor data-collection rule show`. |

## Transform KQL Patterns

```kql
// Rename and cast a field, add TimeGenerated, drop nulls
source
| extend TimeGenerated = todatetime(CreateDate)
| extend ContactId = tostring(id)
| project-away id, CreateDate
```

```kql
// Parse nested JSON string into dynamic
source
| extend ParsedProperties = parse_json(RawPropertiesJson)
| extend Email = tostring(ParsedProperties.email)
```

```kql
// Filter out test/internal records at ingestion time
source
| where LifecycleStage != "internal_test"
| extend TimeGenerated = now()
```

## Common DCR Errors

| Error | Cause | Fix |
| ------- | ------- | ----- |
| `403 Forbidden` on upload | Identity missing `Monitoring Metrics Publisher` on DCR | Run `az role assignment create` with the DCR scope |
| `404` on DCE endpoint URL | Endpoint URL copied incorrectly or DCE in wrong region | Re-fetch from `az monitor data-collection endpoint show` |
| Rows missing in table | `TimeGenerated` outside ±48h window or null | Ensure transform sets `TimeGenerated = now()` or validates source timestamp |
| Schema validation error | Payload field type doesn't match DCR stream declaration | Cast in transform KQL: `tostring()`, `toint()`, `todatetime()` |
| `immutableId` not found | Using resource name instead of immutable ID | Use `rule_id` = `dcr.immutable_id` property, not the resource name |

## CLI Quick Reference

```bash
# Get DCR immutable ID
az monitor data-collection rule show \
  --name "<dcrName>" \
  --resource-group "<rg>" \
  --query "immutableId" -o tsv

# Get DCE ingestion endpoint
az monitor data-collection endpoint show \
  --name "<dceName>" \
  --resource-group "<rg>" \
  --query "logsIngestion.endpoint" -o tsv

# List all DCRs in a workspace
az monitor data-collection rule list \
  --resource-group "<rg>" \
  --query "[].{Name:name, ImmutableId:immutableId}" -o table
```
