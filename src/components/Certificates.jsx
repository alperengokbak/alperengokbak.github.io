import { certificates } from "../data/certificates.js";
import { useTranslation } from "../i18n/useTranslation.js";

const Certificates = () => {
  const { t } = useTranslation();
  return (
    <section className="section-shell" id="certificates">
      <div className="section-header">
        <p className="eyebrow">{t("sections.certificatesEyebrow")}</p>
        <h2 className="section-title">{t("sections.certificatesTitle")}</h2>
        <p className="section-blurb">
          External proof-points from Microsoft, The Linux Foundation, and Udemy that reinforce my day-to-day architecture, automation, and security work.
        </p>
      </div>

      <div className="certificate-grid">
        {certificates.map((certificate) => (
          <article key={certificate.title} className="certificate-card">
            <div className="certificate-card-row">
              {certificate.badge ? (
                <img className="certificate-badge" src={certificate.badge} alt={`${certificate.issuer} badge`} width="64" height="64" loading="lazy" />
              ) : null}
              <div className="certificate-card-text">
                <h3 className="certificate-title">{certificate.title}</h3>
                <p className="certificate-issuer">{certificate.issuer}</p>
                <p className="certificate-meta">
                  {/* `issued` is optional so a newly added credential can ship before its
                      date is confirmed, rather than displaying a guessed one. */}
                  {certificate.issued ? `${t("certificates.issued")} ${certificate.issued}` : null}
                  {certificate.issued && certificate.credentialId ? " · " : null}
                  {certificate.credentialId ? `ID ${certificate.credentialId}` : null}
                </p>
              </div>
            </div>
            {certificate.link ? (
              <a className="certificate-link" href={certificate.link} target="_blank" rel="noreferrer">
                {t("certificates.viewCredential")}
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
};

export default Certificates;
