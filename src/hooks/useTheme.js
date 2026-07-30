import { useCallback, useEffect, useState } from "react";
import { LIGHT_THEME_ENABLED } from "../lib/featureFlags.js";

export const STORAGE_KEY = "theme";

function currentTheme() {
  if (!LIGHT_THEME_ENABLED) return "dark";
  const applied = document.documentElement.getAttribute("data-theme");
  if (applied === "light" || applied === "dark") return applied;
  return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

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
      }
      return next;
    });
  }, []);

  return [theme, toggleTheme];
}
