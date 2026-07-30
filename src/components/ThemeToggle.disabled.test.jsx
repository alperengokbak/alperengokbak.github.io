import { describe, expect, it } from "vitest";
import { render, screen } from "../test/utils.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import { LIGHT_THEME_ENABLED } from "../lib/featureFlags.js";

/**
 * Guards the shipped configuration: the light theme is intentionally off, so the toggle
 * must not be reachable. Uses the real flag, unlike ThemeToggle.test.jsx which mocks it
 * on to keep the implementation covered.
 *
 * When the light theme is re-enabled, this whole file should be deleted.
 */
describe("ThemeToggle (light theme disabled)", () => {
  it("has the light theme switched off", () => {
    expect(LIGHT_THEME_ENABLED).toBe(false);
  });

  it("renders no toggle, so visitors cannot reach an unshipped theme", () => {
    const { container } = render(<ThemeToggle />);
    expect(container).toBeEmptyDOMElement();
    expect(screen.queryByRole("button", { name: /theme/i })).not.toBeInTheDocument();
  });

  it("leaves the document on the dark palette", () => {
    render(<ThemeToggle />);
    // :root carries the dark palette, so "dark" (or no attribute) is correct here.
    const applied = document.documentElement.getAttribute("data-theme");
    expect(applied === null || applied === "dark").toBe(true);
  });
});
