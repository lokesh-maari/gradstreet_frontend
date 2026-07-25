const HL_COLORS = ['var(--green)', 'var(--blue)', 'var(--orange)']
const HL_ORDER = [
  'attempt_rate_highlight',
  'top_batch_highlight',
  'low_scorers_highlight',
]

export default function KeyHighlights({ highlights }) {
  const items = HL_ORDER.map((key, i) => ({ h: highlights?.[key], i })).filter(
    ({ h }) => h && h.label
  )

  return (
    <div className="box">
      <div className="pill-heading" style={{ margin: '0 0 18px' }}>
        KEY HIGHLIGHTS
      </div>
      <div id="highlightsList">
        {items.map(({ h, i }) => (
          <div className="highlight-item" key={i}>
            <div className="highlight-num" style={{ background: HL_COLORS[i] }}>
              {i + 1}
            </div>
            <div className="highlight-text">
              <div className="hl-label" style={{ color: HL_COLORS[i] }}>
                {h.label}
              </div>
              <div className="hl-detail">{h.detail || ''}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
