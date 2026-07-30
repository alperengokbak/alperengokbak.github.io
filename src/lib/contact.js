/**
 * The contact address is assembled at runtime instead of being written as a literal.
 *
 * Address harvesters overwhelmingly work by running a `\S+@\S+` style regex over the
 * served HTML and JS. Splitting the address across array elements means no substring of
 * the shipped bundle matches that pattern — esbuild folds arithmetic on literals but
 * does not evaluate method calls like `join`, so the parts stay separate through the
 * build. `scripts/../src/lib/contact.test.js` pins that behaviour.
 *
 * The ceiling here is low and worth being honest about: this defeats naive scrapers, not
 * anything that executes JavaScript. The address is displayed on the page, so it is
 * always harvestable by a headless browser. If spam becomes a real problem, the stronger
 * move is to lead with the contact form and stop displaying the address at all.
 */
const ADDRESS_PARTS = ["gokbak", "alperen", "@", "gmail", ".", "com"];

export const CONTACT_EMAIL = ADDRESS_PARTS.join("");

/**
 * Builds the mailto: URL used as the contact form's fallback path.
 *
 * Every field is percent-encoded, so a newline in the subject cannot break out into
 * an additional mail header.
 */
export function buildMailto({ name, email, subject, message }) {
  const mailSubject = encodeURIComponent(subject || "Portfolio Inquiry");
  const mailBody = encodeURIComponent(`${message}\n\n— ${name} (${email || "no-email-provided"})`);
  return `mailto:${CONTACT_EMAIL}?subject=${mailSubject}&body=${mailBody}`;
}
