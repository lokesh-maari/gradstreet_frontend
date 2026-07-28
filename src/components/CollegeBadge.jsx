export default function CollegeBadge({ college }) {
  const label = (college || 'COLLEGE').toString().toUpperCase()

  return (
    <div className="college-badge">
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8">
        <path d="M3 21h18" />
        <path d="M5 21V9l7-5 7 5v12" />
        <path d="M9 21v-6h6v6" />
        <path d="M12 4v3" />
        <path d="M12 3.2 14 1.6" />
      </svg>
      <div className="college-badge-name">{label}</div>
      <div className="college-badge-sub">COLLEGE</div>
    </div>
  )
}
