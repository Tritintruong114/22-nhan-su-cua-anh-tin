# Sourcing Pipeline

Stable workflow for FireGroup / hiring sourcing runs.

## Goal
Turn raw Apify LinkedIn search results into one consistent shortlist format before anything is pushed to Google Sheets.

## Contract
1. Collect raw items from Apify in one or more batches.
2. Save raw JSON locally.
3. Run `normalize_apify_shortlist.py` with a role spec and requested count.
4. Only when normalized output reaches the requested count (or explicitly marked partial by the operator) should rows be pushed to Google Sheets.
5. Google Sheets output must always use the same headers and style contract.

## Standard output headers
- Rank
- Candidate
- LinkedIn
- Current Title
- Company
- Location
- Fit Score
- Match Level
- Years Signal
- Key Signals
- Why Fit
- Confidence
- Source
- Notes

## Standard style contract
- Tab name: `Shortlist_<Role>_FireGroup`
- Freeze header row
- Hide gridlines
- Dark header background with white text
- Auto resize columns
- Sort by `Fit Score` descending
- Apply row colors by `Match Level` band
- Do not push preview batches when the user asked for a fixed final count

## Usage
```bash
python3 sourcing_pipeline/normalize_apify_shortlist.py \
  --spec sourcing_pipeline/specs/firegroup_product_designer.json \
  --input raw/apify_pd_batch1.json raw/apify_pd_batch2.json \
  --requested-count 50 \
  --output-json out/product_designer_shortlist.json \
  --output-csv out/product_designer_shortlist.csv
```

## Notes
- This script is the cleanup / ranking layer.
- Google Sheets pushing still happens after normalized output is validated, using the connected workspace tools.
- If multiple Apify runs are needed, merge them through the script instead of manually curating rows in Sheets.
