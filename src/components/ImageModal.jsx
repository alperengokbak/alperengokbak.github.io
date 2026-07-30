import { useEffect, useRef } from "react";
import { useTranslation } from "../i18n/useTranslation.js";

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Accessible lightbox for project screenshots.
 *
 * @param {object}   props
 * @param {boolean}  props.isOpen  Renders nothing when false.
 * @param {Function} props.onClose Called on Escape, backdrop click, and the close button.
 * @param {string}   [props.imgSrc] Resolved asset URL for the full-size image.
 * @param {string}   [props.title]  Project name; drives the accessible name and alt text.
 */
const ImageModal = ({ isOpen, onClose, imgSrc, title }) => {
  const { t } = useTranslation();
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Move focus in on open, restore it to whatever opened the dialog on close.
  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement;
    closeButtonRef.current?.focus();

    return () => {
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [isOpen]);

  // Lock background scrolling while the dialog is up.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Escape closes; Tab cycles within the dialog instead of walking the page behind it.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      ref={dialogRef}
      className="image-model-container"
      onClick={handleBackgroundClick}
      role="dialog"
      aria-modal="true"
      aria-label={title ? `${title} — full size preview` : "Full size preview"}
    >
      <figure className="image-model-figure">
        <img
          src={imgSrc}
          alt={title ? `${title} screenshot` : "Full size preview"}
          className="image-model-img"
        />
        <button ref={closeButtonRef} className="image-model-btn" onClick={onClose} aria-label={t("projects.closePreview")}>
          &times;
        </button>
      </figure>
    </div>
  );
};


export default ImageModal;
