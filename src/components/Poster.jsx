import { forwardRef } from 'react'
import BatchWiseSummaryPoster from './BatchWiseSummaryPoster'
import AssessmentSummaryPoster from './AssessmentSummaryPoster'

// `report` is the raw JSON returned by POST /reports/generate:
// { college, report_type, report_template, assessment_name,
//   assessment_date, data: {...} }
//
// report_template tells us which poster design to render:
//   "batch_wise_summary" -> multi-batch "Assessment N Batch-Wise
//                            Summary Report" poster (6 KPIs, Key
//                            Insights, badge cards)
//   "assessment_summary" -> "{College} University Assessment-N
//                            Report" poster (4 KPIs, Progress
//                            column, Motivation Boost)
//   anything else (e.g. "form_data" for a Google Form / feedback
//                  export) -> there's no poster template for this
//                  shape of data, so we say so instead of guessing.
const Poster = forwardRef(function Poster({ report }, ref) {
  const template = report?.report_template

  if (template === 'batch_wise_summary') {
    return <BatchWiseSummaryPoster ref={ref} report={report} />
  }

  if (template === 'assessment_summary') {
    return <AssessmentSummaryPoster ref={ref} report={report} />
  }

  return (
    <div id="poster" ref={ref} className="no-poster-panel">
      <h2>No poster available for this file</h2>
      <p>
        This workbook was recognized as{' '}
        <strong>{report?.report_type || template || 'an unsupported format'}</strong>,
        which isn&apos;t one of the two report poster designs (Batch-Wise
        Summary Report or Assessment-N Report). Its data was still parsed
        successfully -- check the API response for the raw fields.
      </p>
    </div>
  )
})

export default Poster
