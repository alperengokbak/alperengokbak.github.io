import { skillAreas } from "../data/skills.js";
import { useTranslation } from "../i18n/useTranslation.js";

const SkillHighlights = () => {
  const { t } = useTranslation();
  return (
    <section className="section-shell" id="skills">
      <div className="section-header">
        <p className="eyebrow">{t("sections.skillsEyebrow")}</p>
        <h2 className="section-title">{t("sections.skillsTitle")}</h2>
        <p className="section-blurb">
          The four pillars I deliver across enterprise engagements: cloud and infrastructure design, DevOps automation, hands-on development, and professional collaboration.
        </p>
      </div>

      <div className="skill-grid">
        {skillAreas.map((area) => (
          <article key={area.title} className="skill-card">
            <h3 className="skill-title">{area.title}</h3>
            <p className="text-neutral-300 leading-relaxed">{area.description}</p>
            <div className="skill-pill-container">
              {area.stack.map((item) => (
                <span key={item} className="skill-pill">
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default SkillHighlights;
