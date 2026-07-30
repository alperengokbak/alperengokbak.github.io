import { useEffect, useRef, useState } from "react";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard.js";
import { CONTACT_EMAIL, buildMailto } from "../lib/contact.js";
import { useTranslation } from "../i18n/useTranslation.js";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/** How long the button holds "Delivered" before offering to send again. */
const DELIVERED_LABEL_MS = 2600;

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

  /**
   * Drives the button's "Delivered" label only.
   *
   * Deliberately separate from `status`: the confirmation message stays on screen for
   * as long as `status` is "success", while the button returns to its idle label so the
   * form is obviously ready to use again. Collapsing the two would either strand the
   * button on "Delivered" or yank the confirmation away from a screen reader mid-read.
   */
  const [justDelivered, setJustDelivered] = useState(false);
  const deliveredTimer = useRef(null);

  useEffect(() => () => clearTimeout(deliveredTimer.current), []);

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

      setJustDelivered(true);
      clearTimeout(deliveredTimer.current);
      deliveredTimer.current = setTimeout(() => setJustDelivered(false), DELIVERED_LABEL_MS);
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
        <p className="section-blurb">{t("sections.contactBlurb")}</p>
      </div>

      <div className="connect-section">
        <form className="connect-card contact-form" onSubmit={handleSubmit}>
          <div className="contact-row">
            <div className="contact-group">
              <label className="contact-label" htmlFor="contact-name">
                {t("contact.name")}
              </label>
              <input
                className="contact-field"
                id="contact-name"
                type="text"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
            </div>
            <div className="contact-group">
              <label className="contact-label" htmlFor="contact-email">
                {t("contact.email")}
              </label>
              <input
                className="contact-field"
                id="contact-email"
                type="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
            </div>
          </div>
          <div className="contact-group">
            <label className="contact-label" htmlFor="contact-subject">
              {t("contact.subject")}
            </label>
            <input
              className="contact-field"
              id="contact-subject"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>
          <div className="contact-group">
            <label className="contact-label" htmlFor="contact-message">
              {t("contact.messageLabel")}
            </label>
            {/* A persistent hint rather than a placeholder: it says what to write and
                stays visible while the visitor writes it. */}
            <p className="contact-hint" id="contact-message-hint">
              {t("contact.message")}
            </p>
            <textarea
              className="contact-field contact-textarea"
              id="contact-message"
              name="message"
              aria-describedby="contact-message-hint"
              value={formData.message}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </div>

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

          <button
            type="submit"
            className="connect-button"
            disabled={isSubmitting}
            data-state={isSubmitting ? "sending" : justDelivered ? "delivered" : "idle"}
          >
            {isSubmitting
              ? t("contact.sending")
              : justDelivered
                ? t("contact.delivered")
                : t("contact.send")}
            {/* Decorative: the state is already carried by the label above, so the rail
                is hidden from assistive tech and disabled under reduced motion. */}
            <span className="connect-button-rail" aria-hidden="true" />
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
          <div className="contact-chip contact-chip--wide">
            <span>{t("contact.base")}</span>
            <p>{t("contact.baseValue")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
