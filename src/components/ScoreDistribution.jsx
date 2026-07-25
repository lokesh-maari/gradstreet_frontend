const BUCKET_ORDER = [
  { key: '>=80%', color: 'var(--green)' },
  { key: '60-79%', color: 'var(--blue)' },
  { key: '40-59%', color: 'var(--orange)' },
  { key: '<40%', color: 'var(--red)' },
]

export default function ScoreDistribution({ scoreDist }) {
  const bucketVals = BUCKET_ORDER.filter(
    (b) => scoreDist && scoreDist[b.key] !== undefined
  )
  if (!bucketVals.length) return null

  const maxVal = Math.max(...bucketVals.map((b) => scoreDist[b.key])) || 1

  return (
    <div className="panel" id="scoreDistPanel">
      <div className="bars-title">SCORE DISTRIBUTION</div>
      <div id="scoreDistBars">
        {bucketVals.map((b) => {
          const val = scoreDist[b.key]
          const widthPct = (val / maxVal) * 100
          return (
            <div className="bar-row" key={b.key}>
              <div className="bar-label">{b.key}</div>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{ width: `${widthPct}%`, background: b.color }}
                />
              </div>
              <div className="bar-value" style={{ color: b.color }}>
                {val}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
