// Background Image And Photos
import photo from "./assets/my_photo.webp";
import heroCloud from "./assets/hero-cloud.webp";
import heroLondon from "./assets/hero-london.webp";
import DockerMedium from "./assets/DockerMedium.webp";
import BookingHotelSs from "./assets/BookingHotelSs.webp";
import PrescriptionManagement from "./assets/PrescriptionManagement.webp";
import twitter_frontend from "./assets/twitter_frontend.webp";
import SwaggerUi from "./assets/Swagger_ui.webp";
import kubernetes from "./assets/kubernetes.webp";
import terraformAwsCover from "./assets/project-covers/terraform-aws.svg";
import azureDevOpsTerraformCover from "./assets/project-covers/azure-devops-terraform.svg";

// Components
import Blogs from "./components/Blogs.jsx";
import Project from "./components/Project.jsx";
import QuickFacts from "./components/QuickFacts.jsx";
import SkillHighlights from "./components/SkillHighlights.jsx";
import ExperienceTimeline from "./components/ExperienceTimeline.jsx";
import Education from "./components/Education.jsx";
import TechStack from "./components/TechStack.jsx";
import Certificates from "./components/Certificates.jsx";
import NavBar from "./components/NavBar.jsx";
import BackToTop from "./components/BackToTop.jsx";
import ConnectSection from "./components/ConnectSection.jsx";
import Typewriter from "typewriter-effect";
import { useScrollReveal } from "./hooks/useScrollReveal.js";
import { useCopyToClipboard } from "./hooks/useCopyToClipboard.js";

function App() {
  const mainRef = useScrollReveal();
  const [emailCopied, copyEmail] = useCopyToClipboard();

  return (
    <div className="site-shell">
      <section className="hero-stage" id="top">
        <img
          src={heroLondon ?? heroCloud}
          className="hero-background"
          alt="London skyline at night"
          aria-hidden="true"
          fetchpriority="high"
        />
        <NavBar />
        <section className="hero-shell" id="about">
          <div className="hero-inner">
            <div className="hero-media">
              <div className="hero-avatar">
                <img src={photo} alt="Alperen Gökbak smiling" />
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
                Izmir, Turkey · Open to relocation
              </div>
            </div>
            <div className="hero-copy">
              <p className="hero-eyebrow">Hello, I&apos;m</p>
              <h1 className="hero-heading">Alperen Gökbak</h1>
              <p className="hero-role" aria-live="polite">
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
                <a href="mailto:gokbakalperen@gmail.com" className="hero-btn">
                  Get in Touch
                </a>
                <a
                  href="/Alperen_Gokbak_CV.pdf"
                  download="Alperen_Gokbak_CV.pdf"
                  className="hero-btn hero-btn-secondary"
                >
                  ↓ Download CV
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
        <div className="reveal">
          <Project
            SwaggerUi={SwaggerUi}
            twitter_frontend={twitter_frontend}
            BookingHotelSs={BookingHotelSs}
            PrescriptionManagement={PrescriptionManagement}
            kubernetesImg={kubernetes}
            terraformAwsCover={terraformAwsCover}
            azureDevOpsTerraformCover={azureDevOpsTerraformCover}
          />
        </div>
        <div className="reveal"><Blogs DockerMedium={DockerMedium} kubernetes={kubernetes} /></div>
        <div className="reveal"><ConnectSection /></div>
      </main>
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-bio">
            <h3 className="footer-name">Alperen Gökbak</h3>
            <p className="footer-tagline">DevOps Engineer · Solutions Architect · Problem Solver</p>
            <p className="footer-summary">
              Designing and delivering secure, automated Azure environments at enterprise scale. Specialising in Infrastructure
              as Code with Terraform and Azure Bicep, multi-stage CI/CD on Azure DevOps, and Kubernetes-based microservices.
            </p>
            <p className="footer-location">📍 Izmir, Turkey · Remote friendly</p>
            <div className="footer-contact">
              <button
                onClick={() => copyEmail("gokbakalperen@gmail.com")}
                className="footer-email copy-email-btn"
                aria-label="Copy email address"
              >
                gokbakalperen@gmail.com
                <span className="copy-badge">{emailCopied ? "✓ Copied!" : "Copy"}</span>
              </button>
              <a className="footer-coffee" href="https://buymeacoffee.com/alperense" target="_blank" rel="noreferrer">
                Buy me a coffee ☕
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
        <div className="footer-bottom">© {new Date().getFullYear()} | Built with love.</div>
      </footer>
      <BackToTop />
    </div>
  );
}

export default App;
