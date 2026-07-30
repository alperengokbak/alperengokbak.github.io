import { education } from "../data/education.js";
import { useTranslation } from "../i18n/useTranslation.js";

const Education = () => {
  const { t } = useTranslation();
  return (
    <section className="section-shell" id="education">
      <div className="section-header">
        <p className="eyebrow">{t("sections.educationEyebrow")}</p>

        <h2 className="section-title">{t("sections.educationTitle")}</h2>

        {}
        <p className="section-blurb">
          Where the engineering fundamentals were built, and where they go next — from a cloud-AI capstone to a master&apos;s in network architecture.
        </p>

      </div>

      <div className="timeline">
        {education.map((item) => (
          <article key={item.title} className="timeline-item">
            <div className="timeline-node" aria-hidden="true" />
            <div className="timeline-body">
              <div className="timeline-header">
                {item.logo ? (
                  <img className="timeline-logo" src={item.logo} alt={`${item.location} logo`} width="56" height="56" loading="lazy" />
                ) : null}
                <div className="flex flex-col gap-1 text-left">
                  <div className="text-sm font-semibold text-accent-soft/90 tracking-[0.3em] uppercase">{item.period}</div>

                  <h3 className="timeline-title">{item.title}</h3>

                  <p className="timeline-meta">{item.location}</p>

                </div>

              </div>

              <p className="mt-4 text-left text-neutral-300 leading-relaxed">{item.summary}</p>

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

export default Education;
