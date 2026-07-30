/**
 * Feature flags.
 *
 * LIGHT_THEME_ENABLED — off by design, not unfinished.
 *
 * The light ("warm paper") palette is fully built and every token passes WCAG AA, but
 * Alperen wants to sit with the design before showing it to visitors. Turning it off is
 * a product decision, so it lives behind a flag rather than being deleted: the palette
 * in styles/theme.css, the useTheme hook, and the toggle component all stay intact.
 *
 * To bring it back:
 *   1. Set this to true.
 *   2. Restore the no-flash script in index.html (see the comment there) and recompute
 *      its sha256 for the CSP, otherwise the page flashes dark before switching.
 *
 * With it off, the site is dark-only: :root in styles/theme.css already carries the
 * dark palette, so no data-theme attribute is required.
 */
export const LIGHT_THEME_ENABLED = false;
