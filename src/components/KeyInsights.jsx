import { fmtNum } from '../utils/format'

// The "KEY INSIGHTS" row on the Batch-Wise Summary Report poster: three
// icon-boxes restating the same numbers as the highlight badges above the
// batch table, but as full sentences -- exactly like the reference report.
export default function KeyInsights({ posterHighlights }) {
  const ph = posterHighlights || {}
  const topAvg = ph.highest_average_batch
  const topAttempt = ph.highest_attempt_batch
  const scored80 = ph.scored_80_plus_total

  const items = [
    {
      color: 'var(--purple-primary)',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4">
          <polyline points="3 17 9 11 13 15 21 6" />
          <polyline points="14 6 21 6 21 13" />
        </svg>
      ),
      text: topAvg
        ? (
          <>
            <strong>{topAvg.batch}</strong> recorded the highest average score
            {typeof topAvg.avg_pct === 'number' ? ` (${topAvg.avg_pct.toFixed(2)}%)` : ''}.
          </>
        )
        : 'Batch average data unavailable.',
    },
    {
      color: 'var(--blue)',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
          <circle cx="10" cy="7" r="4" />
        </svg>
      ),
      text: topAttempt
        ? (
          <>
            <strong>{topAttempt.batch}</strong> recorded the highest attempt count
            {typeof topAttempt.attempted === 'number' ? ` (${fmtNum(topAttempt.attempted)})` : ''}.
          </>
        )
        : 'Attempt count data unavailable.',
    },
    {
      color: 'var(--green)',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2">
          <polygon points="12 2 15 9 22 9.3 16.5 14 18.2 21 12 17.2 5.8 21 7.5 14 2 9.3 9 9" />
        </svg>
      ),
      text: (
        <>
          <strong>{fmtNum(scored80)}</strong> students scored 80% and above.
        </>
      ),
    },
  ]

  return (
    <div className="key-insights-row">
      {items.map((item, i) => (
        <div className="insight-card" key={i}>
          <div className="insight-icon-circle" style={{ background: item.color }}>
            {item.icon}
          </div>
          <div className="insight-text">{item.text}</div>
        </div>
      ))}
    </div>
  )
}
