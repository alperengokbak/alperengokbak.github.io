import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const STYLES_DIR = resolve(process.cwd(), "src/styles");

const stylesheets = () =>
  readdirSync(STYLES_DIR)
    .filter((file) => file.endsWith(".css"))
    .map((file) => [file, readFileSync(resolve(STYLES_DIR, file), "utf8")]);

const PALETTE_CLASS =
  /\b(?:text|bg|border|from|via|to)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/g;

describe("the retired navy", () => {
  it("survives nowhere in the assets, markup or Tailwind config", () => {
    const NAVY = /#(?:0f172a|1e293b|050816)\b/i;
    const roots = ["src", "public"];
    const offenders = [];

    const walk = (dir) => {
      for (const entry of readdirSync(resolve(process.cwd(), dir), { withFileTypes: true })) {
        const path = `${dir}/${entry.name}`;
        if (entry.isDirectory()) {
          if (entry.name !== "node_modules") walk(path);
        } else if (/\.(svg|css|jsx?|html)$/.test(entry.name) && path !== "src/styles/theme.css") {
          const text = readFileSync(resolve(process.cwd(), path), "utf8");

          if (NAVY.test(text) && !path.endsWith("theme.test.js")) offenders.push(path);
        }
      }
    };

    roots.forEach(walk);
    for (const file of ["tailwind.config.js", "index.html"]) {
      if (NAVY.test(readFileSync(resolve(process.cwd(), file), "utf8"))) offenders.push(file);
    }

    expect(offenders).toEqual([]);
  });
});

describe("the colour policy in theme.css", () => {
  it("is not undercut by hardcoded palette utilities in any stylesheet", () => {
    const offenders = stylesheets().flatMap(([file, css]) =>
      (css.match(PALETTE_CLASS) ?? []).map((match) => `${file}: ${match}`)
    );

    expect(offenders).toEqual([]);
  });

  it("defines every semantic token in both themes", () => {
    const theme = readFileSync(resolve(STYLES_DIR, "theme.css"), "utf8");
    const [, dark = "", light = ""] = theme.split(/:root\[data-theme="(?:dark|light)"\]/);

    for (const token of ["--accent-hover", "--status-ok", "--status-bad"]) {
      expect(theme).toContain(`${token}:`);
      expect(`${dark}${light}`).toContain(`${token}:`);
    }
  });
});
