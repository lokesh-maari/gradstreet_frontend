// Colour thresholds used to tint Attempt % / Avg % / progress bars, matching
// the original GradStreet report's green / blue / orange / red scheme.
export function bandColor(pct) {
  if (pct === null || pct === undefined || Number.isNaN(pct)) return '#333';
  if (pct >= 80) return 'var(--green)';
  if (pct >= 60) return 'var(--blue)';
  if (pct >= 40) return 'var(--orange)';
  return 'var(--red)';
}

export function fmtPct(v) {
  if (v === null || v === undefined || Number.isNaN(v)) return '-';
  // Accept either 0-1 fractions or already-percent numbers
  const n = v <= 1 ? v * 100 : v;
  return n.toFixed(1) + '%';
}

export function toPctNumber(v) {
  if (v === null || v === undefined || Number.isNaN(v)) return 0;
  return v <= 1 ? v * 100 : v;
}

// Plain integer/number formatting with a safe fallback dash -- used for
// KPI cards / highlight cards where a raw count (not a percentage) is shown.
export function fmtNum(v) {
  if (v === null || v === undefined || Number.isNaN(v)) return '-';
  if (typeof v === 'number' && !Number.isInteger(v)) {
    return v.toFixed(1);
  }
  return String(v);
}

// Looks up a batch's attempt_pct from the progress_by_batch array by name
// (case/whitespace tolerant), returning a 0-100 number or null if not found.
export function findBatchProgress(progressByBatch, batchName) {
  if (!progressByBatch || !batchName) return null;
  const target = String(batchName).trim().toLowerCase();
  const match = progressByBatch.find(
    (p) => String(p.batch).trim().toLowerCase() === target
  );
  if (!match) return null;
  return toPctNumber(match.attempt_pct);
}
