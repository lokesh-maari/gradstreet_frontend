import { fmtPct, fmtNum, toPctNumber, bandColor, findBatchProgress } from '../utils/format'

// Column presets used by the two poster templates. Backend batch_summary_df
// rows always use these exact keys (see service.py): Batch, Total Students,
// Attempted, Attempt %, Average %, Qualified, ">=80%", etc.
export const ASSESSMENT_SUMMARY_COLS = [
  { key: 'Batch', label: 'Batch' },
  { key: 'Total Students', label: 'Total' },
  { key: 'Attempted', label: 'Attempted' },
  { key: 'Attempt %', label: 'Attempt %', pct: true },
  { key: 'Average %', label: 'Avg %', pct: true },
  { key: 'Qualified', label: 'Qualified' },
  { key: '__progress__', label: 'Progress', progress: true },
]

export const BATCH_WISE_SUMMARY_COLS = [
  { key: 'Batch', label: 'Batch' },
  { key: 'Total Students', label: 'Total' },
  { key: 'Attempted', label: 'Attempted' },
  { key: 'Attempt %', label: 'Attempt %', pct: true },
  { key: 'Qualified', label: 'Qualified' },
  { key: 'Average %', label: 'Avg %', pct: true },
  { key: '>=80%', label: '>= 80%' },
]

// Cycling color palette used to give each batch its own colored badge in
// the "Batch" column, matching the reference report's color-coded batch
// pills (teal Cyber Security-1, red Cyber Security-2, purple AIML-1, ...).
const BATCH_COLORS = [
  '#0E8F8F', '#E63946', '#4E17A6', '#FE6B02',
  '#1657E0', '#08A66C', '#C77F00', '#7626E5',
  '#2B208D', '#1DA1A1',
]

function batchColor(name, index) {
  // Stable per-name color so the same batch always gets the same color
  // even if row order shifts between renders.
  let hash = 0
  const str = String(name || index)
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0
  }
  return BATCH_COLORS[hash % BATCH_COLORS.length]
}

function BatchBadge({ name, color }) {
  const initial = String(name || '?').trim().charAt(0).toUpperCase() || '?'
  return (
    <span className="batch-badge">
      <span className="batch-badge-dot" style={{ background: color }}>
        {initial}
      </span>
      {name}
    </span>
  )
}

function Cell({ col, row, progressByBatch, colorizeBatch, rowIndex }) {
  if (col.progress) {
    const pctNum =
      toPctNumber(row['Attempt %']) ||
      findBatchProgress(progressByBatch, row.Batch) ||
      0
    return (
      <td>
        <div className="table-progress-track">
          <div
            className="table-progress-fill"
            style={{ width: `${Math.min(pctNum, 100)}%` }}
          />
        </div>
      </td>
    )
  }

  const val = row[col.key]

  if (col.key === 'Batch' && colorizeBatch) {
    const isTotal = String(val).toUpperCase() === 'TOTAL'
    return (
      <td>
        {isTotal ? val : <BatchBadge name={val} color={batchColor(val, rowIndex)} />}
      </td>
    )
  }

  if (col.pct) {
    const pctNum = toPctNumber(val)
    return (
      <td style={{ color: bandColor(pctNum) }}>
        {fmtPct(val)}
      </td>
    )
  }

  return <td>{val === null || val === undefined || val === '' ? '-' : fmtNum(val)}</td>
}

function TableBody({ rows, columns, showTotalRow, totalRow, progressByBatch, colorizeBatch, indexOffset = 0 }) {
  return (
    <table className="batch-table">
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c.key}>{c.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {columns.map((c) => (
              <Cell
                key={c.key}
                col={c}
                row={r}
                progressByBatch={progressByBatch}
                colorizeBatch={colorizeBatch}
                rowIndex={indexOffset + i}
              />
            ))}
          </tr>
        ))}
        {showTotalRow && totalRow && (
          <tr className="total-row">
            {columns.map((c) => (
              <Cell key={c.key} col={c} row={totalRow} progressByBatch={progressByBatch} colorizeBatch={colorizeBatch} rowIndex={-1} />
            ))}
          </tr>
        )}
      </tbody>
    </table>
  )
}

// Standalone single-row table used for the TOTAL row under a dual-table split
function TotalOnlyTable({ totalRow, columns, progressByBatch, colorizeBatch }) {
  return (
    <table className="batch-table">
      <tbody>
        <tr className="total-row">
          {columns.map((c) => (
            <Cell key={c.key} col={c} row={totalRow} progressByBatch={progressByBatch} colorizeBatch={colorizeBatch} rowIndex={-1} />
          ))}
        </tr>
      </tbody>
    </table>
  )
}

export default function BatchTable({
  batchSummary,
  columns = ASSESSMENT_SUMMARY_COLS,
  progressByBatch = [],
  colorizeBatch = false,
}) {
  const rows = (batchSummary || []).filter(
    (r) => String(r.Batch).toUpperCase() !== 'TOTAL'
  )
  const totalRow = (batchSummary || []).find(
    (r) => String(r.Batch).toUpperCase() === 'TOTAL'
  )

  // Split into two side-by-side tables for readability when there are many
  // batches, exactly like the original template.
  if (rows.length > 12) {
    const mid = Math.ceil(rows.length / 2)
    const left = rows.slice(0, mid)
    const right = rows.slice(mid)
    return (
      <>
        <div className="dual-table-wrap">
          <div>
            <TableBody rows={left} columns={columns} showTotalRow={false} progressByBatch={progressByBatch} colorizeBatch={colorizeBatch} indexOffset={0} />
          </div>
          <div>
            <TableBody rows={right} columns={columns} showTotalRow={false} progressByBatch={progressByBatch} colorizeBatch={colorizeBatch} indexOffset={mid} />
          </div>
        </div>
        {totalRow && (
          <div style={{ marginTop: 10 }}>
            <TotalOnlyTable totalRow={totalRow} columns={columns} progressByBatch={progressByBatch} colorizeBatch={colorizeBatch} />
          </div>
        )}
      </>
    )
  }

  return (
    <TableBody
      rows={rows}
      columns={columns}
      showTotalRow={true}
      totalRow={totalRow}
      progressByBatch={progressByBatch}
      colorizeBatch={colorizeBatch}
      indexOffset={0}
    />
  )
}
