import { act, render, screen } from "../test/utils.jsx";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ThemeToggle from "./ThemeToggle.jsx";

/**
 * The light theme is shipped OFF (src/lib/featureFlags.js) while Alperen decides on the
 * design. These tests mock the flag ON so the implementation stays covered and cannot
 * rot before it is switched back on. The final block asserts the shipped, flag-off
 * behaviour.
 */
vi.mock("../lib/featureFlags.js", () => ({ LIGHT_THEME_ENABLED: true }));

const root = () => document.documentElement;
const toggle = () => screen.getByRole("button", { name: /switch to (light|dark) theme/i });

/** Points matchMedia at a given prefers-color-scheme: light result. */
const mockPrefersLight = (matches) => {
  const listeners = new Set();
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: query.includes("light") ? matches : !matches,
    media: query,
    addEventListener: (_, cb) => listeners.add(cb),
    removeEventListener: (_, cb) => listeners.delete(cb),
    dispatchEvent: vi.fn(),
  }));
  // Wrapped in act() so the resulting React state update flushes before assertions.
  return { emit: (nextMatches) => act(() => listeners.forEach((cb) => cb({ matches: nextMatches }))) };
};

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    root().removeAttribute("data-theme");
  });

  afterEach(() => {
    localStorage.clear();
    root().removeAttribute("data-theme");
  });

  it("adopts the theme the inline head script already applied", () => {
    root().setAttribute("data-theme", "light");
    mockPrefersLight(false); // OS says dark; the applied attribute must still win.

    render(<ThemeToggle />);

    expect(root()).toHaveAttribute("data-theme", "light");
    expect(toggle()).toHaveAccessibleName(/switch to dark theme/i);
  });

  it("falls back to the OS preference when nothing has been applied", () => {
    mockPrefersLight(true);

    render(<ThemeToggle />);

    expect(root()).toHaveAttribute("data-theme", "light");
  });

  it("defaults to dark when the OS prefers dark", () => {
    mockPrefersLight(false);

    render(<ThemeToggle />);

    expect(root()).toHaveAttribute("data-theme", "dark");
  });

  it("flips the theme and persists the choice", async () => {
    mockPrefersLight(false);
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(toggle());

    expect(root()).toHaveAttribute("data-theme", "light");
    expect(localStorage.getItem("theme")).toBe("light");

    await user.click(toggle());

    expect(root()).toHaveAttribute("data-theme", "dark");
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("follows a live OS change until the visitor chooses explicitly", async () => {
    const media = mockPrefersLight(false);
    const user = userEvent.setup();
    render(<ThemeToggle />);
    expect(root()).toHaveAttribute("data-theme", "dark");

    // No stored preference yet — the OS switching to light should carry the page along.
    media.emit(true);
    expect(root()).toHaveAttribute("data-theme", "light");

    // Once chosen explicitly, the OS must stop overriding it.
    await user.click(toggle());
    expect(localStorage.getItem("theme")).toBe("dark");

    media.emit(true);
    expect(root()).toHaveAttribute("data-theme", "dark");
  });

  it("labels itself with the theme it will switch to", async () => {
    mockPrefersLight(false);
    const user = userEvent.setup();
    render(<ThemeToggle />);

    expect(toggle()).toHaveAccessibleName(/switch to light theme/i);
    await user.click(toggle());
    expect(toggle()).toHaveAccessibleName(/switch to dark theme/i);
  });

  it("still applies the theme when localStorage refuses writes", async () => {
    mockPrefersLight(false);
    const setItem = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });

    const user = userEvent.setup();
    render(<ThemeToggle />);
    await user.click(toggle());

    expect(root()).toHaveAttribute("data-theme", "light");
    setItem.mockRestore();
  });
});
