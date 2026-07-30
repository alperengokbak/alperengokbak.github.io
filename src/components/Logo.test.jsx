import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { render } from "../test/utils.jsx";
import Logo from "./Logo.jsx";

const fromRoot = (path) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("Logo", () => {
  it("draws the mark without any text element", () => {
    const { container } = render(<Logo />);
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(container.querySelector("text")).toBeNull();
  });

  it("inherits its neutral strokes from the surrounding colour", () => {
    const { container } = render(<Logo />);
    expect(container.innerHTML).toContain("currentColor");
  });

  it("can be silenced inside an already-labelled link", () => {
    const { container } = render(<Logo decorative />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });
});

describe("the favicon", () => {
  it("exists at the path index.html asks for", () => {
    const href = fromRoot("index.html").match(/rel="icon"[^>]*href="([^"]+)"/)?.[1];
    expect(href).toBeDefined();
    expect(existsSync(resolve(process.cwd(), "public", href.replace(/^\//, "")))).toBe(true);
  });

  it("carries no text element either", () => {
    expect(fromRoot("public/favicon.svg")).not.toMatch(/<text[\s>]/);
  });

  it("paints its own background, so it survives a light or dark browser tab", () => {
    const svg = fromRoot("public/favicon.svg");
    expect(svg).toMatch(/<rect[^>]*fill="#/);
  });
});
