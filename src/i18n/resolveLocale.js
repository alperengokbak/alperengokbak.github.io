import { DEFAULT_LOCALE, LOCALES } from "./locales.js";

export const STORAGE_KEY = "locale";

export const isSupported = (code) => Object.prototype.hasOwnProperty.call(LOCALES, code);

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
