import { useState } from "react";
import SocialMediaLinks from "./SocialMediaComponent.jsx";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Profile", href: "#snapshot" },
  { label: "Skills", href: "#skills" },
  { label: "Tech Stack", href: "#tech" },
  { label: "Certificates", href: "#certificates" },
  { label: "Work Experiences", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Blogs", href: "#blogs" },
];

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-nav">
      <div className="nav-inner">
        <a href="#top" className="nav-logo" aria-label="Scroll to top">
          <span className="nav-name nav-name-large">Alperen Gokbak</span>
        </a>
        <button
          className="nav-hamburger lg:hidden"
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
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
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
