import { useContext } from "react";
import { LocaleContext } from "./context.js";

/** Returns { locale, setLocale, t }. Must be used inside a LocaleProvider. */
export function useTranslation() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LocaleProvider");
  }
  return context;
}
