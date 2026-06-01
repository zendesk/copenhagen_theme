# Terraform Connector Reference

Full Terraform configuration for provisioning all Sentinel custom connector infrastructure using the `azurerm` provider.

**Requires:** `azurerm` provider ≥ 3.90; Terraform ≥ 1.5 or OpenTofu ≥ 1.6.

---

## File Structure

```text
<connector>/infrastructure/
  main.tf           # All resources (DCE, DCR, Storage, Function App, role assignments)
  variables.tf      # Input variable declarations
  outputs.tf        # DCR immutable ID, DCE endpoint, Function App principal ID
  terraform.tfvars  # Environment-specific values — do NOT commit to source control
  backend.tf        # Remote state config (Azure Blob Storage)
```

---

## `backend.tf`

Store state in Azure Blob Storage so all team members and CI/CD share the same state file.

```hcl
terraform {
  backend "azurerm" {
    resource_group_name  = "rg-tfstate"
    storage_account_name = "stterraformstate"
    container_name       = "tfstate"
    key                  = "<connector>.terraform.tfstate"
  }
}
```

---

## `main.tf`

```hcl
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.90"
    }
  }
}

provider "azurerm" {
  features {}
}

# ── Data Collection Endpoint ─────────────────────────────────────────────────
resource "azurerm_monitor_data_collection_endpoint" "connector" {
  name                = "${var.function_app_name}-dce"
  resource_group_name = var.resource_group_name
  location            = var.location
}

# ── Data Collection Rule ─────────────────────────────────────────────────────
resource "azurerm_monitor_data_collection_rule" "connector" {
  name                        = "${var.function_app_name}-dcr"
  resource_group_name         = var.resource_group_name
  location                    = var.location
  data_collection_endpoint_id = azurerm_monitor_data_collection_endpoint.connector.id

  destinations {
    log_analytics {
      workspace_resource_id = var.workspace_resource_id
      name                  = "la-destination"
    }
  }

  data_flow {
    streams       = ["Custom-Product${var.connector_name}Events_CL"]
    destinations  = ["la-destination"]
    transform_kql = "source | extend TimeGenerated = iif(isnotempty(CreatedDate), todatetime(CreatedDate), now())"
    output_stream = "Custom-Product${var.connector_name}Events_CL"
  }

  stream_declaration {
    stream_name = "Custom-Product${var.connector_name}Events_CL"
    column { name = "TimeGenerated"; type = "datetime" }
    column { name = "EventId";       type = "string" }
    column { name = "EventType";     type = "string" }
    column { name = "ActorId";       type = "string" }
    column { name = "ActorEmail";    type = "string" }
    column { name = "TargetId";      type = "string" }
    column { name = "Status";        type = "string" }
    column { name = "CreatedDate";   type = "datetime" }
    column { name = "RawData";       type = "dynamic" }
  }
}

# ── Storage Account (state tracking) ────────────────────────────────────────
resource "azurerm_storage_account" "state" {
  name                            = var.storage_account_name
  resource_group_name             = var.resource_group_name
  location                        = var.location
  account_tier                    = "Standard"
  account_replication_type        = "LRS"
  min_tls_version                 = "TLS1_2"
  allow_nested_items_to_be_public = false
}

resource "azurerm_storage_container" "state" {
  name                  = "connector-state"
  storage_account_name  = azurerm_storage_account.state.name
  container_access_type = "private"
}

# ── App Service Plan ─────────────────────────────────────────────────────────
# Use sku_name = "FC1" for Flex Consumption (recommended); "Y1" for standard Consumption.
resource "azurerm_service_plan" "connector" {
  name                = "${var.function_app_name}-plan"
  resource_group_name = var.resource_group_name
  location            = var.location
  os_type             = "Linux"
  sku_name            = "Y1"
}

# ── Function App ─────────────────────────────────────────────────────────────
resource "azurerm_linux_function_app" "connector" {
  name                       = var.function_app_name
  resource_group_name        = var.resource_group_name
  location                   = var.location
  storage_account_name       = azurerm_storage_account.state.name
  storage_account_access_key = azurerm_storage_account.state.primary_access_key
  service_plan_id            = azurerm_service_plan.connector.id
  # Set subnet_resource_id in terraform.tfvars to enable VNet integration; leave empty for public.
  virtual_network_subnet_id  = var.subnet_resource_id != "" ? var.subnet_resource_id : null

  identity {
    type = "SystemAssigned"
  }

  site_config {
    vnet_route_all_enabled = var.subnet_resource_id != ""  # routes ALL outbound traffic via VNet
    application_stack {
      python_version = "3.11"
    }
  }

  app_settings = {
    FUNCTIONS_EXTENSION_VERSION = "~4"
    FUNCTIONS_WORKER_RUNTIME    = "python"
    DCE_ENDPOINT                = azurerm_monitor_data_collection_endpoint.connector.logs_ingestion_endpoint
    DCR_RULE_ID                 = azurerm_monitor_data_collection_rule.connector.immutable_id
    DCR_STREAM_NAME             = "Custom-Product${var.connector_name}Events_CL"
    STATE_STORAGE_URL           = "https://${azurerm_storage_account.state.name}.blob.core.windows.net"
    SOURCE_API_KEY              = "@Microsoft.KeyVault(SecretUri=${var.source_api_key_secret_uri})"
  }
}

# ── Role Assignment: Function App → DCR (Monitoring Metrics Publisher) ───────
resource "azurerm_role_assignment" "dcr_publisher" {
  scope                = azurerm_monitor_data_collection_rule.connector.id
  role_definition_name = "Monitoring Metrics Publisher"
  principal_id         = azurerm_linux_function_app.connector.identity[0].principal_id
}

# ── Cross-RG Role Assignment: Function App → Key Vault (Key Vault Secrets User)
# Terraform data sources make cross-RG/cross-subscription role assignments trivial —
# no nested deployments or expressionEvaluationPolicy workarounds needed.
data "azurerm_key_vault" "existing" {
  name                = var.key_vault_name
  resource_group_name = var.key_vault_resource_group
}

resource "azurerm_role_assignment" "kv_secrets_user" {
  scope                = data.azurerm_key_vault.existing.id
  role_definition_name = "Key Vault Secrets User"
  principal_id         = azurerm_linux_function_app.connector.identity[0].principal_id
}
```

---

## `variables.tf`

```hcl
variable "resource_group_name" {
  type        = string
  description = "Resource group for all connector resources."
}

variable "location" {
  type        = string
  description = "Azure region (e.g. centralus, eastus2)."
}

variable "connector_name" {
  type        = string
  description = "Short connector name used in table/stream naming, e.g. Hubspot, ServiceNow."
}

variable "function_app_name" {
  type        = string
  description = "Name for the Function App and derived resource names."
}

variable "storage_account_name" {
  type        = string
  description = "Storage account name for state tracking (globally unique, max 24 chars, lowercase)."
}

variable "workspace_resource_id" {
  type        = string
  description = "Full resource ID of the Log Analytics workspace."
}

variable "key_vault_name" {
  type        = string
  description = "Name of the existing Key Vault holding source API credentials."
}

variable "key_vault_resource_group" {
  type        = string
  description = "Resource group containing the Key Vault (may differ from the connector RG)."
}

variable "source_api_key_secret_uri" {
  type        = string
  description = "Key Vault secret URI for the source system API key (versioned or versionless)."
}
```

---

## `outputs.tf`

```hcl
output "dcr_immutable_id" {
  description = "Immutable ID of the Data Collection Rule — set as DCR_RULE_ID in the Function App."
  value       = azurerm_monitor_data_collection_rule.connector.immutable_id
}

output "dce_logs_ingestion_endpoint" {
  description = "Logs ingestion endpoint URL of the DCE — set as DCE_ENDPOINT in the Function App."
  value       = azurerm_monitor_data_collection_endpoint.connector.logs_ingestion_endpoint
}

output "function_app_principal_id" {
  description = "System-assigned managed identity principal ID of the Function App."
  value       = azurerm_linux_function_app.connector.identity[0].principal_id
}
```

---

## `terraform.tfvars` (example — do NOT commit)

```hcl
resource_group_name       = "rg-operations-sentinel-<connector>-usc"
location                  = "centralus"
connector_name            = "<ConnectorName>"
function_app_name         = "func-operations-sentinel-<connector>-usc"
storage_account_name      = "<connector>state<uniquesuffix>"
workspace_resource_id     = "/subscriptions/<sub>/resourceGroups/<rg>/providers/Microsoft.OperationalInsights/workspaces/<workspace>"
key_vault_name            = "kv-<connector>-secrets"
key_vault_resource_group  = "rg-shared-keyvaults"
source_api_key_secret_uri = "https://<kv>.vault.azure.net/secrets/<source>-api-key/"
```

Add `terraform.tfvars` to `.gitignore` — it contains environment-specific values and must not be committed.

---

## Deploy Commands

```bash
# Initialize — downloads provider, configures state backend
terraform init

# Review what will be created/changed
terraform plan -var-file="terraform.tfvars"

# Apply
terraform apply -var-file="terraform.tfvars"
```

---

## VNet Integration (Optional)

When the connector must not traverse the public internet, set `subnet_resource_id` in `terraform.tfvars`. All VNet resources below are conditional on that variable.

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

### Additional `variables.tf` entries

```hcl
variable "subnet_resource_id" {
  type        = string
  default     = ""
  description = "Resource ID of the delegated integration subnet. Leave empty for public deployment."
}

variable "private_endpoint_subnet_id" {
  type        = string
  default     = ""
  description = "Resource ID of the subnet used for private endpoints."
}

variable "private_link_scope_name" {
  type        = string
  default     = ""
  description = "Name of the existing Azure Monitor Private Link Scope (AMPLS) to register the DCE with. Leave empty to skip."
}

variable "private_link_scope_resource_group" {
  type        = string
  default     = ""
  description = "Resource group containing the AMPLS (may differ from the connector RG)."
}
```

### VNet resources in `main.tf`

Add these blocks alongside the existing resources. The Function App block already includes `virtual_network_subnet_id` and `vnet_route_all_enabled` (see above).

```hcl
# ── Private Endpoint: DCE ─────────────────────────────────────────────────────
resource "azurerm_private_endpoint" "dce" {
  count               = var.subnet_resource_id != "" ? 1 : 0
  name                = "pe-${var.function_app_name}-dce"
  location            = var.location
  resource_group_name = var.resource_group_name
  subnet_id           = var.private_endpoint_subnet_id

  private_service_connection {
    name                           = "plsc-dce"
    private_connection_resource_id = azurerm_monitor_data_collection_endpoint.connector.id
    is_manual_connection           = false
    subresource_names              = ["logs-ingestion"]
  }
}

# ── Private Endpoint: Key Vault ───────────────────────────────────────────────
resource "azurerm_private_endpoint" "kv" {
  count               = var.subnet_resource_id != "" ? 1 : 0
  name                = "pe-${var.key_vault_name}"
  location            = var.location
  resource_group_name = var.resource_group_name
  subnet_id           = var.private_endpoint_subnet_id

  private_service_connection {
    name                           = "plsc-kv"
    private_connection_resource_id = data.azurerm_key_vault.existing.id
    is_manual_connection           = false
    subresource_names              = ["vault"]
  }
}

# ── Private Endpoint: Storage (Blob) ─────────────────────────────────────────
resource "azurerm_private_endpoint" "storage_blob" {
  count               = var.subnet_resource_id != "" ? 1 : 0
  name                = "pe-${var.storage_account_name}-blob"
  location            = var.location
  resource_group_name = var.resource_group_name
  subnet_id           = var.private_endpoint_subnet_id

  private_service_connection {
    name                           = "plsc-storage-blob"
    private_connection_resource_id = azurerm_storage_account.state.id
    is_manual_connection           = false
    subresource_names              = ["blob"]
  }
}

# ── AMPLS: Register the DCE with an existing Private Link Scope ───────────────
# The AMPLS typically lives in a shared monitoring RG. Terraform data sources
# handle this cross-RG reference with no nested deployments required.
data "azurerm_monitor_private_link_scope" "ampls" {
  count               = var.private_link_scope_name != "" ? 1 : 0
  name                = var.private_link_scope_name
  resource_group_name = var.private_link_scope_resource_group
}

resource "azurerm_monitor_private_link_scoped_service" "dce" {
  count               = var.private_link_scope_name != "" ? 1 : 0
  name                = "plss-${var.function_app_name}-dce"
  resource_group_name = var.private_link_scope_resource_group
  scope_name          = var.private_link_scope_name
  linked_resource_id  = azurerm_monitor_data_collection_endpoint.connector.id
}
```

> **Subnet delegation** (`Microsoft.App/environments`, `/26` minimum for Flex Consumption) and **private DNS zone creation/VNet linking** are assumed to be managed by the platform/networking team as pre-existing infrastructure. If DNS A-records need to be added, reference existing zones via `data "azurerm_private_dns_zone"` and add `azurerm_private_dns_a_record` resources.

### Required Private DNS Zones

All zones must be linked to the VNet used by the Function App before deploying private endpoints.

| Resource | DNS Zone |
| ---------- | ---------- |
| DCE / Azure Monitor | `privatelink.monitor.azure.com` |
| Log Analytics | `privatelink.ods.opinsights.azure.com` |
| Log Analytics (Agent) | `privatelink.oms.opinsights.azure.com` |
| Key Vault | `privatelink.vaultcore.azure.net` |
| Storage (Blob) | `privatelink.blob.core.windows.net` |
| Storage (Queue) | `privatelink.queue.core.windows.net` |
| Storage (Table) | `privatelink.table.core.windows.net` |

### `terraform.tfvars` additions for VNet deployment

```hcl
subnet_resource_id                = "/subscriptions/<sub>/resourceGroups/<rg>/providers/Microsoft.Network/virtualNetworks/<vnet>/subnets/snet-connector-integration"
private_endpoint_subnet_id        = "/subscriptions/<sub>/resourceGroups/<rg>/providers/Microsoft.Network/virtualNetworks/<vnet>/subnets/snet-private-endpoints"
private_link_scope_name           = "ampls-sentinel"
private_link_scope_resource_group = "rg-monitoring"
```

### VNet Deployment Checklist

- [ ] Integration subnet exists with `Microsoft.App/environments` delegation (`/26` minimum)
- [ ] `subnet_resource_id` and `private_endpoint_subnet_id` set in `terraform.tfvars`
- [ ] Private DNS zones exist and are linked to the VNet
- [ ] AMPLS exists; `private_link_scope_name` and `private_link_scope_resource_group` set
- [ ] `publicNetworkAccess` disabled on Key Vault and Storage after private endpoints are active
- [ ] DCE `publicNetworkAccess` set to `SecuredByPerimeter` (default in `azurerm_monitor_data_collection_endpoint`)
- [ ] `vnet_route_all_enabled = true` confirmed in Function App `site_config` (automatic when `subnet_resource_id` is set)

---

## Notes

- **`coalesce()` in transform KQL** is not supported in DCR transform KQL regardless of IaC tool. Use `iif(isnotempty(field), todatetime(field), now())` instead.
- **`stream_declaration` column types** use lowercase: `string`, `int`, `real`, `boolean`, `datetime`, `dynamic` — matching the Azure API.
- **Flex Consumption (FC1):** Change `sku_name = "Y1"` to `sku_name = "FC1"` and replace `storage_account_access_key` with `storage_uses_managed_identity = true`. Add a `Storage Blob Data Owner` role assignment on the storage account for the Function App's managed identity.
- **Custom Log Analytics table creation** is not supported by `azurerm` directly. Use the separate `az monitor log-analytics workspace table create` CLI command or an ARM template (`create-custom-table.json`) as a one-time setup step, same as with Bicep deployments.
- **State file security:** The Terraform state file will contain the storage account access key in plaintext. Use [azurerm backend with customer-managed key](https://developer.hashicorp.com/terraform/language/backend/azurerm) or restrict access to the state blob container to deployment identities only.
