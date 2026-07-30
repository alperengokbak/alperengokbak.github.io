import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const STYLES_DIR = resolve(process.cwd(), "src/styles");

const stylesheets = () =>
  readdirSync(STYLES_DIR)
    .filter((file) => file.endsWith(".css"))
    .map((file) => [file, readFileSync(resolve(STYLES_DIR, file), "utf8")]);

/**
 * Tailwind palette utilities, e.g. `text-emerald-400`. Deliberately excludes
 * `-accent`, `-cat-*` and the semantic tokens, which are the sanctioned names.
 */
const PALETTE_CLASS =
  /\b(?:text|bg|border|from|via|to)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/g;

describe("the colour policy in theme.css", () => {
  it("is not undercut by hardcoded palette utilities in any stylesheet", () => {
    // theme.css states the rule: one accent, three category hues, everything else a
    // token. A raw `text-emerald-400` bypasses both themes at once — it cannot respond
    // to the light palette, and it encodes no meaning.
    const offenders = stylesheets().flatMap(([file, css]) =>
      (css.match(PALETTE_CLASS) ?? []).map((match) => `${file}: ${match}`)
    );

    expect(offenders).toEqual([]);
  });

  it("defines every semantic token in both themes", () => {
    const theme = readFileSync(resolve(STYLES_DIR, "theme.css"), "utf8");
    const [, dark = "", light = ""] = theme.split(/:root\[data-theme="(?:dark|light)"\]/);

    // A token defined only in dark silently falls back to the dark value on paper.
    for (const token of ["--accent-hover", "--status-ok", "--status-bad"]) {
      expect(theme).toContain(`${token}:`);
      expect(`${dark}${light}`).toContain(`${token}:`);
    }
  });
});
