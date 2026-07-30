import { facts } from "../data/quickFacts.js";
import { useTranslation } from "../i18n/useTranslation.js";

const QuickFacts = () => {
  const { t } = useTranslation();
  return (
    <section className="section-shell" id="snapshot">
      <div className="section-header">
        <p className="eyebrow">{t("sections.snapshotEyebrow")}</p>
        <h2 className="section-title">{t("sections.snapshotTitle")}</h2>
        <p className="section-blurb">
          Key details that shape how I learn, collaborate, and build products — tailored to my journey as a cloud and software engineer.
        </p>
      </div>

      <div className="quick-facts-grid">
        {facts.map((fact) => (
          <article key={fact.title} className="quick-fact-card">
            <p className="quick-fact-title">{fact.title}</p>
            <p className="quick-fact-body">{fact.detail}</p>
            <p className="quick-fact-meta">{fact.meta}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default QuickFacts;
