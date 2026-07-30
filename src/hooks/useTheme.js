import { useCallback, useEffect, useState } from "react";
import { LIGHT_THEME_ENABLED } from "../lib/featureFlags.js";

export const STORAGE_KEY = "theme";

/** Reads the theme the inline <head> script already resolved and applied. */
function currentTheme() {
  if (!LIGHT_THEME_ENABLED) return "dark";
  const applied = document.documentElement.getAttribute("data-theme");
  if (applied === "light" || applied === "dark") return applied;
  return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

/**
 * Returns [theme, toggleTheme].
 *
 * The initial value is whatever the inline script in index.html already put on
 * <html data-theme>, so React never re-decides it and there is no flash.
 * An explicit choice is persisted; until one is made, the OS preference is followed
 * live so the page tracks a system light/dark switch.
 */
export function useTheme() {
  const [theme, setTheme] = useState(currentTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!LIGHT_THEME_ENABLED) return;
    const media = window.matchMedia?.("(prefers-color-scheme: light)");
    if (!media) return;

    const onChange = (event) => {
      // An explicit choice wins over the OS.
      if (localStorage.getItem(STORAGE_KEY)) return;
      setTheme(event.matches ? "light" : "dark");
    };

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    if (!LIGHT_THEME_ENABLED) return;
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Private browsing can refuse writes; the theme still applies for this session.
      }
      return next;
    });
  }, []);

  return [theme, toggleTheme];
}
