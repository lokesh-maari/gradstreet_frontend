import { fmtNum } from '../utils/format'

// The 3 badge cards under the Executive Summary KPI row on the
// Batch-Wise Summary Report poster:
//   1. "N SCORED >= 80%"                (orange trending-up icon, peach tint)
//   2. "{Batch} - HIGHEST AVERAGE % BATCH"     (gold trophy icon, cream tint)
//   3. "{Batch} - HIGHEST ATTEMPT COUNT BATCH" (teal people icon, blue tint)
//
// Driven entirely by `poster_highlights` from the API response.
export default function HighlightBadges({ posterHighlights }) {
  const ph = posterHighlights || {}
  const scored80 = ph.scored_80_plus_total
  const topAvg = ph.highest_average_batch
  const topAttempt = ph.highest_attempt_batch

  return (
    <div className="badge-row">
      <div className="badge-card badge-card--peach">
        <div className="badge-icon-circle" style={{ background: 'var(--orange)' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4">
            <polyline points="3 17 9 11 13 15 21 6" />
            <polyline points="14 6 21 6 21 13" />
          </svg>
        </div>
        <div className="badge-value" style={{ color: 'var(--orange)' }}>{fmtNum(scored80)}</div>
        <div className="badge-label">SCORED &gt;= 80%</div>
      </div>

      <div className="badge-card badge-card--gold">
        <div className="badge-icon-circle" style={{ background: '#F0B429' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2">
            <path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4Z" />
            <path d="M17 5h3a3 3 0 0 1-3 5M7 5H4a3 3 0 0 0 3 5" />
          </svg>
        </div>
        <div className="badge-value badge-value-name" style={{ color: '#C77F00' }}>
          {topAvg?.batch || '-'}
        </div>
        <div className="badge-label">HIGHEST AVERAGE % BATCH</div>
      </div>

      <div className="badge-card badge-card--blue">
        <div className="badge-icon-circle" style={{ background: '#0E8F8F' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
            <circle cx="10" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <div className="badge-value badge-value-name" style={{ color: '#0E8F8F' }}>
          {topAttempt?.batch || '-'}
        </div>
        <div className="badge-label">HIGHEST ATTEMPT COUNT BATCH</div>
      </div>
    </div>
  )
}
