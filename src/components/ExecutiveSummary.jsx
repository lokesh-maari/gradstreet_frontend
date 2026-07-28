import { fmtPct, fmtNum } from '../utils/format'

const ICONS = {
  people: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
      <circle cx="10" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  check: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  target: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" fill="#fff" />
    </svg>
  ),
  ribbon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2">
      <circle cx="12" cy="8" r="5" />
      <path d="M9 13 7 22l5-3 5 3-2-9" />
    </svg>
  ),
  percent: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2">
      <line x1="19" y1="5" x2="5" y2="19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  ),
  star: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" stroke="#fff" strokeWidth="1">
      <polygon points="12 2 15 9 22 9.3 16.5 14 18.2 21 12 17.2 5.8 21 7.5 14 2 9.3 9 9" />
    </svg>
  ),
}

// The 6-KPI "Executive Summary" row on the Batch-Wise Summary Report
// poster: Total Students / Attempted / Attempt Rate / Qualified /
// Qualification Rate / Average Score.
export default function ExecutiveSummary({ totals }) {
  const t = totals || {}

  const cards = [
    {
      icon: ICONS.people,
      color: '#1657E0',
      value: fmtNum(t.total_students),
      label: 'Total Students',
    },
    {
      icon: ICONS.check,
      color: '#08A66C',
      value: fmtNum(t.attempted),
      label: 'Attempted',
    },
    {
      icon: ICONS.target,
      color: 'var(--orange)',
      value: fmtPct(t.attempt_pct),
      label: 'Attempt Rate',
      className: 'tag-orange',
    },
    {
      icon: ICONS.ribbon,
      color: '#0E8F8F',
      value: fmtNum(t.qualified),
      label: 'Qualified',
      className: 'tag-blue',
    },
    {
      icon: ICONS.percent,
      color: 'var(--purple-primary)',
      value: fmtPct(t.qualified_pct_of_attempted),
      label: 'Qualification Rate',
    },
    {
      icon: ICONS.star,
      color: '#5116AE',
      value: fmtPct(t.average_pct),
      label: 'Average Score',
    },
  ]

  return (
    <div className="kpi-card">
      {cards.map((c, i) => (
        <div className="kpi" key={i}>
          <div className="kpi-circle" style={{ background: c.color }}>
            {c.icon}
          </div>
          <div className={`kpi-value ${c.className || ''}`}>{c.value}</div>
          <div className="kpi-label">{c.label}</div>
        </div>
      ))}
    </div>
  )
}
