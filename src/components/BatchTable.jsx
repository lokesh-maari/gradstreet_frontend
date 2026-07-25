import { fmtPct, toPctNumber, bandColor } from '../utils/format'

const COLS = [
  { key: 'Batch', label: 'Batch' },
  { key: 'Total Students', label: 'Total' },
  { key: 'Attempted', label: 'Attempted' },
  { key: 'Attempt %', label: 'Attempt %', pct: true },
  { key: 'Avg %', label: 'Avg %', pct: true },
  { key: 'Qualified', label: 'Qualified' },
]

function TableBody({ rows, showTotalRow, totalRow }) {
  return (
    <table className="batch-table">
      <thead>
        <tr>
          {COLS.map((c) => (
            <th key={c.key}>{c.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {COLS.map((c) => {
              const val = r[c.key]
              if (c.pct) {
                const pctNum = toPctNumber(val)
                return (
                  <td key={c.key} style={{ color: bandColor(pctNum) }}>
                    {fmtPct(val)}
                  </td>
                )
              }
              return <td key={c.key}>{val ?? '-'}</td>
            })}
          </tr>
        ))}
        {showTotalRow && totalRow && (
          <tr className="total-row">
            {COLS.map((c) => {
              const val = totalRow[c.key]
              return <td key={c.key}>{c.pct ? fmtPct(val) : val ?? '-'}</td>
            })}
          </tr>
        )}
      </tbody>
    </table>
  )
}

// Standalone single-row table used for the TOTAL row under a dual-table split
function TotalOnlyTable({ totalRow }) {
  return (
    <table className="batch-table">
      <tbody>
        <tr className="total-row">
          {COLS.map((c) => {
            const val = totalRow[c.key]
            return <td key={c.key}>{c.pct ? fmtPct(val) : val ?? '-'}</td>
          })}
        </tr>
      </tbody>
    </table>
  )
}

export default function BatchTable({ batchSummary }) {
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
            <TableBody rows={left} showTotalRow={false} />
          </div>
          <div>
            <TableBody rows={right} showTotalRow={false} />
          </div>
        </div>
        {totalRow && (
          <div style={{ marginTop: 10 }}>
            <TotalOnlyTable totalRow={totalRow} />
          </div>
        )}
      </>
    )
  }

  return <TableBody rows={rows} showTotalRow={true} totalRow={totalRow} />
}
