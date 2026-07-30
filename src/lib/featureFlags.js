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

/**
 * TURKISH_ENABLED — off pending Alperen's review of the translations.
 *
 * Nothing is deleted: locales.js keeps the full `tr` dictionary and i18n.test.jsx mocks
 * this flag on, so the translation machinery stays covered and cannot rot while it is
 * off. The site ships English-only and the language button does not render.
 *
 * Turning the button off is not sufficient on its own. `resolveInitialLocale` reads a
 * stored preference and the browser's language, so a visitor who previously chose
 * Turkish — or who simply has a Turkish browser — would land in a language with no way
 * out. The flag is therefore enforced in `isSupported`, which both locale resolution
 * and `setLocale` route through.
 *
 * To bring it back:
 *   1. Set this to true.
 *   2. Delete src/components/LanguageSwitcher.disabled.test.jsx.
 */
export const TURKISH_ENABLED = false;
