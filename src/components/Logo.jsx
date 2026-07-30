const Logo = ({ className = "", size = 36, decorative = false }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 64 64"
    focusable="false"
    {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": "Alperen Gökbak" })}
  >
    <path
      d="M32 8 L52 32 L32 56 L12 32 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeOpacity="0.4"
      strokeLinejoin="miter"
    />

    <path
      d="M32 8 L41 32 L32 56 L23 32 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinejoin="miter"
    />

    <path d="M12 32 H52" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
    <path d="M41 26 L45.5 32 L41 38 L36.5 32 Z" fill="var(--accent)" />
  </svg>
);

export default Logo;
