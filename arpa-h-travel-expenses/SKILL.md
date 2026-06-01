---
name: arpa-h-travel-expenses
description: >
  Fill out an ARPA-H Travel Voucher Form PDF from a folder of receipts.
  Use when the user says things like "fill out my travel voucher",
  "complete my ARPA-H expense report", "fill in my travel form from my receipts",
  or references the ARPA-H Travel Voucher Form. Reads all receipts in the
  selected folder, extracts amounts and descriptions, categorizes and orders
  expenses chronologically, calculates POV mileage, and fills the PDF using
  PyMuPDF so all dropdowns work correctly in Adobe Acrobat.
---

# ARPA-H Travel Voucher Skill

## Overview

This skill automates filling the ARPA-H Travel Voucher Form (a fillable PDF) from a folder of receipts. It reads every receipt, extracts the amount and details, maps each to the correct form category, orders everything chronologically by time, and produces a completed PDF that works correctly in Adobe Acrobat and Preview.

---

## Step 1: Setup and Information Gathering

### Confirm folder access

The user's selected folder should contain:

- The blank ARPA-H Travel Voucher Form PDF (filename typically contains "Report" or "Voucher")
- All receipt files (PDFs, PNGs, etc.) named descriptively with dates

### Collect missing information with `AskUserQuestion` before starting work

- **TANUM**: The VCH/TANUM number for this trip. Found at **<https://mynbs.nih.gov>** (NIH NBS Travel system). Format is typically `TANUM##XXX`.
- Ask about ambiguous cases you spot while reading receipts (see "Common Ambiguities" below).

### List all files in the folder

```bash
ls "/path/to/folder"
```

Identify the blank voucher PDF (do not modify it — write output to a new file).

---

## Step 2: Read Every Receipt

Read all files in the folder. For each receipt extract:

| Field              | What to look for                                                 |
| ------------------ | ---------------------------------------------------------------- |
| **Date**           | The transaction date (not the email date for forwarded receipts) |
| **Time**           | Time of transaction — critical for ordering same-day receipts    |
| **Total amount**   | The final charged amount (after discounts, tips included)        |
| **Expense type**   | See category table below                                         |
| **Description**    | Route/vendor/purpose — keep concise                              |
| **Payment method** | Card used — determines "Reimburse To"                            |

**Payment → Reimburse To mapping:**

- HHS Travel Card / Government Visa → `Government Travel Charge Card`
- Personal card, SmarTrip stored value, or cash → `Personal`
- POV mileage → `Personal`

---

## Step 3: Inspect the Form's Fields

Before filling, always introspect the actual PDF to confirm field names (they may differ between form versions):

```python
from pypdf import PdfReader
reader = PdfReader("voucher.pdf")
fields = reader.get_fields()
for name, field in fields.items():
    print(f'{name!r}: type={field.field_type}, value={field.value!r}')

# Check dropdown options on a choice field:
obj = fields['Expensesp1'].indirect_reference.get_object()
print(obj['/Opt'])
```

### Known field names for the standard ARPA-H Travel Voucher Form

**Header (page 1):**

- `VCHTANUM` — VCH/TANUM number
- `Travelers NameRow1` — Traveler's name (usually pre-filled)
- `Destinations` — Destination(s)
- `Date2_af_date_departure` — Departure date
- `Date3_af_date_return` — Return date

**Per-row fields — page 1 has 23 rows:**

| Row   | Date field           | Expense dropdown   | Description field                      | Amount field   | Reimburse dropdown |
| ----- | -------------------- | ------------------ | -------------------------------------- | -------------- | ------------------ |
| 1     | `Date1_af_date`      | `Expensesp1`       | `Description Details of ExpenseRow1`   | `AmountRow1`   | `Dropdown2-1`      |
| 2     | `Date2_af_date`      | `Expensesp1-1`     | `Description Details of ExpenseRow2`   | `AmountRow2`   | `Dropdown2-2`      |
| 3     | `Date3_af_date`      | `Expensesp1-2`     | `Description Details of ExpenseRow3`   | `AmountRow3`   | `Dropdown2-3`      |
| 4     | `Date4_af_date`      | `Expensesp1-3`     | `Description Details of ExpenseRow4`   | `AmountRow4`   | `Dropdown2-4`      |
| 5     | `Date5_af_date`      | `Expensesp1-4`     | `Description Details of ExpenseRow5`   | `AmountRow5`   | `Dropdown2-5`      |
| 6     | `Date6_af_date_row6` | `Expensesp1-5`     | `Description Details of ExpenseRow6`   | `AmountRow6`   | `Dropdown2-6`      |
| 7     | `Date7_af_date_row7` | `Expensesp1-6`     | `Description Details of ExpenseRow7`   | `AmountRow7`   | `Dropdown2-7`      |
| 8     | `Date8_af_date_row8` | `Expensesp1-7`     | `Description Details of ExpenseRow8`   | `AmountRow8`   | `Dropdown2-8`      |
| 9     | `Date9_af_date_row9` | `Expensesp1-8`     | `Description Details of ExpenseRow9`   | `AmountRow9`   | `Dropdown2-9`      |
| 10–23 | `Date{N}_af_date`    | `Expensesp1-{N-1}` | `Description Details of ExpenseRow{N}` | `AmountRow{N}` | `Dropdown2-{N}`    |

**Page 1 total:** `Total`

**Page 2** (Additional Expenses Form — use if more than 23 rows needed):

- Date fields: `Datep2_af_date`, `Datep2_1_af_date` … `Datep2_22_af_date`
- Expense dropdowns: `Expensesp2`, `Expensesp2-1` … `Expensesp2-22`
- Description: `Description Details of ExpenseRow1_2` … `Row23_2`
- Amount: `AmountRow1_2` … `AmountRow23_2`
- Reimburse: `Dropdownp2`, `Dropdownp2-1` … `Dropdownp2-22`
- Page 2 total: `Total_2`

---

## Step 4: Categorize and Order Expenses

### Expense Category Dropdown Values

These strings must match exactly — copy them character-for-character:

```text
ATM Fee
Baggage Fee
Gasoline-Rental Car
Hotel Room Tax
Internet Connection Fee
Laundry
Lodging
Miscellaneous
Parking Fee
Privately Owned Vehicle (POV)
Public Transit
Registration Fee
Rental Car
Tolls
Transportation Network Company
```

Use `Transportation Network Company` for Uber, Lyft, and similar rideshare apps.

### Reimburse To Dropdown Values

```text
Personal
Government Travel Charge Card
```

### Chronological Ordering Rules

Order all rows by date, then by transaction time within the same date.

**Departure day convention** (when the traveler leaves home):

1. `Privately Owned Vehicle (POV)` — driving to departure airport
2. `Baggage Fee` — at departure airport
3. `Internet Connection Fee` — inflight WiFi (purchased early in flight)
4. `Transportation Network Company` — ground transport from arrival airport

**Return day convention** (when the traveler flies home):

1. `Lodging` — hotel checkout day
2. `Transportation Network Company` — rides to departure airport (in time order)
3. `Baggage Fee` — at departure airport
4. `Internet Connection Fee` — inflight WiFi on return flight
5. `Privately Owned Vehicle (POV)` — driving home from arrival airport

For receipts with no clear time (e.g., baggage fees booked in advance), use position within the day's logical sequence.

### POV Mileage Calculation

The GSA sets the POV reimbursement rate each January. **Always look up the current rate** at:

> <https://www.gsa.gov/travel/plan-a-trip/transportation-airfare-rates-pov-rates/privately-owned-vehicle-pov-mileage-reimbursement>

#### 2026 rate: $0.725/mile

Use `Decimal` arithmetic to avoid floating-point rounding errors:

```python
from decimal import Decimal, ROUND_HALF_UP

def calc_pov(miles: float, rate: float = 0.725) -> str:
    result = (Decimal(str(miles)) * Decimal(str(rate))).quantize(
        Decimal('0.01'), rounding=ROUND_HALF_UP
    )
    return str(result)
```

Get mileage from Google Maps printouts (use the shortest reasonable route distance shown).

Description format: `[Origin] to [Destination] ([X] mi @ $[rate])`
Example: `Home to PDX (25.2 mi @ $0.725)`

---

## Step 5: Fill the Form

### CRITICAL: Use PyMuPDF (fitz), NOT pypdf

`pypdf`'s `update_page_form_field_values()` sets the text value (`/V`) but does not update the selected-index field (`/I`) that Adobe Acrobat uses to render dropdowns. This causes Acrobat to display blank dropdowns that clear themselves when clicked. PyMuPDF's `widget.update()` correctly rebuilds all three components (value, index, appearance stream).

Install if needed:

```bash
pip install pymupdf --break-system-packages
```

### Fill script pattern

```python
import fitz
from decimal import Decimal, ROUND_HALF_UP

def calc_pov(miles, rate=0.725):
    return str((Decimal(str(miles)) * Decimal(str(rate))).quantize(
        Decimal('0.01'), rounding=ROUND_HALF_UP))

INPUT  = 'blank_voucher.pdf'
OUTPUT = 'filled_voucher.pdf'

# Build the complete updates dict: field_name -> string value
updates = {
    'VCHTANUM': 'TANUM##XXX',        # from user / mynbs.nih.gov
    'Total': '0.00',                  # calculate and set at end

    # Row 1
    'Date1_af_date':                          '5/17/2026',
    'Expensesp1':                             'Privately Owned Vehicle (POV)',
    'Description Details of ExpenseRow1':     'Home to PDX (25.2 mi @ $0.725)',
    'AmountRow1':                             calc_pov(25.2),
    'Dropdown2-1':                            'Personal',

    # Row 2
    'Date2_af_date':                          '5/17/2026',
    'Expensesp1-1':                           'Baggage Fee',
    'Description Details of ExpenseRow2':     'Alaska Airlines Baggage Fee PDX',
    'AmountRow2':                             '35',
    'Dropdown2-2':                            'Government Travel Charge Card',

    # ... continue for all rows
}

# Calculate total from all AmountRow fields
total = sum(
    float(v) for k, v in updates.items()
    if k.startswith('AmountRow') and v
)
updates['Total'] = f'{total:.2f}'

# Fill using PyMuPDF
doc = fitz.open(INPUT)
for page in doc:
    for w in page.widgets():
        if w.field_name in updates:
            w.field_value = updates[w.field_name]
            w.update()

doc.save(OUTPUT, garbage=4, deflate=True)
print(f"Saved: {OUTPUT}  (Total: ${total:.2f})")
```

---

## Step 6: Verify and Deliver

Convert the output to images to verify visually:

```bash
# Using the pdf skill's script if available:
python /path/to/pdf/skill/scripts/convert_pdf_to_images.py filled.pdf verify_imgs/

# Or with poppler:
pdftoppm -r 150 filled.pdf verify_imgs/page
```

Check:

- All expense category dropdowns show the correct value (not "Select Expense")
- All "Reimburse To" dropdowns show a value (not "Select Reimburse To")
- Dates, descriptions, and amounts are in the correct rows
- Total matches sum of all amounts
- TANUM is filled in

Save the output PDF to the user's folder and present it with `mcp__cowork__present_files`.

---

## Common Receipt Types

| File                       | Expense type                                           | Key fields to extract                                                                |
| -------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| Uber/Lyft PDF              | `Transportation Network Company`                       | Time shown at top of receipt; "Total" amount; payment card shown in Payments section |
| Airline baggage email PDF  | `Baggage Fee`                                          | Use the **flight date**, not the email date; amount in "Total USD"                   |
| Hotel folio PDF            | `Lodging` (or split into `Lodging` + `Hotel Room Tax`) | Total at bottom of folio; checkout date for the row date                             |
| Inflight WiFi PDF          | `Internet Connection Fee`                              | Payment card determines Personal vs Gov't card                                       |
| Google Maps PDF/screenshot | `Privately Owned Vehicle (POV)`                        | Miles from the recommended route; calculate amount                                   |
| SmarTrip/Metro screenshot  | `Public Transit`                                       | Amount from "Change" column (negative = cost paid)                                   |

---

## Common Ambiguities — Ask the User

Use `AskUserQuestion` when you encounter:

- **Duplicate receipts**: Same trip ID, same amount in two files — include only one
- **Hotel with taxes**: Split into `Lodging` + `Hotel Room Tax` rows, or combine into one `Lodging` row?
- **Missing TANUM**: Direct user to <https://mynbs.nih.gov>
- **Multiple mileage legs**: Confirm each leg's mileage if multiple POV receipts exist

---

## Notes for Future-Proofing

- The POV rate changes annually — always fetch the current rate from the GSA link above rather than hardcoding it.
- If the form is updated and field names change, re-run the introspection script in Step 3 to remap them.
- The `Expensesp1` / `Dropdown2-N` naming pattern (where row 1 uses no suffix, and rows 2+ use `-{N-1}`) is quirky — double-check with the introspection output if things seem off.
- If a user has more than 23 expense rows, overflow to the "Additional Expenses Form" (page 2) using the `_2` field variants.
