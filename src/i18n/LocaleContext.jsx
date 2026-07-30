import { useCallback, useEffect, useMemo, useState } from "react";
import { DEFAULT_LOCALE, LOCALES, translations } from "./locales.js";
import { LocaleContext } from "./context.js";
import { isSupported, resolveInitialLocale, STORAGE_KEY } from "./resolveLocale.js";

function lookup(locale, path) {
  const read = (dict) => path.split(".").reduce((acc, part) => acc?.[part], dict);
  return read(translations[locale]) ?? read(translations[DEFAULT_LOCALE]) ?? path;
}

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(resolveInitialLocale);

  useEffect(() => {
    document.documentElement.lang = LOCALES[locale]?.htmlLang ?? DEFAULT_LOCALE;
  }, [locale]);

  const setLocale = useCallback((next) => {
    if (!isSupported(next)) return;
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
    }
  }, []);

  const value = useMemo(() => {
    const t = (path, vars) => {
      const raw = lookup(locale, path);
      if (typeof raw !== "string" || !vars) return raw;
      return raw.replace(/\{(\w+)\}/g, (match, name) =>
        Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : match
      );
    };
    return { locale, setLocale, t };
  }, [locale, setLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
