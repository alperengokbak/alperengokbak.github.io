import { LIGHT_THEME_ENABLED } from "../lib/featureFlags.js";
import { useTheme } from "../hooks/useTheme.js";
import { useTranslation } from "../i18n/useTranslation.js";

export default function ThemeToggle({ className = "" }) {
  const { t } = useTranslation();
  const [theme, toggleTheme] = useTheme();
  const nextTheme = theme === "dark" ? "light" : "dark";
  const label = t("theme.switchTo", { theme: t(`theme.${nextTheme}`) });

  // Dark-only for now; the toggle would be the only way to reach an unshipped theme.
  if (!LIGHT_THEME_ENABLED) return null;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={className ? `theme-toggle ${className}` : "theme-toggle"}
      aria-label={label}
      title={label}
    >
      <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
    </button>
  );
}
