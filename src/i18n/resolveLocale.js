import { DEFAULT_LOCALE, LOCALES } from "./locales.js";
import { TURKISH_ENABLED } from "../lib/featureFlags.js";

export const STORAGE_KEY = "locale";

export const isSupported = (code) => {
  if (code === "tr" && !TURKISH_ENABLED) return false;
  return Object.prototype.hasOwnProperty.call(LOCALES, code);
};

export function resolveInitialLocale() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && isSupported(stored)) return stored;
  } catch {
  }

  const preferred = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of preferred ?? []) {
    const base = String(tag).toLowerCase().split("-")[0];
    if (isSupported(base)) return base;
  }
  return DEFAULT_LOCALE;
}
