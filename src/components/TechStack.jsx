import { stackSections } from "../data/techStack.js";
import { useTranslation } from "../i18n/useTranslation.js";

const TechStack = () => {
  const { t } = useTranslation();
  return (
    <section className="section-shell" id="tech">
      <div className="section-header">
        <p className="eyebrow">{t("sections.techEyebrow")}</p>
        <h2 className="section-title">{t("sections.techTitle")}</h2>
        <p className="section-blurb">
          The day-to-day toolbelt behind my cloud, automation, and development work — Azure and AWS platforms, Terraform and Kubernetes for delivery, and Python/JavaScript for the glue.
        </p>
      </div>

      <div className="tech-stack-grid">
        {stackSections.map((section) => (
          <article key={section.title} className="tech-stack-card">
            <h3 className="tech-stack-title">{section.title}</h3>
            <div className="tech-icon-grid">
              {section.items.map((item) => (
                <div key={item.name} className="tech-icon-chip">
                  <img src={item.icon} alt={`${item.name} logo`} width="40" height="40" loading="lazy" />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
