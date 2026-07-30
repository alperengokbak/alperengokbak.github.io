import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { CONTACT_EMAIL, buildMailto } from "./contact.js";

/** Vite rewrites `import.meta.url` to an http URL under test, so resolve from the root. */
const fromRoot = (path) => readFileSync(resolve(process.cwd(), path), "utf8");

/** Matches anything a naive address harvester would recognise as an email. */
const EMAIL_PATTERN = /[\w.+-]+@[\w-]+\.[\w.-]+/;

describe("CONTACT_EMAIL", () => {
  it("assembles the real address", () => {
    expect(CONTACT_EMAIL).toBe("gokbakalperen@gmail.com");
  });

  it("is not written as a literal in the source", () => {
    // The whole point of ADDRESS_PARTS is that the address never exists as one string
    // in anything we ship. Inlining it back for readability would silently undo that,
    // so the source itself is asserted on rather than the build output.
    expect(fromRoot("src/lib/contact.js")).not.toMatch(EMAIL_PATTERN);
  });
});

describe("the JSON-LD block in index.html", () => {
  it("carries no email address", () => {
    // Structured data is the first thing harvesters read, and it is served as plain
    // HTML that no amount of runtime assembly can protect.
    const jsonLd = fromRoot("index.html").match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];

    expect(jsonLd).toBeDefined();
    expect(jsonLd).not.toMatch(EMAIL_PATTERN);
  });
});

describe("buildMailto", () => {
  it("targets the contact address", () => {
    const url = buildMailto({ name: "Ada", email: "ada@example.com", message: "hi" });
    expect(url.startsWith(`mailto:${CONTACT_EMAIL}?`)).toBe(true);
  });

  it("defaults the subject when one is not given", () => {
    const url = buildMailto({ name: "Ada", email: "ada@example.com", message: "hi" });
    expect(url).toContain(`subject=${encodeURIComponent("Portfolio Inquiry")}`);
  });

  it("percent-encodes a newline in the subject so it cannot inject a mail header", () => {
    const url = buildMailto({
      name: "Ada",
      email: "ada@example.com",
      subject: "hi\nBcc: victim@example.com",
      message: "body",
    });

    expect(url).not.toContain("\n");
    expect(url).toContain("%0A");
  });

  it("notes a missing sender address rather than leaving an empty pair of brackets", () => {
    const url = buildMailto({ name: "Ada", email: "", message: "hi" });
    expect(decodeURIComponent(url)).toContain("no-email-provided");
  });
});
