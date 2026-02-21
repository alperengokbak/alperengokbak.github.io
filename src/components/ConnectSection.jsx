import { useState } from "react";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard.js";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const ConnectSection = () => {
  const [formData, setFormData] = useState(initialForm);
  const [emailCopied, copyEmail] = useCopyToClipboard();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, subject, message } = formData;
    const mailSubject = encodeURIComponent(subject || "Portfolio Inquiry");
    const mailBody = encodeURIComponent(`${message}\n\n— ${name} (${email || "no-email-provided"})`);
    window.location.href = `mailto:gokbakalperen@gmail.com?subject=${mailSubject}&body=${mailBody}`;
  };

  return (
    <section className="section-shell" id="contact">
      <div className="section-header">
        <p className="eyebrow">Let&apos;s Connect</p>
        <h2 className="section-title">Start a Conversation</h2>
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
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              className="contact-field"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <input
            className="contact-field"
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
          />
          <textarea
            className="contact-field min-h-[160px]"
            name="message"
            placeholder="Tell me about the problem you want to solve..."
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className="connect-button">
            Send Message
          </button>
        </form>

        <div className="contact-info">
          <div className="contact-chip">
            <span>Email</span>
            <button
              onClick={() => copyEmail("gokbakalperen@gmail.com")}
              className="copy-email-btn"
              aria-label="Copy email address"
            >
              gokbakalperen@gmail.com
              <span className="copy-badge">{emailCopied ? "✓ Copied!" : "Copy"}</span>
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
            <span>Base</span>
            <p>Izmir, Turkey & remote-friendly</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
