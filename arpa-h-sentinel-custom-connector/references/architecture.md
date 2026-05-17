# Connector Architecture Patterns

## Pattern 1: Azure Function + Log Ingestion API (Recommended for SaaS APIs)

```
Source API (SaaS / REST / custom)
    │
    ▼
Azure Function (Timer Trigger)
    │  - Fetch records since last_run timestamp
    │  - Transform to DCR schema
    │  - Batch into ≤1 MB chunks
    │
    ▼
Log Ingestion API (DCE endpoint)
    │
    ▼
DCR (optional KQL transform)
    │
    ▼
Log Analytics Custom Table (_CL)
    │
    ▼
Microsoft Sentinel (Analytics Rules, Workbooks, Hunting)
```

### State Tracking

Store `last_run` in Azure Blob Storage (JSON) or Azure Table Storage:

```python
# blob_state.py
import json
from datetime import datetime, timezone
from azure.storage.blob import BlobServiceClient
from azure.identity import DefaultAzureCredential

CONTAINER = "connector-state"
BLOB_NAME  = "<source>-<entity>-state.json"

def get_last_run(account_url: str) -> datetime:
    client = BlobServiceClient(account_url, DefaultAzureCredential())
    blob = client.get_blob_client(CONTAINER, BLOB_NAME)
    try:
        data = json.loads(blob.download_blob().readall())
        return datetime.fromisoformat(data["last_run"])
    except Exception:
        return datetime(2020, 1, 1, tzinfo=timezone.utc)  # bootstrap

def set_last_run(account_url: str, ts: datetime) -> None:
    client = BlobServiceClient(account_url, DefaultAzureCredential())
    blob = client.get_blob_client(CONTAINER, BLOB_NAME)
    blob.upload_blob(json.dumps({"last_run": ts.isoformat()}), overwrite=True)
```

### Full Azure Function Pattern (Python)

```python
# function_app.py
import azure.functions as func
import logging
import os
from datetime import datetime, timezone
from azure.monitor.ingestion import LogsIngestionClient
from azure.identity import DefaultAzureCredential

app = func.FunctionApp()

DCE_ENDPOINT  = os.environ["DCE_ENDPOINT"]
DCR_RULE_ID   = os.environ["DCR_RULE_ID"]
DCR_STREAM    = os.environ["DCR_STREAM_NAME"]  # e.g. "Custom-Product<ConnectorName><LogType>_CL"
STORAGE_URL   = os.environ["STATE_STORAGE_URL"]

@app.timer_trigger(schedule="0 */5 * * * *", arg_name="timer", run_on_startup=False)
def source_connector(timer: func.TimerRequest) -> None:
    credential = DefaultAzureCredential()
    ingestion_client = LogsIngestionClient(DCE_ENDPOINT, credential)

    last_run = get_last_run(STORAGE_URL)
    run_start = datetime.now(timezone.utc)

    records = fetch_source_records(since=last_run)   # your API fetch logic
    transformed = [transform(r) for r in records]

    # Batch into ≤1 MB chunks (~500 records per batch for typical payloads)
    for batch in chunk(transformed, size=500):
        ingestion_client.upload(rule_id=DCR_RULE_ID, stream_name=DCR_STREAM, logs=batch)
        logging.info("Ingested batch of %d records", len(batch))

    set_last_run(STORAGE_URL, run_start)
    logging.info("Connector run complete. Processed %d records.", len(transformed))


def chunk(lst, size):
    for i in range(0, len(lst), size):
        yield lst[i:i + size]
```

### Required App Settings

| Setting | Value |
|---------|-------|
| `DCE_ENDPOINT` | `https://<dce-name>.<region>.ingest.monitor.azure.com` |
| `DCR_RULE_ID` | DCR immutable ID (`dcr-xxxxxxxxxxxxxxxx`) |
| `DCR_STREAM_NAME` | `Custom-Product<ConnectorName><LogType>_CL` |
| `STATE_STORAGE_URL` | `https://<account>.blob.core.windows.net` |
| `SOURCE_API_KEY` | Key Vault reference: `@Microsoft.KeyVault(SecretUri=...)` |

### Managed Identity Setup

```bash
# Enable system-assigned identity on Function App
az functionapp identity assign \
  --name "<function-app-name>" \
  --resource-group "<rg>"

# Assign Monitoring Metrics Publisher on the DCR
PRINCIPAL_ID=$(az functionapp identity show \
  --name "<function-app-name>" \
  --resource-group "<rg>" \
  --query principalId -o tsv)

az role assignment create \
  --assignee "$PRINCIPAL_ID" \
  --role "Monitoring Metrics Publisher" \
  --scope "<dcr-resource-id>"
```

---

## Pattern 2: Codeless Connector Platform (CCP)

No Azure Function required. Connector runs inside Sentinel's infrastructure.

See [CCP Reference](./ccp.md) for full details.

**Use when:**
- The SaaS API is publicly accessible with predictable pagination
- No complex transformation logic is needed
- You want a connector that appears natively in the Sentinel Data Connectors gallery

---

## Pattern 3: Logic App

**Use when:**
- Low event volume (< 1000 events/hour)
- You need to orchestrate multi-step enrichment before ingestion
- Non-developer team members will maintain the workflow

**NOT recommended for:**
- High-frequency polling (use Azure Function instead — Logic Apps have per-action pricing)
- Complex stateful pagination

---

## Choosing a Pattern

| Criteria | Azure Function | CCP | Logic App |
|----------|---------------|-----|-----------|
| SaaS REST API | ✅ Best | ✅ Good | ⚠️ OK |
| High volume (>10k events/hr) | ✅ | ⚠️ | ❌ |
| Complex transform logic | ✅ | ❌ | ⚠️ |
| No-code authoring | ❌ | ✅ | ✅ |
| Native Sentinel gallery entry | Via manifest | ✅ | Via manifest |
| Cost at scale | Low (consumption) | Included | High |
| Stateful pagination | ✅ Full control | ✅ Declarative | ⚠️ |
