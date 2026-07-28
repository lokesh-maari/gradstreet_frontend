import { forwardRef } from 'react'
import BatchTable, { ASSESSMENT_SUMMARY_COLS } from './BatchTable'
import KeyHighlights from './KeyHighlights'
import BrandLogo from './BrandLogo'
import { fmtPct } from '../utils/format'

// `report` is the raw JSON returned by POST /reports/generate for an
// "assessment_summary" report_template:
// { college, report_type, assessment_name, assessment_date, data: {...} }
const AssessmentSummaryPoster = forwardRef(function AssessmentSummaryPoster(
  { report },
  ref
) {
  const college = report?.college || 'COLLEGE'
  const d = report?.data || {}
  const totals = d.totals || {}
  const batchSummary = d.batch_summary || []
  const highlights = d.key_highlights || {}
  const progress = d.progress_by_batch || []

  const reportTitle = (
    report?.report_type || report?.assessment_name || 'Assessment'
  )
    .toString()
    .replace(/_/g, ' ')
    .trim()

  return (
    <div id="poster" ref={ref}>
      <div className="deco-triangle"></div>
      <div className="deco-dots">
        {Array.from({ length: 15 }).map((_, i) => (
          <span key={i}></span>
        ))}
      </div>

      <header className="brand">
        <BrandLogo height={92} />
      </header>

      <h1 className="college-title">{college.toUpperCase()} UNIVERSITY</h1>

      <div className="section-heading">
        <span className="line"></span>
        <h2>ASSESSMENT PERFORMANCE SUMMARY</h2>
        <span className="line"></span>
      </div>

      <div className="assessment-banner">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <span>{reportTitle.toUpperCase()} REPORT</span>
      </div>

      <div className="kpi-card">
        <div className="kpi">
          <div className="kpi-circle" style={{ background: '#5116AE' }}>S</div>
          <div className="kpi-value">{totals.total_students ?? '-'}</div>
          <div className="kpi-label">Total Students</div>
        </div>
        <div className="kpi">
          <div className="kpi-circle" style={{ background: '#1657E0' }}>A</div>
          <div className="kpi-value">{totals.attempted ?? '-'}</div>
          <div className="kpi-label">Attempted</div>
        </div>
        <div className="kpi">
          <div className="kpi-circle" style={{ background: '#08A66C' }}>%</div>
          <div className="kpi-value tag-green">{fmtPct(totals.attempt_pct)}</div>
          <div className="kpi-label">Attempt Rate</div>
        </div>
        <div className="kpi">
          <div className="kpi-circle" style={{ background: '#FE6B02' }}>Q</div>
          <div className="kpi-value tag-orange">{totals.qualified ?? '-'}</div>
          <div className="kpi-label">Qualified</div>
        </div>
      </div>

      <div className="pill-heading-wrap">
        <div className="pill-heading">BATCH-WISE PERFORMANCE</div>
      </div>
      <div className="panel" id="batchTablePanel">
        <div id="batchTableWrap">
          <BatchTable
            batchSummary={batchSummary}
            columns={ASSESSMENT_SUMMARY_COLS}
            progressByBatch={progress}
          />
        </div>
      </div>

      <div className="bottom-boxes">
        <KeyHighlights highlights={highlights} />
        <div className="box">
          <div className="pill-heading" style={{ margin: '0 0 18px' }}>
            MOTIVATION BOOST
          </div>
          <div className="motivation-text">
            Every assessment is a step towards placement readiness.
          </div>
          <div className="motivation-cta">
            KEEP PRACTICING.
            <br />
            KEEP IMPROVING.
          </div>
        </div>
      </div>

      <footer className="footer-banner">
        <div className="star-circle">STAR</div>
        <div className="footer-left">
          STAY FOCUSED.
          <br />
          STAY CONSISTENT.
          <br />
          <span className="fy">SUCCESS IS IN PROGRESS!</span>
        </div>
        <div className="footer-right">
          <div>Let us improve every batch</div>
          <div className="fy">and achieve better scores!</div>
          <div>{reportTitle} Report</div>
          <div className="fdate">{report?.assessment_date || ''}</div>
        </div>
      </footer>
    </div>
  )
})

export default AssessmentSummaryPoster
