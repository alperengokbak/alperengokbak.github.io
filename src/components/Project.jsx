import { useState } from "react";
import ProjectLightbox from "./ProjectLightbox";
import { projects, projectCategories } from "../data/projects.js";
import { Link } from "react-router-dom";
import { caseStudyForProject } from "../data/caseStudies.js";
import { useTranslation } from "../i18n/useTranslation.js";

const ALL = "All";
const FILTERS = [ALL, ...projectCategories];

const ACCENT_VAR = {
  FullStack: "var(--cat-fullstack)",
  Cloud: "var(--cat-cloud)",
  DevOps: "var(--cat-devops)",
};
const accentFor = (category) => ACCENT_VAR[category] ?? "var(--cat-neutral)";

export default function Project() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);
  const [activeFilter, setActiveFilter] = useState(ALL);

  const filtered = activeFilter === ALL ? projects : projects.filter((p) => p.category === activeFilter);

  const closeLightbox = () => setOpenIndex(null);

  const changeFilter = (next) => {
    setOpenIndex(null);
    setActiveFilter(next);
  };

  return (
    <section className="section-shell" id="projects">
      <div className="section-header">
        <p className="eyebrow">{t("sections.projectsEyebrow")}</p>

        <h2 className="section-title">{t("sections.projectsTitle")}</h2>

        <p className="section-blurb">
          Selected launches where I owned architecture, automation, or product polish. Each card links to repos, demos, or case studies.
        </p>

      </div>

      <div className="filter-bar" role="group" aria-label={t("projects.filterLabel")}>
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => changeFilter(f)}
            className={`filter-pill ${activeFilter === f ? "filter-pill-active" : ""}`}
            aria-pressed={activeFilter === f}
          >
            {f === ALL ? t("projects.all") : f}
          </button>
        ))}
      </div>

      <div className="project-card-grid">
        {filtered.map((project, i) => (
          <article key={project.title} className="project-card" style={{ "--project-accent": accentFor(project.category) }}>
            <button
              type="button"
              className="project-card-media"
              onClick={() => setOpenIndex(i)}
              aria-label={t("projects.openPreview", { title: project.title })}
            >
              <img src={project.imgSrc} alt={project.title} width="640" height="384" loading="lazy" />
              {project.timeframe && <span className="project-card-pill">{project.timeframe}</span>}

            </button>

            <div className="project-card-body">
              <h3 className="project-card-title">{project.title}</h3>

              <p className="project-card-summary">{project.description}</p>

              <div className="project-card-tags">
                {project.badges?.map((badge) => (
                  <span key={`${project.title}-${badge}`}>{badge}</span>
                ))}
              </div>

              <div className="project-card-actions">
                {project.videoLink && (
                  <a href={project.videoLink} target="_blank" rel="noreferrer" className="project-card-action project-card-action-secondary">
                    {t("projects.watchDemo")}
                  </a>
                )}
                <a href={project.link} target="_blank" rel="noreferrer" className="project-card-action">
                  {t("projects.viewProject")}
                </a>

                {caseStudyForProject(project.title) && (
                  <Link
                    to={`/case-studies/${caseStudyForProject(project.title).slug}`}
                    className="project-card-action project-card-action-study"
                  >
                    {t("projects.readCaseStudy")}
                  </Link>
                )}
              </div>

            </div>

          </article>
        ))}
      </div>

      <ProjectLightbox
        projects={filtered}
        index={openIndex}
        onClose={closeLightbox}
        onIndexChange={setOpenIndex}
      />

    </section>
  );
}
