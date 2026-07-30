/**
 * The "AG" mark, inlined rather than loaded from /monogram.svg.
 *
 * An SVG referenced through `<img src>` renders in secure static mode: it cannot load
 * external resources, and it has no access to the host document's fonts. The file
 * version asks for Space Grotesk and silently falls back to system-ui, so the mark
 * rendered as SF Pro on macOS, Segoe UI on Windows and something else again on Linux.
 *
 * Inlined into the DOM, the <text> resolves against the page's own @font-face rules and
 * the letterforms match the rest of the site. `currentColor` lets the mark follow the
 * theme instead of baking in a fill.
 *
 * public/monogram.svg still exists and is still the favicon and apple-touch-icon —
 * those must be real files. It carries the same warm charcoal, but its lettering is
 * still subject to the fallback described above. At 16-32px that is not perceptible.
 */
const Monogram = ({ className = "", size = 36, decorative = false }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 64 64"
    focusable="false"
    // Inside an already-labelled link the mark is redundant, so callers can silence
    // it rather than making a screen reader read the brand twice.
    {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": "AG monogram" })}
  >
    <rect width="64" height="64" rx="14" fill="var(--ground-sunken)" />
    <rect
      width="64"
      height="64"
      rx="14"
      fill="none"
      stroke="var(--accent)"
      strokeWidth="1.5"
      strokeOpacity="0.6"
    />
    <text
      x="32"
      y="42"
      textAnchor="middle"
      fontFamily="'Space Grotesk', system-ui, sans-serif"
      fontSize="26"
      fontWeight="700"
      letterSpacing="-0.5"
      fill="currentColor"
    >
      AG
    </text>
    <rect x="20" y="48" width="24" height="2" rx="1" fill="var(--accent)" />
  </svg>
);

export default Monogram;
