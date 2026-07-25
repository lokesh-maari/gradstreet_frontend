import { toPctNumber, bandColor } from '../utils/format'

export default function ProgressBars({ progress }) {
  if (!progress || !progress.length) return null

  return (
    <div className="panel" id="progressPanel">
      <div className="bars-title">ATTEMPT PROGRESS BY BATCH</div>
      <div id="progressBars">
        {progress.map((p, i) => {
          const pctNum = toPctNumber(p.attempt_pct)
          return (
            <div className="bar-row" key={i}>
              <div className="bar-label">{p.batch}</div>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{ width: `${pctNum}%`, background: bandColor(pctNum) }}
                />
              </div>
              <div className="bar-value" style={{ color: bandColor(pctNum) }}>
                {pctNum.toFixed(1)}%
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
