import { DEFAULT_LOCALE, LOCALES } from "./locales.js";
import { TURKISH_ENABLED } from "../lib/featureFlags.js";

export const STORAGE_KEY = "locale";

/**
 * The single gate for every route into a locale: a stored preference, the browser's
 * language, and setLocale all pass through here. Disabling Turkish anywhere else would
 * leave one of those three paths open.
 */
export const isSupported = (code) => {
  if (code === "tr" && !TURKISH_ENABLED) return false;
  return Object.prototype.hasOwnProperty.call(LOCALES, code);
};

/** Stored choice, else the browser's language, else English. */
export function resolveInitialLocale() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && isSupported(stored)) return stored;
  } catch {
    // Storage unavailable; fall through to the browser preference.
  }

  const preferred = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of preferred ?? []) {
    const base = String(tag).toLowerCase().split("-")[0];
    if (isSupported(base)) return base;
  }
  return DEFAULT_LOCALE;
}
