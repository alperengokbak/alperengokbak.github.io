import { milestones } from "../data/experience.js";
import { useTranslation } from "../i18n/useTranslation.js";

const ExperienceTimeline = () => {
  const { t } = useTranslation();
  return (
    <section className="section-shell" id="experience">
      <div className="section-header">
        <p className="eyebrow">{t("sections.experienceEyebrow")}</p>

        <h2 className="section-title">{t("sections.experienceTitle")}</h2>

        <p className="section-blurb">
          A career progression from Full-Stack development into DevOps, Cloud, and Solutions Architect roles — designing and delivering Azure, AWS, Terraform, and Kubernetes platforms for enterprise customers.
        </p>

      </div>

      <div className="timeline">
        {milestones.map((item) => (
          <article key={item.title} className="timeline-item">
            <div className="timeline-node" aria-hidden="true" />
            <div className="timeline-body">
              <div className="timeline-header">
                {item.logo ? (
                  <img
                    className={`timeline-logo${item.logoVariant === "dark" ? " timeline-logo--dark" : ""}`}
                    src={item.logo}
                    alt={`${item.location} logo`}
                    width="56"
                    height="56"
                    loading="lazy"
                  />
                ) : null}
                <div className="flex flex-col gap-1 text-left">
                  <div className="text-sm font-semibold text-accent-soft/90 tracking-[0.3em] uppercase">{item.period}</div>

                  <h3 className="timeline-title">{item.title}</h3>

                  <p className="timeline-meta">{item.location}</p>

                </div>

              </div>

              <p className="mt-4 text-left [color:var(--text-secondary)] leading-relaxed">{item.summary}</p>

              <ul className="timeline-list">
                {item.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

            </div>

          </article>
        ))}
      </div>

    </section>
  );
};

export default ExperienceTimeline;
