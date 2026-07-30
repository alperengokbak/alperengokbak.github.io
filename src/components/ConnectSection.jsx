import { useState } from "react";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard.js";
import { CONTACT_EMAIL, buildMailto } from "../lib/contact.js";
import { useTranslation } from "../i18n/useTranslation.js";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/**
 * Read at call time rather than module scope so the value is not frozen at import.
 *
 * Public by design: Vite inlines VITE_* into the client bundle, and Web3Forms treats
 * this as a submission token rather than a credential. The honeypot is what keeps the
 * endpoint from being trivially spammed.
 */
const getAccessKey = () => import.meta.env.VITE_WEB3FORMS_KEY;

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
  botcheck: "",
};

const ConnectSection = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const [emailCopied, copyEmail] = useCopyToClipboard();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Bots that fill the hidden field get a no-op rather than a delivered message.
    if (formData.botcheck) return;

    // With no key configured there is no endpoint to post to, so fall back to the
    // visitor's mail client rather than failing with no explanation.
    const accessKey = getAccessKey();
    if (!accessKey) {
      window.location.href = buildMailto(formData);
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "Portfolio Inquiry",
          message: formData.message,
          from_name: "Portfolio contact form",
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.success === false) {
        throw new Error(result.message || `Request failed with status ${response.status}`);
      }

      setStatus("success");
      setFormData(initialForm);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.message || "Something went wrong.");
    }
  };

  const isSubmitting = status === "submitting";

  return (
    <section className="section-shell" id="contact">
      <div className="section-header">
        <p className="eyebrow">{t("sections.contactEyebrow")}</p>
        <h2 className="section-title">{t("sections.contactTitle")}</h2>
        <p className="section-blurb">
          Have an opportunity, project idea, or just want to connect? I&apos;d love to hear from you.
        </p>
      </div>

      <div className="connect-section">
        <form className="connect-card contact-form" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <input
              className="contact-field"
              type="text"
              name="name"
              placeholder={t("contact.name")}
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
            <input
              className="contact-field"
              type="email"
              name="email"
              placeholder={t("contact.email")}
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </div>
          <input
            className="contact-field"
            type="text"
            name="subject"
            placeholder={t("contact.subject")}
            value={formData.subject}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          <textarea
            className="contact-field min-h-[160px]"
            name="message"
            placeholder={t("contact.message")}
            value={formData.message}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          />

          {/* Honeypot: hidden from people, irresistible to bots. */}
          <input
            type="text"
            name="botcheck"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            value={formData.botcheck}
            onChange={handleChange}
            aria-hidden="true"
          />

          <button type="submit" className="connect-button" disabled={isSubmitting}>
            {isSubmitting ? t("contact.sending") : t("contact.send")}
          </button>

          {/* Outcome is announced, so a screen reader user is not left guessing. */}
          <p className="form-status" role="status" aria-live="polite">
            {status === "success" && t("contact.success")}
          </p>
          {status === "error" && (
            <p className="form-status-error" role="alert">
              {t("contact.errorPrefix")} ({errorMessage}).{" "}
              <a href={buildMailto(formData)}>{t("contact.emailDirectly")}</a>
            </p>
          )}

          <p className="form-fallback">
            {t("contact.fallback")} <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        </form>

        <div className="contact-info">
          <div className="contact-chip">
            <span>Email</span>
            <button
              type="button"
              onClick={() => copyEmail(CONTACT_EMAIL)}
              className="copy-email-btn"
              aria-label={t("contact.copyEmail")}
            >
              {CONTACT_EMAIL}
              <span className="copy-badge">{emailCopied ? t("contact.copied") : t("contact.copy")}</span>
            </button>
          </div>
          <div className="contact-chip">
            <span>LinkedIn</span>
            <a href="https://www.linkedin.com/in/alperengokbak/" target="_blank" rel="noreferrer">
              in/alperengokbak
            </a>
          </div>
          <div className="contact-chip">
            <span>GitHub</span>
            <a href="https://github.com/alperengokbak" target="_blank" rel="noreferrer">
              github.com/alperengokbak
            </a>
          </div>
          <div className="contact-chip">
            <span>{t("contact.base")}</span>
            <p>{t("contact.baseValue")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
