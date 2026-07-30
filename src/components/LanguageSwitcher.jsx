import { LOCALES } from "../i18n/locales.js";
import { useTranslation } from "../i18n/useTranslation.js";

/**
 * With two locales a segmented EN|TR control costs more nav width than it earns, so
 * this renders a single button showing the language you would switch *to*. If a third
 * locale is ever added, revisit — a toggle stops making sense past two.
 */
export default function LanguageSwitcher({ className = "" }) {
  const { locale, setLocale, t } = useTranslation();

  const codes = Object.keys(LOCALES);
  const nextCode = codes[(codes.indexOf(locale) + 1) % codes.length];
  const next = LOCALES[nextCode];

  return (
    <button
      type="button"
      lang={next.htmlLang}
      onClick={() => setLocale(nextCode)}
      className={className ? `language-toggle ${className}` : "language-toggle"}
      aria-label={`${t("nav.language")}: ${next.label}`}
      title={next.label}
    >
      {next.short}
    </button>
  );
}
