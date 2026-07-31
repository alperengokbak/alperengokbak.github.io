import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import Logo from "./Logo.jsx";
import SocialMediaLinks from "./SocialMediaComponent.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import { useTranslation } from "../i18n/useTranslation.js";

const navItems = [
  { key: "about", href: "#about" },
  { key: "snapshot", href: "#snapshot" },
  { key: "skills", href: "#skills" },
  { key: "tech", href: "#tech" },
  { key: "certificates", href: "#certificates" },
  { key: "experience", href: "#experience" },
  { key: "education", href: "#education" },
  { key: "projects", href: "#projects" },
  { key: "blogs", href: "#blogs" },
  { key: "contact", href: "#contact" },
];

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const NavBar = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const hrefFor = (anchor) => (onHome ? anchor : `/${anchor}`);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const observerRef = useRef(null);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (!onHome) return;
    const sectionIds = navItems.map((item) => item.href.slice(1));

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length === 0) return;
        const best = intersecting.reduce((a, b) =>
          a.intersectionRatio >= b.intersectionRatio ? a : b
        );
        setActiveId(best.target.id);
      },
      {
        rootMargin: "-30% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [onHome]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = menuRef.current?.querySelectorAll(FOCUSABLE);
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

    const hamburger = hamburgerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    menuRef.current?.querySelector(FOCUSABLE)?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      hamburger?.focus();
    };
  }, [isMenuOpen]);

  return (
    <header className="site-nav">
      <div className="nav-inner">
        <a href={hrefFor("#top")} className="nav-logo" aria-label={t("nav.scrollToTop")}>
          <Logo className="nav-logo-mark" size={36} decorative />
          <span className="nav-name nav-name-large">Alperen Gokbak</span>

        </a>

        <button
          ref={hamburgerRef}
          className={`nav-hamburger lg:hidden ${isMenuOpen ? "nav-hamburger-open" : ""}`}
          type="button"
          aria-label={t("nav.toggleNavigation")}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={toggleMenu}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className="nav-links" aria-label={t("nav.primary")}>
          {navItems.map((item) => {
            const id = item.href.slice(1);
            return (
              <a
                key={item.key}
                href={hrefFor(item.href)}
                className={`nav-link ${activeId === id ? "nav-link-active" : ""}`}
              >
                {t(`nav.${item.key}`)}
              </a>
            );
          })}
        </nav>

        {}
        <div className="nav-actions">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

      </div>

      {createPortal(
        <div
          id="mobile-menu"
          ref={menuRef}
          className={`mobile-menu ${isMenuOpen ? "mobile-menu-open" : ""}`}
          inert={isMenuOpen ? undefined : ""}
          aria-hidden={!isMenuOpen}
        >
          <nav aria-label={t("nav.mobile")}>
            {navItems.map((item) => {
              const id = item.href.slice(1);
              return (
                <a
                  key={item.key}
                  href={hrefFor(item.href)}
                  className={`mobile-link ${activeId === id ? "mobile-link-active" : ""}`}
                  aria-current={activeId === id ? "true" : undefined}
                  onClick={closeMenu}
                >
                  {t(`nav.${item.key}`)}
                </a>
              );
            })}
          </nav>

          <a
            className="mobile-cv"
            href="/Alperen_Gokbak_CV.pdf"
            download="Alperen_Gokbak_CV.pdf"
            onClick={closeMenu}
          >
            {t("nav.downloadCv")}
          </a>

          <span className="mobile-divider" aria-hidden="true" />
          <div className="mobile-social-block" aria-label={t("nav.socialMedia")}>
            <SocialMediaLinks className="mobile-social-links" />
            <LanguageSwitcher className="language-toggle-mobile" />
            <ThemeToggle className="theme-toggle-mobile" />
          </div>

        </div>,
        document.body
      )}

    </header>
  );
};

export default NavBar;
