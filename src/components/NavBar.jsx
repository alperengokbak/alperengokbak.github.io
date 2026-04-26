import { useState, useEffect, useRef } from "react";
import SocialMediaLinks from "./SocialMediaComponent.jsx";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Profile", href: "#snapshot" },
  { label: "Skills", href: "#skills" },
  { label: "Stack", href: "#tech" },
  { label: "Certs", href: "#certificates" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Blogs", href: "#blogs" },
  { label: "Contact", href: "#contact" },
];

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const observerRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.slice(1));

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the greatest intersection ratio that's actually intersecting
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
  }, []);

  return (
    <header className="site-nav">
      <div className="nav-inner">
        <a href="#top" className="nav-logo" aria-label="Scroll to top">
          <img src="/monogram.svg" alt="" className="nav-logo-mark" aria-hidden="true" />
          <span className="nav-name nav-name-large">Alperen Gokbak</span>
        </a>
        <button
          className={`nav-hamburger lg:hidden ${isMenuOpen ? "nav-hamburger-open" : ""}`}
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className="nav-links" aria-label="Primary">
          {navItems.map((item) => {
            const id = item.href.slice(1);
            return (
              <a
                key={item.label}
                href={item.href}
                className={`nav-link ${activeId === id ? "nav-link-active" : ""}`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
        <span className="nav-divider" aria-hidden="true" />
        <SocialMediaLinks className="nav-social-links" />
      </div>

      <div className={`mobile-menu ${isMenuOpen ? "mobile-menu-open" : ""}`}>
        <nav aria-label="Mobile">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="mobile-link" onClick={closeMenu}>
              {item.label}
            </a>
          ))}
        </nav>
        <span className="mobile-divider" aria-hidden="true" />
        <div className="mobile-social-block" aria-label="Social media">
          <SocialMediaLinks className="mobile-social-links" />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
