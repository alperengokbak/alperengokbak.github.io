import { LOCALES } from "../i18n/locales.js";
import { TURKISH_ENABLED } from "../lib/featureFlags.js";
import { useTranslation } from "../i18n/useTranslation.js";

export default function LanguageSwitcher({ className = "" }) {
  const { locale, setLocale, t } = useTranslation();

  if (!TURKISH_ENABLED) return null;

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
