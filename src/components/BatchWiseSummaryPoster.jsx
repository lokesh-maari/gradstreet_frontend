import { forwardRef } from 'react'
import BatchTable, { BATCH_WISE_SUMMARY_COLS } from './BatchTable'
import ExecutiveSummary from './ExecutiveSummary'
import HighlightBadges from './HighlightBadges'
import KeyInsights from './KeyInsights'
import CollegeBadge from './CollegeBadge'
import BrandLogo from './BrandLogo'

function cleanLabel(text) {
  return (text || '').toString().replace(/_/g, ' ').trim()
}

const ChartIcon = ({ color = '#fff' }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" style={{ marginRight: 8, flex: 'none' }}>
    <polyline points="3 17 9 11 13 15 21 6" />
    <polyline points="14 6 21 6 21 13" />
  </svg>
)

// `report` is the raw JSON returned by POST /reports/generate for a
// "batch_wise_summary" report_template:
// { college, report_type, assessment_name, assessment_date, data: {...} }
const BatchWiseSummaryPoster = forwardRef(function BatchWiseSummaryPoster(
  { report },
  ref
) {
  const college = report?.college || 'COLLEGE'
  const d = report?.data || {}
  const totals = d.totals || {}
  const batchSummary = d.batch_summary || []
  const progressByBatch = d.progress_by_batch || []
  const posterHighlights = d.poster_highlights || {}

  const titleLine = cleanLabel(
    report?.report_type || report?.assessment_name || 'Assessment'
  )

  return (
    <div id="poster" className="poster-a" ref={ref}>
      <div className="deco-wave" aria-hidden="true">
        <svg viewBox="0 0 400 220" preserveAspectRatio="none">
          <path d="M60 0 C160 60 260 -20 400 40 L400 0 Z" fill="#4E17A6" opacity="0.9" />
          <path d="M120 30 C220 90 300 20 400 70 L400 0 L200 0 Z" fill="#3B6CF0" opacity="0.85" />
          <path d="M180 60 C260 110 330 70 400 100 L400 40 Z" fill="#22B8B0" opacity="0.85" />
        </svg>
      </div>

      <div className="header-a">
        <CollegeBadge college={college} />

        <div className="title-block">
          <div className="title-line-0">{college.toUpperCase()} {titleLine.toUpperCase()}</div>
          <div className="title-line-2">
            BATCH-WISE
            <br />
            SUMMARY REPORT
          </div>
          <div className="title-underline"></div>
          <div className="title-sub">Assessment performance snapshot</div>
        </div>

        <div className="brand-mini">
          <BrandLogo height={88} />
        </div>
      </div>

      <div className="pill-heading-wrap">
        <div className="pill-heading pill-with-icon">
          <ChartIcon />
          EXECUTIVE SUMMARY
        </div>
      </div>

      <ExecutiveSummary totals={totals} />

      <HighlightBadges posterHighlights={posterHighlights} />

      <div className="table-panel">
        <div className="table-panel-header">
          <ChartIcon />
          BATCH-WISE PERFORMANCE
        </div>
        <div className="table-panel-body">
          <BatchTable
            batchSummary={batchSummary}
            columns={BATCH_WISE_SUMMARY_COLS}
            progressByBatch={progressByBatch}
            colorizeBatch
          />
        </div>
      </div>

      <div className="pill-heading-wrap">
        <div className="pill-heading pill-with-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" style={{ marginRight: 8 }}>
            <circle cx="12" cy="12" r="9" />
            <line x1="12" y1="17" x2="12" y2="11" />
            <circle cx="12" cy="8" r="0.6" fill="#fff" />
          </svg>
          KEY INSIGHTS
        </div>
      </div>

      <KeyInsights posterHighlights={posterHighlights} />

      <footer className="footer-solid">
        <div className="footer-solid-left">
          <BrandLogo height={40} light />
        </div>
        <div className="footer-solid-divider"></div>
        <div className="footer-solid-right">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <span>
            Source: {college} Batch-Wise
            <br />
            Assessment Summary Report
          </span>
        </div>
      </footer>
    </div>
  )
})

export default BatchWiseSummaryPoster
