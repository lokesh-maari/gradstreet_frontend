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
