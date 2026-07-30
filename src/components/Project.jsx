import { useState } from "react";
import ImageModal from "./ImageModal";
import { projects, projectCategories } from "../data/projects.js";
import { Link } from "react-router-dom";
import { caseStudyForProject } from "../data/caseStudies.js";
import { useTranslation } from "../i18n/useTranslation.js";

// "All" is a sentinel, not a category; its label is translated at render time.
const ALL = "All";
const FILTERS = [ALL, ...projectCategories];

/** Category -> the CSS custom property holding that category's hue in the active theme. */
const ACCENT_VAR = {
  FullStack: "var(--cat-fullstack)",
  Cloud: "var(--cat-cloud)",
  DevOps: "var(--cat-devops)",
};
const accentFor = (category) => ACCENT_VAR[category] ?? "var(--cat-neutral)";

export default function Project() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState(ALL);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };


  const filtered = activeFilter === ALL ? projects : projects.filter((p) => p.category === activeFilter);

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
            onClick={() => setActiveFilter(f)}
            className={`filter-pill ${activeFilter === f ? "filter-pill-active" : ""}`}
            aria-pressed={activeFilter === f}
          >
            {f === ALL ? t("projects.all") : f}
          </button>
        ))}
      </div>

      <div className="project-card-grid">
        {filtered.map((project) => (
          <article key={project.title} className="project-card" style={{ "--project-accent": accentFor(project.category) }}>
            <button
              type="button"
              className="project-card-media"
              onClick={() => openModal(project)}
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

      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imgSrc={selectedProject?.imgSrc}
        title={selectedProject?.title}
      />
    </section>
  );
}

