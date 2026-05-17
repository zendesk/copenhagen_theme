# KQL Schema Design for Sentinel Custom Tables

## Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Table name | `Product<ConnectorName><LogType>_CL` | `ProductSalesforceLogins_CL` |
| Column names | PascalCase, no spaces | `EventType`, `CreatedDate` |
| Prefix | Always start with `Product` | `ProductHubSpotAuditLogs_CL` |
| ID columns | Suffix with type: `Id` | `EventId`, `UserId` |
| Timestamp columns | Suffix `Date` or `Time` | `CreatedDate`, `LastModifiedTime` |
| Raw/nested data | `RawData` (`dynamic`) | `RawData` |

## Column Type Mapping

### Common Source → Log Analytics Type Mapping

| Source Type | Log Analytics Type | Notes |
|-------------|-------------------|-------|
| `string` / `text` | `string` | Default for most fields |
| `number` / `float` | `real` | Use for decimals |
| `number` (integer) | `int` or `long` | Use `long` for large IDs |
| `bool` / `boolean` | `boolean` | — |
| `datetime` / ISO 8601 | `datetime` | LA parses ISO 8601 natively |
| Enum / categorical | `string` | Store label, not numeric value |
| Nested object / array | `dynamic` | Stores as JSON; queryable with `mv-expand` |

## Recommended Table Schemas

Schemas below are illustrative examples. Adapt column names and types to your source system.

### `Product<ConnectorName>Events_CL` — Generic event/audit log table

```kql
// Schema preview via KQL
Product<ConnectorName>Events_CL
| getschema
```

| Column | Type | Description |
|--------|------|-------------|
| `TimeGenerated` | `datetime` | Required by LA; set to ingestion time or source event time |
| `EventId` | `string` | Unique event ID from the source system |
| `EventType` | `string` | Type or category of the event |
| `ActorId` | `string` | User or service principal that triggered the event |
| `ActorEmail` | `string` | Actor's email address (PII — see guidelines below) |
| `TargetId` | `string` | ID of the resource affected |
| `TargetType` | `string` | Type of the resource affected |
| `Status` | `string` | Outcome: `success`, `failure`, `pending`, etc. |
| `IpAddress` | `string` | Source IP of the action |
| `CreatedDate` | `datetime` | When the event occurred in the source system |
| `RawData` | `dynamic` | Full source payload for ad-hoc queries |

### `Product<ConnectorName>Users_CL` — User/identity records table

| Column | Type | Description |
|--------|------|-------------|
| `TimeGenerated` | `datetime` | |
| `UserId` | `string` | Unique user ID in the source system |
| `Email` | `string` | Primary email (PII) |
| `DisplayName` | `string` | Full name (PII) |
| `Role` | `string` | User role or permission level |
| `Status` | `string` | `active`, `suspended`, `deleted` |
| `CreatedDate` | `datetime` | Account creation time |
| `LastLoginDate` | `datetime` | Most recent login |
| `Department` | `string` | Org unit |
| `RawData` | `dynamic` | |

## Transform KQL — Type Safety Patterns

Always cast in the DCR transform KQL to guarantee schema compliance:

```kql
// Generic transform skeleton — adapt field names to your source
// Note: coalesce() is not supported in DCR transform KQL — use iif(isnotempty(...), ..., ...) instead
source
| extend TimeGenerated  = iif(isnotempty(event_timestamp), todatetime(event_timestamp), now())
| extend EventId        = tostring(id)
| extend EventType      = tostring(event_type)
| extend ActorId        = tostring(actor_id)
| extend ActorEmail     = tostring(actor_email)
| extend TargetId       = tostring(target_id)
| extend TargetType     = tostring(target_type)
| extend Status         = tostring(outcome)
| extend IpAddress      = tostring(ip_address)
| extend CreatedDate    = todatetime(created_at)
| extend RawData        = parse_json(raw_payload)
| project TimeGenerated, EventId, EventType, ActorId, ActorEmail,
          TargetId, TargetType, Status, IpAddress, CreatedDate, RawData
```

Common cast helpers:
```kql
// Parse nested JSON string
| extend ParsedFields = parse_json(nested_json_column)
| extend Email = tostring(ParsedFields.email)

// Split comma-delimited string into dynamic array
| extend TagsArray = split(tags_string, ",")

// Filter out noise at ingestion time
| where EventType !in ("ping", "heartbeat")
```

## Common KQL Queries for Sentinel

```kql
// Events in the last 24 hours by type
Product<ConnectorName>Events_CL
| where TimeGenerated > ago(24h)
| summarize Count = count() by EventType
| order by Count desc

// Failed actions by actor
Product<ConnectorName>Events_CL
| where TimeGenerated > ago(7d)
| where Status == "failure"
| summarize FailureCount = count() by ActorEmail
| order by FailureCount desc

// Dormant users — no login in 90 days (threat hunting)
Product<ConnectorName>Users_CL
| where LastLoginDate < ago(90d)
| where Status == "active"
| project UserId, Email, DisplayName, LastLoginDate, Department

// Actions from unexpected IP ranges
Product<ConnectorName>Events_CL
| where TimeGenerated > ago(24h)
| where IpAddress !startswith "10." and IpAddress !startswith "192.168."
| project TimeGenerated, EventType, ActorEmail, IpAddress

// Join events to users
Product<ConnectorName>Events_CL
| join kind=leftouter (
    Product<ConnectorName>Users_CL
    | project UserId, DisplayName, Department, Role
) on $left.ActorId == $right.UserId
| project TimeGenerated, EventType, ActorEmail, DisplayName, Department, Status
```

## PII & Data Sensitivity Guidelines

- **Email, Phone, FirstName, LastName** are PII — ensure your Log Analytics workspace has appropriate **data retention policies** and **RBAC table-level access** configured
- For high-security deployments, hash PII at ingestion:
  ```kql
  | extend EmailHash = hash_sha256(Email)
  | project-away Email
  ```
- Use Log Analytics **dedicated cluster** with CMK (Customer-Managed Keys) if contractually required
- Apply LA workspace **table-level RBAC** to restrict who can query `_CL` tables with sensitive data

## Schema Evolution

When adding new columns to an existing `_CL` table:
1. Add the column to the LA table definition (portal or ARM)
2. Add the column to the DCR `streamDeclarations`
3. Add the cast in the DCR transform KQL
4. Old rows will have `null` for the new column — handle in KQL with `isnotnull()`

When **removing** columns: LA does not support column deletion from custom tables. Use `project-away` in queries and stop populating the field.
