import { useEffect, useRef, useState } from "react";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard.js";
import { CONTACT_EMAIL, buildMailto } from "../lib/contact.js";
import { useTranslation } from "../i18n/useTranslation.js";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const DELIVERED_LABEL_MS = 2600;

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
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailCopied, copyEmail] = useCopyToClipboard();

  const [justDelivered, setJustDelivered] = useState(false);
  const deliveredTimer = useRef(null);

  useEffect(() => () => clearTimeout(deliveredTimer.current), []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.botcheck) return;

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

          {}
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
            <span className="connect-button-rail" aria-hidden="true" />
          </button>

          {}
          <p className="form-status" role="status" aria-live="polite">
            {status === "success" && t("contact.success")}
          </p>

          {status === "error" && (
            <p className="form-status-error" role="alert">
              {t("contact.errorPrefix")} ({errorMessage}).{" "}
              <a href={buildMailto(formData)}>{t("contact.emailDirectly")}</a>

            </p>
          )}

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
