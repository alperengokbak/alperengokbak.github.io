import { describe, expect, it } from "vitest";
import { render, screen } from "../test/utils.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import { LIGHT_THEME_ENABLED } from "../lib/featureFlags.js";

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

    const applied = document.documentElement.getAttribute("data-theme");
    expect(applied === null || applied === "dark").toBe(true);
  });
});
