---
name: arpa-h-sentinel-custom-connector
description: "Build, scaffold, and validate Microsoft Sentinel custom data connectors. USE FOR: create custom connector, build Sentinel data connector, ingest custom logs, DCR data collection rule, DCE data collection endpoint, Log Ingestion API, Azure Function connector, custom table Sentinel, KQL schema design, codeless connector platform CCP, SaaS API to Sentinel, REST API polling connector, transform KQL, managed identity connector auth, connector testing, Bicep connector, ARM template connector, connector manifest, data connector definition, cross-RG role assignment, Salesforce connector, ServiceNow connector, custom SaaS connector, ingest third-party data, VNet integrate Function App, configure AMPLS for DCE, private endpoint for DCE, private endpoint for Key Vault, private endpoint for Storage, VNet subnet delegation, DNS private zone, restrict public access, Flex Consumption VNet integration, amplsScopedResource, secure connector network, private link scope, create metric alert, create log search alert, create activity log alert, configure action group, alert on Function App errors, alert on ingestion failures, alert on connector health, alert on missing heartbeat, Azure Monitor alert rule Bicep, alert on DCR ingestion, alert on Key Vault access failures, Terraform connector, Terraform IaC connector, Terraform DCR, Terraform DCE, Terraform Function App, deploy connector with Terraform, azurerm provider connector. DO NOT USE FOR: built-in Sentinel content hub connectors, Syslog/CEF agent setup, diagnostic settings connectors, general Azure Functions (use azure-prepare)."
argument-hint: "Describe the data source (e.g. Salesforce audit events, ServiceNow incidents) and the target Sentinel table name"
---

# Microsoft Sentinel Custom Data Connectors

## When to Use

- Building a new connector to ingest data from any SaaS or custom API (e.g. Salesforce, ServiceNow, Okta, GitHub, Jira, custom internal systems) into Sentinel
- Creating or updating Azure Function-based connector pipelines
- Designing Data Collection Rules (DCR) and custom Log Analytics tables
- Writing or reviewing KQL transform queries inside a DCR
- Scaffolding connector manifest files (ARM templates, connector definition JSON)
- Implementing the Codeless Connector Platform (CCP) for REST API polling
- Debugging ingestion failures (DCE endpoint, DCR rule ID, table schema mismatches)
- Designing authentication using managed identity or service principal
- Adding or updating GitHub Actions CI/CD workflows for connector deployment

---

## Connector Architecture Patterns

See [Architecture Patterns](./references/architecture.md) for full decision guidance.

| Pattern                                | When to Use                                            |
| -------------------------------------- | ------------------------------------------------------ |
| **Azure Function + Log Ingestion API** | Custom pull from SaaS REST APIs; full code control     |
| **Codeless Connector Platform (CCP)**  | No-code/low-code REST polling; declarative JSON config |
| **Logic App connector**                | Low-volume, event-driven; orchestration-heavy          |
| **Azure Data Factory**                 | High-volume batch ingestion from structured sources    |

For SaaS APIs with REST endpoints, prefer **Azure Function + Log Ingestion API**.

---

## Repository Structure

When scaffolding a new connector repo, follow the standard layout. See [Repository Structure](./references/repo-structure.md) for the full directory tree, file conventions, naming patterns, and a GitHub Actions workflow skeleton.

---

## Ingestion Pipeline: Step-by-Step

### 1. Design the Custom Table

- Decide on a **table name** using the convention `Product<ConnectorName><LogType>_CL` (e.g. `ProductSalesforceLogins_CL`, `ProductOktaEvents_CL`)
- Map source fields to Log Analytics column types: `string`, `int`, `real`, `boolean`, `datetime`, `dynamic`
- Always include:
  - `TimeGenerated` (`datetime`) — ingestion timestamp
  - A unique source ID column (e.g. `EventId`, `RecordId`, `UserId`)
  - `TenantId` is auto-populated; do not include it in schema
- Keep items under **1 MB per log entry** (LA limit)
- See [KQL Schema Design](./references/kql-schema.md)

### 2. Create the DCE (Data Collection Endpoint)

```bash
az monitor data-collection endpoint create \
  --name "<dce-name>" \
  --resource-group "<rg>" \
  --location "<region>" \
  --public-network-access "Enabled"
```

Note the `logsIngestion` endpoint URL from the output — this is used by the SDK.

### 3. Create the Custom Table in Log Analytics

```bash
az monitor log-analytics workspace table create \
  --resource-group "<rg>" \
  --workspace-name "<workspace-name>" \
  --name "Product<ConnectorName><LogType>_CL" \
  --columns '[{"name":"TimeGenerated","type":"datetime"},{"name":"RecordId","type":"string"},{"name":"EventType","type":"string"},{"name":"Status","type":"string"},{"name":"RawData","type":"dynamic"}]'
```

### 4. Create the DCR (Data Collection Rule)

- DCRs bind the **DCE**, the **table schema**, and an optional **transform KQL**
- Reference the Log Analytics workspace resource ID as the destination
- See the DCR ARM template in [DCR Ingestion Reference](./references/dcr-ingestion.md)

### 5. Grant the Function/Identity Permission on the DCR

```bash
az role assignment create \
  --assignee "<managed-identity-principal-id>" \
  --role "Monitoring Metrics Publisher" \
  --scope "<dcr-resource-id>"
```

### 6. Implement the Azure Function Connector

- Use the **Azure Monitor Ingestion client library** (not the deprecated HTTP Data Collector API)
- Auth with `DefaultAzureCredential` (managed identity in production, CLI token locally)
- Implement **state tracking** (last run timestamp in Azure Blob Storage or Table Storage) to avoid re-ingesting records
- Batch records into chunks of **≤1 MB** per `upload()` call
- See [Connector Architecture](./references/architecture.md) for a full function pattern

**Python example (core ingestion call):**

```python
from azure.monitor.ingestion import LogsIngestionClient
from azure.identity import DefaultAzureCredential

credential = DefaultAzureCredential()
client = LogsIngestionClient(endpoint=DCE_ENDPOINT, credential=credential)

client.upload(rule_id=DCR_RULE_ID, stream_name=DCR_STREAM_NAME, logs=records)
```

### 7. Write the Connector Manifest (Bicep, Terraform, or ARM JSON)

**Prefer Bicep or Terraform** for new connector infrastructure. ARM JSON should only be used when required by external tooling (e.g. Azure Marketplace publishing). Both Bicep and Terraform avoid critical ARM JSON pitfalls:

| Scenario                 | ARM JSON                                                                       | Bicep                                                         | Terraform                                                                  |
| ------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Cross-RG role assignment | Requires nested deployment + `expressionEvaluationPolicy: inner` — error-prone | `module` with `scope: resourceGroup(otherRg)` — works cleanly | `data` source + `azurerm_role_assignment` — trivial, no nested deployments |
| DCR transform KQL        | `coalesce()` unsupported — use `iif(isnotempty(...), ..., ...)`                | Same restriction, but easier to read/debug                    | Same restriction — use `iif(isnotempty(...), ..., ...)` in `transform_kql` |
| Resource references      | `reference(resourceId(...))` verbose syntax                                    | Direct `resource.property` access                             | Attribute references: `resource_type.name.attribute`                       |
| Dependency management    | Manual `dependsOn` arrays                                                      | Automatically inferred from resource references               | Automatically inferred from resource references                            |
| State management         | No persistent state                                                            | No persistent state                                           | Requires state backend (e.g., Azure Blob Storage)                          |

**Required resources:**

- `Microsoft.Storage/storageAccounts` (+ blobServices/containers)
- `Microsoft.Web/serverfarms` (Flex Consumption: sku FC1)
- `Microsoft.Insights/components`
- `Microsoft.Insights/dataCollectionEndpoints`
- `Microsoft.Insights/dataCollectionRules`
- `Microsoft.Web/sites` with `identity: { type: 'SystemAssigned' }`
- `Microsoft.Authorization/roleAssignments` (Storage, DCR, DCE)
- Parameterize: workspace name, workspace RG, DCE name, table name, Function App name, Key Vault name, Key Vault RG

**Cross-RG Key Vault role assignment pattern (Bicep module):**

```bicep
// deployment.bicep — calls a module scoped to the KV resource group
module kvRoleAssignment 'kvRoleAssignment.bicep' = if (deployRoleAssignments) {
  name: 'kvRoleAssignment'
  scope: resourceGroup(keyVaultResourceGroup)  // <-- key
  params: {
    keyVaultName: keyVaultName
    functionAppName: functionAppName
    principalId: functionApp.identity.principalId
  }
}

// kvRoleAssignment.bicep — runs in the KV's own RG context
resource keyVault 'Microsoft.KeyVault/vaults@2023-07-01' existing = {
  name: keyVaultName
}
resource kvSecretsUserRole 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(keyVault.id, functionAppName, 'KeyVaultSecretsUser')
  scope: keyVault
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '4633458b-17de-408a-b874-0445c86b69e6')
    principalId: principalId
    principalType: 'ServicePrincipal'
  }
}
```

**Deploy with:**

```bash
az deployment group create \
  --resource-group <connector-rg> \
  --template-file hubspot/infrastructure/deployment.bicep \
  --parameters '@hubspot/infrastructure/parameters.json'
```

- See [Connector Manifest Reference](./references/connector-manifest.md)

---

## Codeless Connector Platform (CCP)

For REST API polling without custom code:

1. Author a **connector definition JSON** with `auth`, `request`, `paging`, and `response` blocks
2. Upload via `Microsoft.SecurityInsights/dataConnectors` ARM resource type
3. Supported auth: `APIKey`, `OAuth2` (client credentials), `Basic`
4. Paging strategies: `LinkHeader`, `NextPageToken`, `Offset`, `PersistentToken`
5. See [CCP Reference](./references/ccp.md) and [Microsoft Learn: Create a codeless connector](https://learn.microsoft.com/en-us/azure/sentinel/create-codeless-connector)

---

## Security Best Practices

- **Never hard-code secrets** — use Key Vault references in Function App settings
- Use **managed identity** (system-assigned) for the Function App; assign `Monitoring Metrics Publisher` on the DCR only
- Restrict DCE to a specific VNet or Private Endpoint for sensitive environments (see [VNet Integration](#vnet-integration) below)
- Apply **least-privilege**: the connector identity should only have write access to its specific DCR
- Validate and sanitize data before ingestion — `dynamic` columns accept raw JSON but can hide injection surface
- Rotate API keys and OAuth tokens for source systems using Key Vault with expiry alerts
- Log connector errors to a separate `ConnectorHealth_CL` table for SOC visibility

---

## VNet Integration

When the connector must not traverse the public internet, integrate the Function App with a VNet and lock down all PaaS resources behind private endpoints.

### Architecture

```text
Function App (Flex Consumption)
  └─ VNet Integration (delegated subnet) → outbound traffic via VNet
       ├─ Private Endpoint → Data Collection Endpoint (DCE)
       ├─ Private Endpoint → Key Vault
       ├─ Private Endpoint → Storage Account
       └─ AMPLS (Azure Monitor Private Link Scope)
            └─ Scoped Resource → DCE
```

`deployment.bicep` already supports this via the `subnetResourceId` and `privateLinkScopeName` parameters. Leave `subnetResourceId` empty for a public deployment.

### Subnet Delegation (Flex Consumption)

```bicep
resource integrationSubnet 'Microsoft.Network/virtualNetworks/subnets@2023-09-01' = {
  parent: vnet
  name: 'snet-connector-integration'
  properties: {
    addressPrefix: '10.0.1.0/26'   // /26 minimum for Flex Consumption
    delegations: [
      {
        name: 'delegation-flexconsumption'
        properties: {
          serviceName: 'Microsoft.App/environments'  // Flex Consumption delegation
        }
      }
    ]
  }
}
```

> Flex Consumption uses `Microsoft.App/environments` delegation (not `Microsoft.Web/serverFarms`). The subnet must be dedicated.

### Enabling VNet Integration on the Function App

In `deployment.bicep`, passing `subnetResourceId` enables VNet integration:

```bicep
properties: {
  virtualNetworkSubnetId: empty(subnetResourceId) ? null : subnetResourceId
  vnetRouteAllEnabled: !empty(subnetResourceId)  // routes ALL outbound traffic via VNet
  ...
}
```

Set `vnetRouteAllEnabled: true` to ensure all outbound traffic (including DNS) is routed through the VNet.

### Private Endpoint for DCE

```bicep
resource dcePrivateEndpoint 'Microsoft.Network/privateEndpoints@2023-09-01' = {
  name: 'pe-${dataCollectionEndpointName}'
  location: location
  properties: {
    subnet: { id: privateEndpointSubnetId }
    privateLinkServiceConnections: [
      {
        name: 'plsc-dce'
        properties: {
          privateLinkServiceId: dce.id
          groupIds: [ 'logs-ingestion' ]
        }
      }
    ]
  }
}
```

### AMPLS: Registering the DCE

The `amplsScopedResource.bicep` module (already in this repo) registers the DCE with an existing AMPLS. Deploy it as a cross-RG module:

```bicep
module amplsScope 'amplsScopedResource.bicep' = if (!empty(privateLinkScopeName)) {
  name: 'amplsScopedResource'
  scope: resourceGroup(privateLinkScopeResourceGroup)
  params: {
    amplsName: privateLinkScopeName
    dceResourceId: dce.id
    dceName: dataCollectionEndpointName
  }
}
```

### Required Private DNS Zones

| Resource              | DNS Zone                               |
| --------------------- | -------------------------------------- |
| DCE / Azure Monitor   | `privatelink.monitor.azure.com`        |
| Log Analytics         | `privatelink.ods.opinsights.azure.com` |
| Log Analytics (Agent) | `privatelink.oms.opinsights.azure.com` |
| Key Vault             | `privatelink.vaultcore.azure.net`      |
| Storage (Blob)        | `privatelink.blob.core.windows.net`    |
| Storage (Queue)       | `privatelink.queue.core.windows.net`   |
| Storage (Table)       | `privatelink.table.core.windows.net`   |

All zones must be **linked to the VNet** used by the Function App.

### VNet Deployment Parameters

```json
{
  "subnetResourceId": {
    "value": "/subscriptions/<sub>/resourceGroups/<rg>/providers/Microsoft.Network/virtualNetworks/<vnet>/subnets/snet-connector-integration"
  },
  "privateLinkScopeName": { "value": "ampls-sentinel" },
  "privateLinkScopeResourceGroup": { "value": "rg-monitoring" }
}
```

### VNet Deployment Checklist

- [ ] Integration subnet exists with `Microsoft.App/environments` delegation
- [ ] Private endpoints created for DCE, Key Vault, and Storage
- [ ] Private DNS zones created and linked to the VNet
- [ ] AMPLS exists with a private endpoint; DCE registered via `amplsScopedResource.bicep`
- [ ] `publicNetworkAccess: 'Disabled'` set on Key Vault and Storage
- [ ] DCE `networkAcls.publicNetworkAccess: 'SecuredByPerimeter'` (already set in `deployment.bicep`)
- [ ] `vnetRouteAllEnabled: true` on the Function App

---

## Testing and Validation

1. **Local testing**: Use VS Code with Azure Functions Core Tools; authenticate with `az login`
2. **Schema validation**: Run a test ingest with a single record and verify the row appears in LA within 5 minutes
3. **KQL transform validation**: Use the Azure portal DCR editor to test transform queries before saving
4. **End-to-end smoke test**:

   ```kql
   Product<ConnectorName><LogType>_CL
   | where TimeGenerated > ago(1h)
   | summarize Count = count()
   ```

5. **Common failures**:
   - `403` on upload → managed identity not assigned `Monitoring Metrics Publisher` on DCR
   - Table not found → DCR stream name (`Custom-Product<ConnectorName><LogType>_CL`) doesn't match table
   - Missing rows → `TimeGenerated` is null or out of the 48-hour ingestion window
   - Schema mismatch → column type in payload doesn't match DCR schema (cast in transform KQL)

---

## GitHub Actions: Deploying the Function App

### Workflow Structure

Use `windows-latest` for the deploy job — `Compress-Archive` and PowerShell backtick line continuation require it.

Define resource group and function app name as top-level `env` vars to avoid repetition:

```yaml
env:
  RESOURCE_GROUP: "rg-operations-sentinel-<connector>-usc"
  FUNCTION_APP_NAME: "func-operations-sentinel-<connector>-usc"
```

### Deploy Function App Step (PowerShell — zip + config-zip)

```yaml
- name: Deploy Function App
  shell: pwsh
  run: |
    cd <connector>/function-code
    Compress-Archive -Path * -DestinationPath ../function.zip -Force
    cd ..
    az functionapp deployment source config-zip `
      --resource-group ${{ env.RESOURCE_GROUP }} `
      --name ${{ env.FUNCTION_APP_NAME }} `
      --src function.zip
    Remove-Item function.zip -Force
```

### Verify Deployment Job

Always add a `verify-deployment` job after deploy to confirm the function app is in `Running` state:

```yaml
verify-deployment:
  runs-on: windows-latest
  needs: deploy
  if: always() && needs.deploy.result == 'success'
  steps:
    - name: Azure Login (OIDC)
      uses: azure/login@v2
      with:
        client-id: ${{ secrets.AZURE_CLIENT_ID }}
        tenant-id: ${{ secrets.AZURE_TENANT_ID }}
        subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}

    - name: Check Function App State
      shell: pwsh
      run: |
        az functionapp show `
          --name ${{ env.FUNCTION_APP_NAME }} `
          --resource-group ${{ env.RESOURCE_GROUP }} `
          --query "state" `
          --output tsv
```

### Notes

- Do **not** use `az functionapp deploy --build-remote` (flag syntax not supported in current CLI)
- Do **not** use `Azure/functions-action` — it requires a GitHub Variable for app name; prefer reading from `parameters.json` or `env`
- The `setup-python` step is **not** needed in the deploy job — the zip is deployed as-is and the remote build handles dependencies
- Use `config-zip` not `deploy --type zip` for standard and Flex Consumption plans

---

## Python v2 Function App: Entry Point Requirement

The Azure Functions **Python v2 programming model** uses decorator-based registration (`app = func.FunctionApp()`). The runtime **only** discovers functions via a file named `function_app.py` at the **root of the deployment package**. It does not walk subdirectories.

### Common mistake

Placing `app = func.FunctionApp()` and all decorators inside a package subdirectory (e.g. `HubSpotAuditCollector/__init__.py`) — the function app deploys successfully but **no functions appear** in the portal.

### Fix

Create `function_app.py` at the deployment root that re-exports `app` from the package:

```python
# function_app.py — must be at the root of the deployment package
from HubSpotAuditCollector import app  # noqa: F401
```

### Correct layout

```text
function-code/
  function_app.py              ← runtime entry point (required)
  host.json
  requirements.txt
  HubSpotAuditCollector/
    __init__.py                ← contains app = func.FunctionApp() and all triggers
```

The `function_app.py` import is the only change needed — all trigger logic stays in the package.

---

## Azure Monitor Alerts

Alert on connector health, ingestion gaps, and Function App errors.

### Alert Rule Types

| Type                   | Signal                     | Best For                                               |
| ---------------------- | -------------------------- | ------------------------------------------------------ |
| **Log search alert**   | KQL on Log Analytics       | Ingestion gaps, error patterns, custom table row count |
| **Metric alert**       | Azure resource metrics     | Function execution failures, CPU, availability         |
| **Activity log alert** | Azure control-plane events | Resource deletion, config changes                      |

### Bicep: Action Group

```bicep
resource actionGroup 'Microsoft.Insights/actionGroups@2023-01-01' = {
  name: 'ag-connector-alerts'
  location: 'global'
  properties: {
    groupShortName: 'connector'
    enabled: true
    emailReceivers: [
      {
        name: 'SOC Team'
        emailAddress: 'soc@example.com'
        useCommonAlertSchema: true
      }
    ]
  }
}
```

### Bicep: Log Search Alert (Ingestion Gap)

```bicep
resource ingestionGapAlert 'Microsoft.Insights/scheduledQueryRules@2023-03-15-preview' = {
  name: 'alert-hubspot-ingestion-gap'
  location: location
  properties: {
    description: 'No HubSpot audit logs ingested in the past hour'
    severity: 1                   // 0=Critical 1=Error 2=Warning 3=Info
    enabled: true
    evaluationFrequency: 'PT15M'
    windowSize: 'PT1H'
    scopes: [
      resourceId('Microsoft.OperationalInsights/workspaces', workspaceName)
    ]
    criteria: {
      allOf: [
        {
          query: 'ProductHubSpotAuditLogs_CL | where TimeGenerated > ago(1h) | count'
          timeAggregation: 'Count'
          operator: 'LessThan'
          threshold: 1
          failingPeriods: { numberOfEvaluationPeriods: 1, minFailingPeriodsToAlert: 1 }
        }
      ]
    }
    actions: { actionGroups: [ actionGroup.id ] }
    autoMitigate: true
  }
}
```

### Bicep: Metric Alert (Function Errors)

```bicep
resource functionErrorAlert 'Microsoft.Insights/metricAlerts@2018-03-01' = {
  name: 'alert-function-errors'
  location: 'global'
  properties: {
    severity: 2
    enabled: true
    scopes: [ functionApp.id ]
    evaluationFrequency: 'PT5M'
    windowSize: 'PT15M'
    criteria: {
      'odata.type': 'Microsoft.Azure.Monitor.SingleResourceMultipleMetricCriteria'
      allOf: [
        {
          name: 'FailedExecutions'
          metricName: 'FunctionExecutionCount'
          dimensions: [ { name: 'Status', operator: 'Include', values: [ 'Failed' ] } ]
          operator: 'GreaterThan'
          threshold: 5
          timeAggregation: 'Count'
          criterionType: 'StaticThresholdCriterion'
        }
      ]
    }
    actions: [ { actionGroupId: actionGroup.id } ]
  }
}
```

### Recommended Alerts for This Connector

| Alert                           | Type       | Severity     | Frequency |
| ------------------------------- | ---------- | ------------ | --------- |
| No logs ingested in 1h          | Log search | 1 (Error)    | PT15M     |
| Function execution failures > 5 | Metric     | 2 (Warning)  | PT5M      |
| Key Vault access denied         | Log search | 1 (Error)    | PT5M      |
| Function App stopped (runs = 0) | Metric     | 0 (Critical) | PT5M      |

### Common KQL Alert Queries

```kql
// Function App errors
FunctionAppLogs
| where TimeGenerated > ago(15m)
| where Level == "Error"
| where FunctionName == "HubSpotAuditCollector"
| count

// Key Vault access failures
AzureDiagnostics
| where ResourceType == "VAULTS"
| where ResultType != "Success"
| where TimeGenerated > ago(15m)
| count
```

---

## References

- [Repository Structure](./references/repo-structure.md)
- [Architecture Patterns](./references/architecture.md)
- [DCR Ingestion Reference](./references/dcr-ingestion.md)
- [KQL Schema Design](./references/kql-schema.md)
- [Connector Manifest (ARM Template)](./references/connector-manifest.md)
- [Terraform Connector Reference](./references/terraform.md)
- [Codeless Connector Platform](./references/ccp.md)
- [Create a codeless connector (Microsoft Learn)](https://learn.microsoft.com/en-us/azure/sentinel/create-codeless-connector)
- [VNet integration for Azure Functions](https://learn.microsoft.com/azure/azure-functions/functions-networking-options#virtual-network-integration)
- [Azure Monitor Private Link Scope (AMPLS)](https://learn.microsoft.com/azure/azure-monitor/logs/private-link-security)
- [Azure Monitor alerts overview](https://learn.microsoft.com/azure/azure-monitor/alerts/alerts-overview)

---

## Infrastructure as Code: Bicep, Terraform, and ARM JSON

**Prefer Bicep or Terraform** for new connector infrastructure. Use ARM JSON only when required by external tooling (e.g. Azure Marketplace publishing).

### When to Use Terraform

Choose Terraform when:

- Your organization already uses Terraform/OpenTofu as the standard IaC across workloads
- You need multi-cloud portability or centralized Terraform state management
- Cross-RG and cross-subscription role assignments are common — Terraform `data` sources handle these without nested deployments
- You want `.tfvars` files for environment-specific configuration

Requires: `azurerm` provider ≥ 3.90; a remote state backend (Azure Blob Storage recommended).

See [Terraform Connector Reference](./references/terraform.md) for a full `main.tf` example.

### Known ARM JSON Limitations for Connectors

1. **Cross-RG role assignments** — Cannot scope a `Microsoft.Authorization/roleAssignments` resource to a resource in a different resource group within the same deployment. Workarounds (nested deployments with `expressionEvaluationPolicy: inner`) are fragile and error-prone.
2. **DCR transform KQL** — The `coalesce()` function is not supported in DCR transform KQL regardless of IaC format. Use `iif(isnotempty(field), todatetime(field), now())` instead.
3. **Verbose syntax** — `reference(resourceId(...), apiVersion, 'Full').identity.principalId` vs Bicep's `resource.identity.principalId`.

### Bicep File Structure for a Connector

```text
hubspot/infrastructure/
  deployment.bicep          # Main template — all resources in connector RG
  kvRoleAssignment.bicep    # Module — KV Secrets User role assignment in KV RG
  parameters.json           # Shared parameter file (works with both Bicep and ARM)
  create-custom-table.json  # Separate ARM template for Log Analytics table creation
```

### Terraform File Structure for a Connector

```text
hubspot/infrastructure/
  main.tf           # All resources (DCE, DCR, Storage, Function App, role assignments)
  variables.tf      # Input variable declarations
  outputs.tf        # DCR immutable ID, DCE endpoint, Function App principal ID
  terraform.tfvars  # Environment-specific values — do NOT commit to source control
  backend.tf        # Remote state config (Azure Blob Storage)
```
