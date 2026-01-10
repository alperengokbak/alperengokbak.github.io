// Background Image And Photos
import sweden from "./assets/sweden.jpeg";
import photo from "./assets/photo.jpeg";
import heroCloud from "./assets/hero-cloud.jpg";
import heroCopenhagen from "./assets/hero-copenhagen.jpg";
import DockerMedium from "./assets/DockerMedium.webp";
import BookingHotelSs from "./assets/BookingHotelSs.jpeg";
import PrescriptionManagement from "./assets/PrescriptionManagement.png";
import twitter_frontend from "./assets/twitter_frontend.png";
import SwaggerUi from "./assets/Swagger_ui.png";
import kubernetes from "./assets/kubernetes.webp";

// Components
import Blogs from "./components/Blogs.jsx";
import Project from "./components/Project.jsx";
import QuickFacts from "./components/QuickFacts.jsx";
import SkillHighlights from "./components/SkillHighlights.jsx";
import ExperienceTimeline from "./components/ExperienceTimeline.jsx";
import TechStack from "./components/TechStack.jsx";
import Certificates from "./components/Certificates.jsx";
import NavBar from "./components/NavBar.jsx";
import Typewriter from "typewriter-effect";

function App() {
  return (
    <div className="site-shell">
      <section className="hero-stage" id="top">
        <img
          src={heroCopenhagen ?? heroCloud ?? sweden}
          className="hero-background"
          alt="Copenhagen skyline at dusk"
          aria-hidden="true"
        />
        <NavBar />
        <section className="hero-shell" id="about">
          <div className="hero-inner">
            <div className="hero-media">
              <div className="hero-avatar">
                <img src={photo} alt="Alperen Gökbak smiling" />
              </div>
              <div className="hero-location">
                <span aria-hidden="true">📍</span> Izmir, Turkey
              </div>
            </div>
            <div className="hero-copy">
              <p className="hero-eyebrow">Hello, I&apos;m</p>
              <h1 className="hero-heading">Alperen Gökbak</h1>
              <p className="hero-role" aria-live="polite">
                <Typewriter
                  options={{
                    strings: ["solution architect", "devops engineer", "software engineer"],
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
                Cloud Solution Architect and DevOps Engineer with expertise in Azure DevOps, Terraform, Kubernetes, and
                Infrastructure as Code (IaC). Experienced in designing resilient cloud architectures across Azure and AWS.
                Passionate about secure systems design, automation, and applied AI research in distributed computing
                environments. Proven ability to deliver scalable solutions in both commercial and research settings.
              </p>
              <div className="hero-actions">
                <a href="mailto:gokbakalperen@gmail.com" className="hero-btn">
                  Get in Touch
                </a>
                <a
                  href="https://drive.google.com/file/d/1oXlulUQl0aFLAfCG_DJkr9VA86zm7Kmn/preview"
                  target="_blank"
                  rel="noreferrer"
                  className="hero-btn hero-btn-secondary"
                >
                  View CV
                </a>
              </div>
            </div>
          </div>
        </section>
      </section>
      <main className="site-content">
        <QuickFacts />
        <SkillHighlights />
        <TechStack />
        <Certificates />
        <ExperienceTimeline />
        <Project
          SwaggerUi={SwaggerUi}
          twitter_frontend={twitter_frontend}
          BookingHotelSs={BookingHotelSs}
          PrescriptionManagement={PrescriptionManagement}
          kubernetesImg={kubernetes}
        />
        <Blogs DockerMedium={DockerMedium} kubernetes={kubernetes} />
      </main>
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-bio">
            <h3 className="footer-name">Alperen Gökbak</h3>
            <p className="footer-tagline">Solution Architect · DevOps Engineer · Problem Solver</p>
            <p className="footer-summary">
              Structural-thinking engineer crafting secure, automated cloud platforms across Azure and AWS. Currently exploring
              AI-assisted infrastructure design, compliance automation, and end-to-end observability.
            </p>
            <p className="footer-location">📍 Izmir, Turkey · Remote friendly</p>
            <div className="footer-contact">
              <a href="mailto:gokbakalperen@gmail.com" className="footer-email">
                gokbakalperen@gmail.com
              </a>
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
            {["Cloud Architecture", "DevOps Automation", "AI Playbooks", "Platform Security", "Technical Leadership"].map((pill) => (
              <span key={pill}>{pill}</span>
            ))}
          </div>
        </div>
        <div className="footer-bottom">© {new Date().getFullYear()} | Built with love and automation.</div>
      </footer>
    </div>
  );
}

export default App;
