# Connector Repository Structure

Model new connector repos on this layout. Replace `<source>` with the lowercase name of your data source (e.g. `hubspot`, `salesforce`, `okta`).

```
sentinel-connectors-<source>/
├── .github/
│   ├── skills/
│   │   └── sentinel-custom-connectors/     # Skill files (if workspace-level)
│   └── workflows/
│       └── deploy-<source>-connector.yml   # CI/CD GitHub Actions workflow
├── <source>/
│   ├── function-code/                      # Azure Function App source (any supported language)
│   │   ├── <SourceCollector>/              # Function module / entry-point folder (PascalCase)
│   │   │   └── <entry-point>               # e.g. __init__.py (Python), index.ts (Node), run.csx (C#)
│   │   ├── tests/
│   │   │   └── test_collector.<ext>        # Unit tests for collector logic
│   │   ├── .funcignore                     # Files excluded from func zip deploy
│   │   ├── host.json                       # Azure Functions host config
│   │   ├── local.settings.json             # Local dev settings (gitignored)
│   │   ├── local.settings.json.example     # Template with required keys, safe to commit
│   │   ├── <dependency-manifest>           # e.g. requirements.txt, package.json, *.csproj
│   │   └── README.md                       # Function-level setup instructions
│   ├── infrastructure/
│   │   ├── deployment.json                 # ARM template (DCE, DCR, Function App, Storage, App Insights)
│   │   ├── parameters.json                 # Deployment parameter values (environment-specific)
│   │   ├── create-custom-table.json        # ARM template for the custom _CL table
│   │   ├── deploy.ps1                      # Infrastructure deployment script
│   │   ├── create-resource-group.ps1       # One-time RG creation helper
│   │   └── delete-resource-group.ps1       # Teardown helper
│   ├── deploy-function.ps1                 # Packages and deploys function code to Azure
│   └── README.md                           # Connector-level documentation
├── docs/
│   └── <source>-<entity>-connector.md      # Implementation guide (this pattern)
├── .gitignore
└── README.md                               # Repo root overview
```

---

## Key File Conventions

### `local.settings.json.example`

Commit a safe example with placeholder values so developers know what settings are required. The real `local.settings.json` must be gitignored. Set `FUNCTIONS_WORKER_RUNTIME` to match your chosen language (`python`, `node`, `dotnet`, `dotnet-isolated`, `java`, `powershell`).

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "<language>",
    "DCE_ENDPOINT": "<your-dce-endpoint>",
    "DCR_RULE_ID": "<your-dcr-immutable-id>",
    "DCR_STREAM_NAME": "Custom-Product<ConnectorName><LogType>_CL",
    "STATE_STORAGE_URL": "<your-storage-account-url>",
    "SOURCE_API_KEY": "<your-api-key-or-token>"
  }
}
```

### `host.json`

Standard configuration — the same structure applies to all supported languages:

```json
{
  "version": "2.0",
  "extensionBundle": {
    "id": "Microsoft.Azure.Functions.ExtensionBundle",
    "version": "[4.*, 5.0.0)"
  },
  "logging": {
    "logLevel": {
      "default": "Information",
      "Function": "Information"
    },
    "applicationInsights": {
      "samplingSettings": {
        "isEnabled": true,
        "maxTelemetryItemsPerSecond": 20
      }
    }
  }
}
```

### `.funcignore`

Exclude files that should not be packaged for deployment. Adjust language-specific entries as needed.

```
.git*
.vscode
local.settings.json
tests/
# Python
__pycache__
*.pyc
.python_packages
# Node
node_modules
# .NET
bin/
obj/
```

### `.gitignore` (connector-relevant entries)

```
# Azure Functions
local.settings.json

# Python
__pycache__/
*.pyc
.python_packages/

# Node
node_modules/
dist/

# .NET
bin/
obj/

# Azure Storage Emulator
__blobstorage__/
__queuestorage__/
__azurite_db*__.json

# Build outputs
*.zip
publish/

# Logs
*.log
logs/

# Test output
*-test.json
test-output/
```

### `infrastructure/parameters.json`

Use consistent Azure resource naming conventions:

```json
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentParameters.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {
    "tags": {
      "value": {
        "Creator": "<owner-email>",
        "Project": "Sentinel",
        "Customer": "<team>",
        "Impact": "High"
      }
    },
    "functionAppName":              { "value": "func-<env>-sentinel-<source>-<region>" },
    "applicationInsightsName":      { "value": "appi-<env>-sentinel-<source>-<region>" },
    "storageAccountName":           { "value": "st<source><env><region>" },
    "workspaceName":                { "value": "log-<env>-<region>" },
    "workspaceResourceGroup":       { "value": "rg-<env>-network-<region>" },
    "dataCollectionEndpointName":   { "value": "dce-<env>-sentinel-<source>-<region>" },
    "dataCollectionRuleName":       { "value": "dcr-<env>-sentinel-<source>-<region>" },
    "customTableName":              { "value": "Product<ConnectorName><LogType>_CL" }
  }
}
```

---

## GitHub Actions Workflow Skeleton

`.github/workflows/deploy-<source>-connector.yml`:

The workflow structure is the same regardless of language. Replace the language-specific setup, install, and test steps as needed.

```yaml
name: Deploy <Source> Sentinel Connector

on:
  push:
    branches: [main]
    paths:
      - '<source>/function-code/**'
  workflow_dispatch:
    inputs:
      environment:
        description: 'GitHub Environment to deploy to (must match federated credential subject)'
        required: false
        default: 'production'
        type: string
      skip_tests:
        description: 'Skip tests and deploy directly'
        required: false
        default: false
        type: boolean
      deploy_infrastructure:
        description: 'Deploy infrastructure (true/false)'
        required: true
        default: false
        type: boolean
      deploy_function:
        description: 'Deploy function code (true/false)'
        required: true
        default: true
        type: boolean

jobs:
  lint:
    name: Lint & Security Scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      # Python example:
      # - uses: actions/setup-python@v5
      #   with: { python-version: '3.11' }
      # - run: pip install ruff bandit pip-audit
      # - run: ruff check <source>/function-code/
      # - run: bandit -r <source>/function-code/ --exclude <source>/function-code/tests -ll
      # - run: pip-audit -r <source>/function-code/requirements.txt
      # Node example: run eslint + npm audit
      # .NET example: run dotnet format --verify-no-changes + dotnet list package --vulnerable

  test:
    name: Run Tests
    runs-on: ubuntu-latest
    if: ${{ !inputs.skip_tests }}
    # ... test steps ...

  deploy-infrastructure:
    name: Deploy Infrastructure
    runs-on: ubuntu-latest
    if: github.event.inputs.deploy_infrastructure == 'true'
    environment: ${{ inputs.environment || 'production' }}
    permissions:
      id-token: write
      contents: read
    steps:
      - uses: actions/checkout@v4

      - name: Azure Login (OIDC)
        uses: azure/login@v2
        with:
          client-id: ${{ secrets.AZURE_CLIENT_ID }}
          tenant-id: ${{ secrets.AZURE_TENANT_ID }}
          subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}

      - name: Create Custom Table in Log Analytics
        run: |
          az deployment group create \
            --resource-group <workspace-resource-group> \
            --template-file <source>/infrastructure/create-custom-table.json \
            --parameters workspaceName=<workspace-name> customTableName=Product<ConnectorName><LogType>_CL

      - name: Deploy Infrastructure
        run: |
          az deployment group create \
            --resource-group <connector-resource-group> \
            --template-file <source>/infrastructure/deployment.json \
            --parameters '@<source>/infrastructure/parameters.json' \
            --parameters subnetResourceId=${{ secrets.SUBNET_RESOURCE_ID }}

  deploy:
    name: Deploy Function App
    runs-on: ubuntu-latest
    needs: [lint, test, deploy-infrastructure]
    if: |
      always() &&
      (needs.lint.result == 'success') &&
      (needs.test.result == 'success' || needs.test.result == 'skipped') &&
      (needs.deploy-infrastructure.result == 'success' || needs.deploy-infrastructure.result == 'skipped') &&
      (github.event.inputs.deploy_function != 'false')
    environment: ${{ inputs.environment || 'production' }}
    permissions:
      id-token: write   # required for OIDC token request
      contents: read
    steps:
      - uses: actions/checkout@v4

      - name: Azure Login (OIDC)
        uses: azure/login@v2
        with:
          client-id: ${{ vars.AZURE_CLIENT_ID }}
          tenant-id: ${{ vars.AZURE_TENANT_ID }}
          subscription-id: ${{ vars.AZURE_SUBSCRIPTION_ID }}

      # --- Language-specific setup (examples below, use only one) ---

      # Python
      # - uses: actions/setup-python@v5
      #   with:
      #     python-version: '3.11'
      # - run: pip install -r <source>/function-code/requirements.txt
      # - run: pytest <source>/function-code/tests/

      # Node
      # - uses: actions/setup-node@v4
      #   with:
      #     node-version: '20'
      # - run: npm ci --prefix <source>/function-code
      # - run: npm test --prefix <source>/function-code

      # .NET isolated
      # - uses: actions/setup-dotnet@v4
      #   with:
      #     dotnet-version: '8.x'
      # - run: dotnet test <source>/function-code

      # ---------------------------------------------------------------

      - name: Deploy Function App
        shell: pwsh
        run: |
          cd <source>/function-code
          Compress-Archive -Path * -DestinationPath ../function.zip -Force
          cd ..
          az functionapp deployment source config-zip `
            --resource-group ${{ vars.RESOURCE_GROUP }} `
            --name ${{ vars.FUNCTION_APP_NAME }} `
            --src function.zip
          Remove-Item function.zip -Force
```

---

## GitHub Actions — OIDC Setup (One-Time)

OIDC (federated credentials) is preferred over `AZURE_CREDENTIALS` secrets because no long-lived client secret is stored in GitHub.

### 1. Create an App Registration (or use an existing one)

```bash
az ad app create --display-name "github-sentinel-connectors"
```

### 2. Create a federated credential for the repo + environment

```bash
APP_ID=$(az ad app list --display-name "github-sentinel-connectors" --query "[0].appId" -o tsv)

az ad app federated-credential create --id $APP_ID --parameters '{
  "name": "github-production",
  "issuer": "https://token.actions.githubusercontent.com",
  "subject": "repo:<org>/<repo>:environment:production",
  "audiences": ["api://AzureADApplications"]
}'
```

For branch-scoped (no environment): use `"subject": "repo:<org>/<repo>:ref:refs/heads/main"`.

> **Important**: The `environment` value used in `environment: ${{ inputs.environment || 'production' }}` must exactly match the `subject` in the federated credential. If you add environments or rename them, create a corresponding federated credential for each.

### 3. Create a service principal and assign roles

```bash
az ad sp create --id $APP_ID

SP_ID=$(az ad sp show --id $APP_ID --query id -o tsv)

# Contributor on the connector resource group
az role assignment create \
  --assignee $SP_ID \
  --role Contributor \
  --scope /subscriptions/<sub>/resourceGroups/rg-<env>-sentinel-<source>-<region>

# Website Contributor on the Function App (if deploying across RGs)
az role assignment create \
  --assignee $SP_ID \
  --role "Website Contributor" \
  --scope /subscriptions/<sub>/resourceGroups/rg-<env>-sentinel-<source>-<region>/providers/Microsoft.Web/sites/<func-app-name>
```

### 4. Set GitHub Actions variables (not secrets)

In the repository or environment settings, add these as **Variables** (not Secrets):

| Variable | Value |
|---|---|
| `AZURE_CLIENT_ID` | App Registration Application (client) ID |
| `AZURE_TENANT_ID` | Azure AD tenant ID |
| `AZURE_SUBSCRIPTION_ID` | Target subscription ID |
| `FUNCTION_APP_NAME` | Function App name (e.g. `func-operations-sentinel-hubspot-usc`) |

> No secrets are needed — the OIDC token is issued by GitHub at runtime.

---

## Naming Conventions Summary

| Resource | Pattern | Example |
|---|---|---|
| Resource Group | `rg-<env>-sentinel-<source>-<region>` | `rg-operations-sentinel-hubspot-usc` |
| Function App | `func-<env>-sentinel-<source>-<region>` | `func-operations-sentinel-hubspot-usc` |
| Storage Account | `st<source><env><region>` | `sthubspotopsusc` |
| App Insights | `appi-<env>-sentinel-<source>-<region>` | `appi-operations-sentinel-hubspot-usc` |
| DCE | `dce-<env>-sentinel-<source>-<region>` | `dce-operations-sentinel-hubspot-usc` |
| DCR | `dcr-<env>-sentinel-<source>-<region>` | `dcr-operations-sentinel-hubspot-usc` |
| Custom Table | `Product<ConnectorName><LogType>_CL` | `ProductHubSpotAuditLogs_CL` |
| Function module folder | `<Source><Entity>Collector` | `HubSpotAuditCollector` |

## Language-Specific Notes

| Language | `FUNCTIONS_WORKER_RUNTIME` | Dependency manifest | Entry point |
|---|---|---|---|
| Python | `python` | `requirements.txt` | `__init__.py` (v1) or decorated function (v2) |
| Node.js | `node` | `package.json` | `index.js` / `index.ts` |
| .NET isolated | `dotnet-isolated` | `*.csproj` | `*.cs` with `[Function]` attribute |
| PowerShell | `powershell` | `requirements.psd1` | `run.ps1` |
| Java | `java` | `pom.xml` / `build.gradle` | `@FunctionName`-annotated method |

All languages share the same `host.json`, `local.settings.json`, `.funcignore`, and infrastructure layout — only the function code folder internals differ.
