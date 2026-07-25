# GradStreet Report — React version

Same exact poster layout, colors, and PNG/PDF export as the HTML version —
rewritten as a Vite + React app. Tested: `npm install` + `npm run build`
both complete cleanly, and the dev server serves correctly.

```
src/
├── App.jsx                     # state, upload flow, PNG/PDF export
├── main.jsx                    # React entry point
├── index.css                   # all styling (ported 1:1 from the template)
├── utils/
│   └── format.js               # bandColor / fmtPct / toPctNumber helpers
└── components/
    ├── Controls.jsx             # upload bar + Generate/Download buttons
    ├── Poster.jsx                # the exact poster layout (exported node)
    ├── BatchTable.jsx            # single table, or split into 2 columns if >12 batches
    ├── ProgressBars.jsx          # "Attempt Progress by Batch" (only if data present)
    ├── ScoreDistribution.jsx     # score buckets (only if data present)
    └── KeyHighlights.jsx         # the 3-bullet highlights box
```

## Run it

You still need the backend from before running (`uvicorn app.main:app --reload --port 8000`).

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). The API endpoint
field defaults to `http://127.0.0.1:8000/reports/generate` — change it if
your backend runs elsewhere.

## Build for production

```bash
npm run build
```
Outputs static files to `dist/`, deployable anywhere (Vercel, Netlify, etc.).

## How the layout logic maps to components

- **Poster.jsx** renders the full report exactly like the original template:
  brand header, college title, assessment banner, 4-KPI card, batch table,
  progress bars, score distribution, key highlights, motivation box, footer.
- **BatchTable.jsx** replicates the original's rule: if a college has more
  than 12 batches (e.g. SNIST with 30 batches across CSE/IT/ECE/etc.), it
  splits into two side-by-side tables with a single TOTAL row underneath —
  otherwise it's one table with the TOTAL row inline.
- **ProgressBars.jsx** / **ScoreDistribution.jsx** only render if the
  backend response actually includes that data (e.g. SVCET has progress
  bars but no score distribution; NREC has score distribution but only one
  batch row).
- Colors (green/blue/orange/red bands for percentages) use the same
  thresholds as before: ≥80% green, ≥60% blue, ≥40% orange, else red.

## Data shape expected

Same as before — the raw JSON from `POST /reports/generate`:
```json
{
  "college": "SVCET",
  "assessment_name": "SVCET Searching Day 8 Assessment",
  "assessment_date": "23 July 2026",
  "data": {
    "totals": {...},
    "batch_summary": [...],
    "score_distribution": {...},
    "key_highlights": {...},
    "progress_by_batch": [...]
  }
}
```
