import logo from '../assets/gradstreet_logo.png'

// The GradStreet logo asset is a single wide image containing the icon,
// the "GRADSTREET" wordmark, and the tagline all together -- so it's
// rendered as one <img>, sized by height with the width following the
// image's natural aspect ratio (no separate text elements needed).
//
// `light`: renders a clean white version of the logo (via CSS filter)
// for use on dark/purple backgrounds, since we only have one full-color
// asset and it isn't legible as-is on a dark background.
export default function BrandLogo({ height = 46, className = '', light = false }) {
  return (
    <img
      src={logo}
      alt="GradStreet - Your Pathway to Career Success"
      className={`brand-logo-img ${light ? 'brand-logo-img--light' : ''} ${className}`}
      style={{ height, width: 'auto' }}
    />
  )
}
