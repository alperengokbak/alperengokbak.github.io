import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { caseStudyForProject } from "../data/caseStudies.js";
import { useTranslation } from "../i18n/useTranslation.js";

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
const SWIPE_THRESHOLD = 50;

const ACCENT_VAR = {
  FullStack: "var(--cat-fullstack)",
  Cloud: "var(--cat-cloud)",
  DevOps: "var(--cat-devops)",
};
const accentFor = (category) => ACCENT_VAR[category] ?? "var(--cat-neutral)";

const ProjectLightbox = ({ projects, index, onClose, onIndexChange }) => {
  const { t } = useTranslation();
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const touchStartX = useRef(null);

  const isOpen = index !== null && index !== undefined && projects.length > 0;
  const project = isOpen ? projects[index] : null;

  const step = useCallback(
    (delta) => {
      if (!projects.length) return;
      onIndexChange((index + delta + projects.length) % projects.length);
    },
    [index, projects.length, onIndexChange]
  );

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement;
    closeButtonRef.current?.focus();

    return () => {
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const neighbours = [
      projects[(index + 1) % projects.length],
      projects[(index - 1 + projects.length) % projects.length],
    ];

    neighbours.forEach((neighbour) => {
      if (!neighbour) return;
      const preloaded = new Image();
      preloaded.src = neighbour.imgSrc;
    });
  }, [isOpen, index, projects]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "ArrowRight") {
        step(1);
        return;
      }

      if (event.key === "ArrowLeft") {
        step(-1);
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll(FOCUSABLE);
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose, step]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target.closest(".project-lightbox-panel, .project-lightbox-arrow, .project-lightbox-close")) return;
    onClose();
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;

    const travelled = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(travelled) < SWIPE_THRESHOLD) return;
    step(travelled < 0 ? 1 : -1);
  };

  const caseStudy = caseStudyForProject(project.title);
  const hasNavigation = projects.length > 1;

  return createPortal(
    <div
      ref={dialogRef}
      className="project-lightbox"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — full size preview`}
      style={{ "--project-accent": accentFor(project.category) }}
    >
      {hasNavigation && (
        <button
          className="project-lightbox-arrow project-lightbox-arrow-prev"
          onClick={() => step(-1)}
          aria-label={t("projects.previousProject")}
        >
          &#8249;
        </button>
      )}

      <figure className="project-lightbox-panel" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div className="project-lightbox-frame">
          <img src={project.imgSrc} alt={`${project.title} preview`} className="project-lightbox-img" />
        </div>

        <figcaption className="project-lightbox-caption">
          <div className="project-lightbox-heading">
            <h2 className="project-lightbox-title">{project.title}</h2>

            {project.timeframe && <p className="project-lightbox-meta">{project.timeframe}</p>}

          </div>

          <div className="project-card-tags">
            {project.badges?.map((badge) => (
              <span key={`${project.title}-${badge}`}>{badge}</span>
            ))}
          </div>

          <div className="project-lightbox-actions">
            {project.videoLink && (
              <a
                href={project.videoLink}
                target="_blank"
                rel="noreferrer"
                className="project-card-action project-card-action-secondary"
              >
                {t("projects.watchDemo")}
              </a>
            )}
            <a href={project.link} target="_blank" rel="noreferrer" className="project-card-action">
              {t("projects.viewProject")}
            </a>

            {caseStudy && (
              <Link to={`/case-studies/${caseStudy.slug}`} className="project-card-action" onClick={onClose}>
                {t("projects.readCaseStudy")}
              </Link>
            )}
          </div>

          {hasNavigation && (
            <p className="project-lightbox-counter">
              {t("projects.previewCounter", { current: index + 1, total: projects.length })}
            </p>
          )}

        </figcaption>

      </figure>

      {hasNavigation && (
        <button
          className="project-lightbox-arrow project-lightbox-arrow-next"
          onClick={() => step(1)}
          aria-label={t("projects.nextProject")}
        >
          &#8250;
        </button>
      )}

      <button
        ref={closeButtonRef}
        className="project-lightbox-close"
        onClick={onClose}
        aria-label={t("projects.closePreview")}
      >
        &times;
      </button>

    </div>,
    document.body
  );
};

export default ProjectLightbox;
