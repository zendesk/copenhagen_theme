# Connector Manifest (ARM Template)

A full ARM deployment template that provisions all resources for the Sentinel custom connector.

## Deployment Template Structure

```text
azuredeploy.json
├── parameters
│   ├── workspaceName
│   ├── workspaceResourceId
│   ├── functionAppName
│   ├── storageAccountName
│   ├── appServicePlanName
│   ├── sourceApiKeySecretUri   (Key Vault reference)
│   ├── location
├── resources
│   ├── Microsoft.Insights/dataCollectionEndpoints
│   ├── Microsoft.Insights/dataCollectionRules
│   ├── Microsoft.Storage/storageAccounts          (state tracking)
│   ├── Microsoft.Web/serverfarms                  (App Service Plan)
│   ├── Microsoft.Web/sites                        (Function App)
│   └── Microsoft.Authorization/roleAssignments    (Monitoring Metrics Publisher)
└── outputs
    ├── dcrImmutableId
    └── dceEndpoint
```

## ARM Template (condensed)

```json
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {
    "workspaceName":           { "type": "string" },
    "workspaceResourceId":     { "type": "string" },
    "functionAppName":         { "type": "string" },
    "storageAccountName":      { "type": "string" },
    "sourceApiKeySecretUri":  { "type": "string", "metadata": { "description": "Key Vault secret URI for the source system API key or token" } },
    "location":                { "type": "string", "defaultValue": "[resourceGroup().location]" }
  },
  "variables": {
    "dceName":  "[concat(parameters('functionAppName'), '-dce')]",
    "dcrName":  "[concat(parameters('functionAppName'), '-dcr')]",
    "tableName": "Product<ConnectorName><LogType>_CL",
    "streamName": "Custom-Product<ConnectorName><LogType>_CL",
    "monitoringMetricsPublisherId": "[subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '3913510d-42f4-4e42-8a64-420c390055eb')]"
  },
  "resources": [
    {
      "type": "Microsoft.Insights/dataCollectionEndpoints",
      "apiVersion": "2022-06-01",
      "name": "[variables('dceName')]",
      "location": "[parameters('location')]",
      "properties": { "networkAcls": { "publicNetworkAccess": "Enabled" } }
    },
    {
      "type": "Microsoft.Insights/dataCollectionRules",
      "apiVersion": "2022-06-01",
      "name": "[variables('dcrName')]",
      "location": "[parameters('location')]",
      "dependsOn": ["[resourceId('Microsoft.Insights/dataCollectionEndpoints', variables('dceName'))]"],
      "properties": {
        "dataCollectionEndpointId": "[resourceId('Microsoft.Insights/dataCollectionEndpoints', variables('dceName'))]",
        "streamDeclarations": {
          "[variables('streamName')]": {
            "columns": [
              { "name": "TimeGenerated",    "type": "datetime" },
              { "name": "EventId",          "type": "string" },
              { "name": "EventType",        "type": "string" },
              { "name": "ActorId",          "type": "string" },
              { "name": "ActorEmail",       "type": "string" },
              { "name": "TargetId",         "type": "string" },
              { "name": "Status",           "type": "string" },
              { "name": "CreatedDate",      "type": "datetime" },
              { "name": "RawData",          "type": "dynamic" }
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
            "streams": ["[variables('streamName')]"],
            "destinations": ["la-destination"],
            "transformKql": "source | extend TimeGenerated = iif(isnotempty(LastModifiedDate), todatetime(LastModifiedDate), now())",
            "outputStream": "[variables('streamName')]"
          }
        ]
      }
    },
    {
      "type": "Microsoft.Storage/storageAccounts",
      "apiVersion": "2023-01-01",
      "name": "[parameters('storageAccountName')]",
      "location": "[parameters('location')]",
      "sku": { "name": "Standard_LRS" },
      "kind": "StorageV2",
      "properties": {
        "supportsHttpsTrafficOnly": true,
        "allowBlobPublicAccess": false,
        "minimumTlsVersion": "TLS1_2"
      }
    },
    {
      "type": "Microsoft.Web/serverfarms",
      "apiVersion": "2022-09-01",
      "name": "[concat(parameters('functionAppName'), '-plan')]",
      "location": "[parameters('location')]",
      "sku": { "name": "Y1", "tier": "Dynamic" },
      "properties": {}
    },
    {
      "type": "Microsoft.Web/sites",
      "apiVersion": "2022-09-01",
      "name": "[parameters('functionAppName')]",
      "location": "[parameters('location')]",
      "kind": "functionapp",
      "identity": { "type": "SystemAssigned" },
      "dependsOn": [
        "[resourceId('Microsoft.Web/serverfarms', concat(parameters('functionAppName'), '-plan'))]",
        "[resourceId('Microsoft.Storage/storageAccounts', parameters('storageAccountName'))]",
        "[resourceId('Microsoft.Insights/dataCollectionEndpoints', variables('dceName'))]",
        "[resourceId('Microsoft.Insights/dataCollectionRules', variables('dcrName'))]"
      ],
      "properties": {
        "serverFarmId": "[resourceId('Microsoft.Web/serverfarms', concat(parameters('functionAppName'), '-plan'))]",
        "siteConfig": {
          "appSettings": [
            { "name": "AzureWebJobsStorage",   "value": "[concat('DefaultEndpointsProtocol=https;AccountName=', parameters('storageAccountName'), ';AccountKey=', listKeys(resourceId('Microsoft.Storage/storageAccounts', parameters('storageAccountName')), '2023-01-01').keys[0].value)]" },
            { "name": "FUNCTIONS_EXTENSION_VERSION", "value": "~4" },
            { "name": "FUNCTIONS_WORKER_RUNTIME", "value": "python" },
            { "name": "DCE_ENDPOINT",           "value": "[reference(resourceId('Microsoft.Insights/dataCollectionEndpoints', variables('dceName'))).logsIngestion.endpoint]" },
            { "name": "DCR_RULE_ID",            "value": "[reference(resourceId('Microsoft.Insights/dataCollectionRules', variables('dcrName'))).immutableId]" },
            { "name": "DCR_STREAM_NAME",        "value": "[variables('streamName')]" },
            { "name": "STATE_STORAGE_URL",      "value": "[concat('https://', parameters('storageAccountName'), '.blob.core.windows.net')]" },
            { "name": "SOURCE_API_KEY",        "value": "[concat('@Microsoft.KeyVault(SecretUri=', parameters('sourceApiKeySecretUri'), ')')]" }
          ]
        }
      }
    },
    {
      "type": "Microsoft.Authorization/roleAssignments",
      "apiVersion": "2022-04-01",
      "name": "[guid(resourceId('Microsoft.Insights/dataCollectionRules', variables('dcrName')), parameters('functionAppName'), variables('monitoringMetricsPublisherId'))]",
      "scope": "[resourceId('Microsoft.Insights/dataCollectionRules', variables('dcrName'))]",
      "dependsOn": [
        "[resourceId('Microsoft.Web/sites', parameters('functionAppName'))]",
        "[resourceId('Microsoft.Insights/dataCollectionRules', variables('dcrName'))]"
      ],
      "properties": {
        "roleDefinitionId": "[variables('monitoringMetricsPublisherId')]",
        "principalId": "[reference(resourceId('Microsoft.Web/sites', parameters('functionAppName')), '2022-09-01', 'Full').identity.principalId]",
        "principalType": "ServicePrincipal"
      }
    }
  ],
  "outputs": {
    "dcrImmutableId": {
      "type": "string",
      "value": "[reference(resourceId('Microsoft.Insights/dataCollectionRules', variables('dcrName'))).immutableId]"
    },
    "dceEndpoint": {
      "type": "string",
      "value": "[reference(resourceId('Microsoft.Insights/dataCollectionEndpoints', variables('dceName'))).logsIngestion.endpoint]"
    },
    "functionAppPrincipalId": {
      "type": "string",
      "value": "[reference(resourceId('Microsoft.Web/sites', parameters('functionAppName')), '2022-09-01', 'Full').identity.principalId]"
    }
  }
}
```

## Sentinel Data Connector Definition (UX Manifest)

To surface the connector in the Sentinel **Data Connectors** gallery, add a connector definition resource:

```json
{
  "type": "Microsoft.SecurityInsights/dataConnectorDefinitions",
  "apiVersion": "2022-09-01-preview",
  "name": "<Source>Connector",
  "properties": {
    "connectorUiConfig": {
      "title": "<Source> Connector",
      "publisher": "Your Org",
      "descriptionMarkdown": "Ingests <Source> data into Microsoft Sentinel.",
      "logo": "<Source>.svg",
      "connectivityCriteria": [
        {
          "type": "HasDataConnectors"
        }
      ],
      "dataTypes": [
        { "name": "Product<ConnectorName>Events_CL", "lastDataReceivedQuery": "Product<ConnectorName>Events_CL | summarize Time = max(TimeGenerated)" },
        { "name": "Product<ConnectorName>Users_CL",  "lastDataReceivedQuery": "Product<ConnectorName>Users_CL | summarize Time = max(TimeGenerated)" }
      ],
      "instructionSteps": [
        {
          "title": "Deploy the connector",
          "description": "Click the Deploy to Azure button below to provision the Azure Function and DCR.",
          "instructions": []
        }
      ]
    }
  }
}
```

## Deploy Command

```bash
az deployment group create \
  --resource-group "<rg>" \
  --template-file azuredeploy.json \
  --parameters \
      workspaceName="<workspace>" \
      workspaceResourceId="<full-resource-id>" \
      functionAppName="<source>-sentinel-connector" \
      storageAccountName="<source>state<uniquesuffix>" \
      sourceApiKeySecretUri="https://<kv>.vault.azure.net/secrets/<source>-api-key/"
```
