const ADDRESS_PARTS = ["gokbak", "alperen", "@", "gmail", ".", "com"];

export const CONTACT_EMAIL = ADDRESS_PARTS.join("");

export function buildMailto({ name, email, subject, message }) {
  const mailSubject = encodeURIComponent(subject || "Portfolio Inquiry");
  const mailBody = encodeURIComponent(`${message}\n\n— ${name} (${email || "no-email-provided"})`);
  return `mailto:${CONTACT_EMAIL}?subject=${mailSubject}&body=${mailBody}`;
}
