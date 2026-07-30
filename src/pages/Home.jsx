// Section content and its images now live in src/data/*; only the hero's own
// assets are imported here.
import photo from "../assets/my_photo.webp";
import heroLondon800 from "../assets/hero/hero-london-800.webp";
import heroLondon1200 from "../assets/hero/hero-london-1200.webp";
import heroLondon1600 from "../assets/hero/hero-london-1600.webp";

// Components
import Blogs from "../components/Blogs.jsx";
import Project from "../components/Project.jsx";
import QuickFacts from "../components/QuickFacts.jsx";
import SkillHighlights from "../components/SkillHighlights.jsx";
import ExperienceTimeline from "../components/ExperienceTimeline.jsx";
import Education from "../components/Education.jsx";
import TechStack from "../components/TechStack.jsx";
import Certificates from "../components/Certificates.jsx";
import NavBar from "../components/NavBar.jsx";
import SocialMediaLinks from "../components/SocialMediaComponent.jsx";
import BackToTop from "../components/BackToTop.jsx";
import ConnectSection from "../components/ConnectSection.jsx";
import Typewriter from "typewriter-effect";
import { useScrollReveal } from "../hooks/useScrollReveal.js";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard.js";
import { CONTACT_EMAIL } from "../lib/contact.js";
import { useTranslation } from "../i18n/useTranslation.js";

export default function Home() {
  const { t } = useTranslation();
  const mainRef = useScrollReveal();
  const [emailCopied, copyEmail] = useCopyToClipboard();

  return (
    <div className="site-shell">
      <section className="hero-stage" id="top">
        {/* LCP element. Served at three widths so phones don't download the 1600px file. */}
        <img
          src={heroLondon1200}
          srcSet={`${heroLondon800} 800w, ${heroLondon1200} 1200w, ${heroLondon1600} 1600w`}
          sizes="100vw"
          width="1600"
          height="1067"
          className="hero-background"
          alt=""
          fetchPriority="high"
        />
        <NavBar />
        <section className="hero-shell" id="about">
          <div className="hero-inner">
            <div className="hero-media">
              <div className="hero-avatar">
                <img src={photo} alt="Alperen Gökbak smiling" width="224" height="224" />
              </div>
              <div className="hero-location">
                <svg
                  className="hero-location-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {t("hero.location")}
              </div>
              <SocialMediaLinks className="hero-social-links" />
            </div>
            <div className="hero-copy">
              <p className="hero-eyebrow">{t("hero.greeting")}</p>
              <h1 className="hero-heading">Alperen Gökbak</h1>
              {/* The looping animation is decorative; screen readers get the static line below. */}
              <p className="sr-only">{t("hero.roles")}</p>
              <p className="hero-role" aria-hidden="true">
                <Typewriter
                  options={{
                    strings: ["devops engineer", "solutions architect", "software engineer"],
                    autoStart: true,
                    loop: true,
                    delay: 65,
                    deleteSpeed: 35,
                    pauseFor: 2200,
                    wrapperClassName: "hero-role-dynamic",
                    cursorClassName: "hero-role-cursor",
                  }}
                />
              </p>
              <p className="hero-summary">
                DevOps Engineer and Solutions Architect with nearly three years of experience working remotely for German
                technology companies. Specialising in cloud infrastructure, Infrastructure as Code, and enterprise architecture,
                with a proven track record of designing and delivering complex Azure environments at enterprise scale. Microsoft
                Certified Azure Solutions Architect Expert and Azure Administrator Associate.
              </p>
              <div className="hero-actions">
                <a href={`mailto:${CONTACT_EMAIL}`} className="hero-btn">
                  {t("hero.getInTouch")}
                </a>
                <a
                  href="/Alperen_Gokbak_CV.pdf"
                  download="Alperen_Gokbak_CV.pdf"
                  className="hero-btn hero-btn-secondary"
                >
                  {t("hero.downloadCv")}
                </a>
              </div>
            </div>
          </div>
        </section>
      </section>
      <main className="site-content" ref={mainRef}>
        <div className="reveal"><QuickFacts /></div>
        <div className="reveal"><SkillHighlights /></div>
        <div className="reveal"><TechStack /></div>
        <div className="reveal"><Certificates /></div>
        <div className="reveal"><ExperienceTimeline /></div>
        <div className="reveal"><Education /></div>
        <div className="reveal"><Project /></div>
        <div className="reveal"><Blogs /></div>
        <div className="reveal"><ConnectSection /></div>
      </main>
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-bio">
            <h3 className="footer-name">Alperen Gökbak</h3>
            <p className="footer-tagline">{t("footer.tagline")}</p>
            <p className="footer-summary">
              Designing and delivering secure, automated Azure environments at enterprise scale. Specialising in Infrastructure
              as Code with Terraform and Azure Bicep, multi-stage CI/CD on Azure DevOps, and Kubernetes-based microservices.
            </p>
            <p className="footer-location">{t("footer.location")}</p>
            <div className="footer-contact">
              <button
                onClick={() => copyEmail(CONTACT_EMAIL)}
                className="footer-email copy-email-btn"
                aria-label={t("contact.copyEmail")}
              >
                {CONTACT_EMAIL}
                <span className="copy-badge">{emailCopied ? t("contact.copied") : t("contact.copy")}</span>
              </button>
              <a className="footer-coffee" href="https://buymeacoffee.com/alperense" target="_blank" rel="noreferrer">
                {t("footer.coffee")}
              </a>
            </div>
            <div className="footer-socials">
              <a href="https://www.linkedin.com/in/alperengokbak/" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href="https://github.com/alperengokbak" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </div>
          <div className="footer-pills">
            {["Azure Architecture", "Infrastructure as Code", "Kubernetes Delivery", "CI/CD Automation", "HLD/LLD Documentation"].map((pill) => (
              <span key={pill}>{pill}</span>
            ))}
          </div>
        </div>
        <div className="footer-bottom">© {new Date().getFullYear()} | {t("footer.builtWith")}</div>
      </footer>
      <BackToTop />
    </div>
  );
}
