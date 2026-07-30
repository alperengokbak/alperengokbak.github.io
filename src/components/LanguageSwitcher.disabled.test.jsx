import { afterEach, describe, expect, it } from "vitest";
import { render, screen } from "../test/utils.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import { TURKISH_ENABLED } from "../lib/featureFlags.js";
import { isSupported, resolveInitialLocale, STORAGE_KEY } from "../i18n/resolveLocale.js";

describe("Turkish (disabled)", () => {
  afterEach(() => localStorage.clear());

  it("has Turkish switched off", () => {
    expect(TURKISH_ENABLED).toBe(false);
  });

  it("renders no language button", () => {
    const { container } = render(<LanguageSwitcher />);
    expect(container).toBeEmptyDOMElement();
    expect(screen.queryByRole("button", { name: /language|dil/i })).not.toBeInTheDocument();
  });

  it("treats Turkish as unsupported", () => {
    expect(isSupported("tr")).toBe(false);
    expect(isSupported("en")).toBe(true);
  });

  it("does not strand a visitor who already chose Turkish", () => {
    localStorage.setItem(STORAGE_KEY, "tr");
    expect(resolveInitialLocale()).toBe("en");
  });
});
