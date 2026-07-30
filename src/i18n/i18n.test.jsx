import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LocaleProvider } from "./LocaleContext.jsx";
import { useTranslation } from "./useTranslation.js";
import { LOCALES, translations } from "./locales.js";
import LanguageSwitcher from "../components/LanguageSwitcher.jsx";

/**
 * Turkish is shipped OFF (src/lib/featureFlags.js) pending Alperen's review of the
 * translations. These tests mock the flag ON so the translation machinery stays covered
 * and cannot rot before it is switched back on. The shipped, flag-off behaviour is
 * asserted in components/LanguageSwitcher.disabled.test.jsx.
 */
vi.mock("../lib/featureFlags.js", () => ({ LIGHT_THEME_ENABLED: false, TURKISH_ENABLED: true }));

function Probe({ path, vars }) {
  const { t, locale } = useTranslation();
  return (
    <>
      <span data-testid="locale">{locale}</span>
      <span data-testid="value">{t(path, vars)}</span>
    </>
  );
}

const withProvider = (ui) => render(<LocaleProvider>{ui}</LocaleProvider>);

const mockLanguages = (languages) => {
  Object.defineProperty(navigator, "languages", { configurable: true, value: languages });
  Object.defineProperty(navigator, "language", { configurable: true, value: languages[0] });
};

describe("locale files", () => {
  const keyPaths = (obj, prefix = "") =>
    Object.entries(obj).flatMap(([k, v]) =>
      typeof v === "object" && v !== null ? keyPaths(v, `${prefix}${k}.`) : [`${prefix}${k}`]
    );

  it("defines every English key in every other locale", () => {
    const english = keyPaths(translations.en);
    for (const locale of ["tr"]) {
      const missing = english.filter((k) => !keyPaths(translations[locale]).includes(k));
      expect(missing, `${locale} is missing: ${missing.join(", ")}`).toEqual([]);
    }
  });

  it("adds no keys the English base does not have", () => {
    const english = keyPaths(translations.en);
    for (const locale of ["tr"]) {
      const extra = keyPaths(translations[locale]).filter((k) => !english.includes(k));
      expect(extra, `${locale} has stray keys: ${extra.join(", ")}`).toEqual([]);
    }
  });

  it("keeps interpolation placeholders intact across locales", () => {
    for (const locale of Object.keys(LOCALES)) {
      expect(translations[locale].projects.openPreview).toContain("{title}");
      expect(translations[locale].theme.switchTo).toContain("{theme}");
    }
  });
});

describe("LocaleProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    mockLanguages(["en-US"]);
  });

  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("resolves a dotted key path", () => {
    withProvider(<Probe path="nav.projects" />);
    expect(screen.getByTestId("value")).toHaveTextContent("Projects");
  });

  it("interpolates named variables", () => {
    withProvider(<Probe path="projects.openPreview" vars={{ title: "Booking Hotel" }} />);
    expect(screen.getByTestId("value")).toHaveTextContent("Open a larger preview of Booking Hotel");
  });

  it("returns the key itself for an unknown path rather than crashing", () => {
    withProvider(<Probe path="nope.not.here" />);
    expect(screen.getByTestId("value")).toHaveTextContent("nope.not.here");
  });

  it("picks up a supported browser language", () => {
    mockLanguages(["tr-TR", "en-US"]);
    withProvider(<Probe path="nav.projects" />);
    expect(screen.getByTestId("locale")).toHaveTextContent("tr");
    expect(screen.getByTestId("value")).toHaveTextContent("Projeler");
  });

  it("falls back to English for an unsupported browser language", () => {
    mockLanguages(["ja-JP"]);
    withProvider(<Probe path="nav.projects" />);
    expect(screen.getByTestId("locale")).toHaveTextContent("en");
  });

  it("prefers a stored choice over the browser language", () => {
    localStorage.setItem("locale", "en");
    mockLanguages(["tr-TR"]);
    withProvider(<Probe path="nav.projects" />);
    expect(screen.getByTestId("locale")).toHaveTextContent("en");
    expect(screen.getByTestId("value")).toHaveTextContent("Projects");
  });

  it("sets the document language so screen readers use the right voice", () => {
    mockLanguages(["tr-TR"]);
    withProvider(<Probe path="nav.projects" />);
    expect(document.documentElement.lang).toBe("tr");
  });
});

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    localStorage.clear();
    mockLanguages(["en-US"]);
  });

  afterEach(() => localStorage.clear());

  it("offers the language you are not currently using", () => {
    withProvider(<LanguageSwitcher />);
    // Starting locale is en, so the toggle advertises Türkçe.
    const toggle = screen.getByRole("button", { name: /Türkçe/ });
    expect(toggle).toHaveTextContent("TR");
    expect(toggle).toHaveAttribute("lang", "tr");
  });

  it("switches locale, persists it, and updates <html lang>", async () => {
    const user = userEvent.setup();
    withProvider(
      <>
        <LanguageSwitcher />
        <Probe path="nav.projects" />
      </>
    );

    await user.click(screen.getByRole("button", { name: /Türkçe/ }));

    expect(screen.getByTestId("value")).toHaveTextContent("Projeler");
    expect(localStorage.getItem("locale")).toBe("tr");
    expect(document.documentElement.lang).toBe("tr");

    // Having switched, the toggle must now offer the way back.
    expect(screen.getByRole("button", { name: /English/ })).toHaveTextContent("EN");
  });

  it("tags the toggle with the language it names, for correct pronunciation", () => {
    withProvider(<LanguageSwitcher />);
    expect(screen.getByRole("button", { name: /Türkçe/ })).toHaveAttribute("lang", "tr");
  });
});
