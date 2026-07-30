export const CONTACT_EMAIL = "gokbakalperen@gmail.com";

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
