# Codeless Connector Platform (CCP)

The CCP lets you build a Sentinel data connector using a declarative JSON definition — no Azure Function code required.

## When to Use CCP

- The source API is publicly reachable over HTTPS
- Authentication is `APIKey`, `OAuth2 ClientCredentials`, or `Basic`
- Pagination follows a standard pattern (`NextLink`, `NextPageToken`, `Offset`)
- No complex pre-ingestion transformation logic is needed
- You want the connector to appear natively in the Sentinel Data Connectors gallery

## CCP Connector Definition Structure

```json
{
  "kind": "RestApiPoller",
  "properties": {
    "connectorDefinitionName": "<ConnectorName>",
    "auth": { ... },
    "request": { ... },
    "paging": { ... },
    "response": { ... }
  }
}
```

---

## Auth Block Options

### API Key (header)

```json
"auth": {
  "type": "APIKey",
  "apiKey": "<secret-value>",
  "apiKeyName": "Authorization",
  "apiKeyIdentifier": "Bearer"
}
```

### OAuth 2.0 Client Credentials

```json
"auth": {
  "type": "OAuth2",
  "clientId": "<client-id>",
  "clientSecret": "<secret>",
  "tokenEndpoint": "https://auth.example.com/oauth/token",
  "scope": "read:events",
  "grantType": "client_credentials"
}
```

### Basic Auth

```json
"auth": {
  "type": "Basic",
  "userName": "<username>",
  "password": "<password>"
}
```

---

## Request Block

```json
"request": {
  "apiEndpoint": "https://api.example.com/v1/events",
  "httpMethod": "GET",
  "queryParameters": {
    "start_time": "{{_QueryWindowStartTime}}",
    "end_time":   "{{_QueryWindowEndTime}}",
    "limit":      "500"
  },
  "headers": {
    "Accept": "application/json"
  },
  "rateLimitQPS": 10,
  "queryTimeFormat": "yyyy-MM-ddTHH:mm:ssZ",
  "queryWindowInMin": 5
}
```

### Built-in Template Variables

| Variable | Resolves To |
| ---------- | ------------ |
| `{{_QueryWindowStartTime}}` | Start of the current polling window (ISO 8601) |
| `{{_QueryWindowEndTime}}` | End of the current polling window (ISO 8601) |
| `{{_CurrentWorkspaceId}}` | Log Analytics workspace ID |

---

## Paging Block Options

### NextLink (RFC 8288 / JSON body field)

```json
"paging": {
  "pagingType": "NextPageToken",
  "nextPageTokenJsonPath": "$.pagination.next_cursor",
  "nextPageParaName": "cursor",
  "pageSizeParaName": "limit",
  "pageSize": 500
}
```

### Offset

```json
"paging": {
  "pagingType": "Offset",
  "offsetParaName": "offset",
  "pageSizeParaName": "limit",
  "pageSize": 500
}
```

### Link Header

```json
"paging": {
  "pagingType": "LinkHeader"
}
```

---

## Response Block

```json
"response": {
  "eventsJsonPaths": ["$.data", "$.events", "$.results"],
  "format": "json"
}
```

- `eventsJsonPaths`: JSONPath to the array of records in the response body. If the response root is an array, use `["$"]`.

---

## Full CCP Example

```json
{
  "kind": "RestApiPoller",
  "properties": {
    "connectorDefinitionName": "ExampleSaaSConnector",
    "dataType": "ProductExampleSaaSEvents_CL",
    "auth": {
      "type": "APIKey",
      "apiKey": "{{ExampleSaaSApiKey}}",
      "apiKeyName": "Authorization",
      "apiKeyIdentifier": "Bearer"
    },
    "request": {
      "apiEndpoint": "https://api.example.com/v1/audit/events",
      "httpMethod": "GET",
      "queryParameters": {
        "start": "{{_QueryWindowStartTime}}",
        "end":   "{{_QueryWindowEndTime}}",
        "limit": "500"
      },
      "headers": { "Accept": "application/json" },
      "queryTimeFormat": "yyyy-MM-ddTHH:mm:ssZ",
      "queryWindowInMin": 5,
      "rateLimitQPS": 5
    },
    "paging": {
      "pagingType": "NextPageToken",
      "nextPageTokenJsonPath": "$.meta.next_cursor",
      "nextPageParaName": "cursor",
      "pageSizeParaName": "limit",
      "pageSize": 500
    },
    "response": {
      "eventsJsonPaths": ["$.events"],
      "format": "json"
    }
  }
}
```

---

## ARM Deployment of a CCP Connector

```json
{
  "type": "Microsoft.SecurityInsights/dataConnectors",
  "apiVersion": "2023-02-01-preview",
  "name": "ExampleSaaSConnector",
  "kind": "RestApiPoller",
  "properties": { "<paste CCP properties block above>" }
}
```

---

## CCP Limitations

| Limitation | Notes |
| ----------- | ------- |
| No custom code | Complex transforms require Azure Function instead |
| HTTP/REST only | No GraphQL, gRPC, or WebSocket sources |
| Max response size per poll | ~100 MB — use smaller `queryWindowInMin` for high-volume sources |
| Secret management | Secrets are stored as workspace-scoped parameters; prefer Azure Function + Key Vault for secrets requiring rotation |
| Debugging | Limited error visibility compared to Azure Function logs — use LA ingestion latency metrics to detect issues |

---

## Choosing Between CCP and Azure Function

| Factor | CCP | Azure Function |
| -------- | ----- | --------------- |
| Dev effort | Low (JSON config) | Medium (code) |
| Secret rotation | Manual parameter update | Key Vault (automated) |
| Custom transform logic | ❌ | ✅ |
| Stateful pagination | ✅ Declarative | ✅ Full control |
| Error observability | Limited | Full (App Insights) |
| Gallery listing | ✅ Native | Via manifest only |

## References

- [Create a codeless connector for Microsoft Sentinel (Microsoft Learn)](https://learn.microsoft.com/en-us/azure/sentinel/create-codeless-connector)
