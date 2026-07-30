import { Link, useParams } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import BackToTop from "../components/BackToTop.jsx";
import { caseStudyBySlug } from "../data/caseStudies.js";
import { useDocumentMeta } from "../hooks/useDocumentMeta.js";
import NotFound from "./NotFound.jsx";

export default function CaseStudy() {
  const { slug } = useParams();
  const study = caseStudyBySlug(slug);

  if (!study || study.status !== "published") return <NotFound />;

  return <PublishedCaseStudy study={study} />;
}

function PublishedCaseStudy({ study }) {
  useDocumentMeta({ title: study.title, description: study.summary });

  return (
    <div className="site-shell">
      <NavBar />
      <main className="case-study">
        <article className="case-study-inner">
          <Link to="/#projects" className="case-study-back">
            ← All projects
          </Link>

          <header className="case-study-header">
            <p className="eyebrow">Case study</p>

            <h1 className="case-study-title">{study.title}</h1>

            <p className="case-study-summary">{study.summary}</p>

            <dl className="case-study-facts">
              <div>
                <dt>Role</dt>

                <dd>{study.role}</dd>

              </div>

              <div>
                <dt>Timeframe</dt>

                <dd>{study.timeframe}</dd>

              </div>

              <div>
                <dt>Stack</dt>

                <dd>{study.stack.join(" · ")}</dd>

              </div>

            </dl>

          </header>

          <Section title="The problem">
            <p>{study.problem}</p>

          </Section>

          {study.constraints?.length > 0 && (
            <Section title="Constraints">
              <ul className="case-study-list">
                {study.constraints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

            </Section>
          )}

          {study.decisions?.length > 0 && (
            <Section title="Key decisions">
              <div className="case-study-decisions">
                {study.decisions.map((decision) => (
                  <div key={decision.choice} className="case-study-decision">
                    <h3>{decision.choice}</h3>

                    <p>
                      <strong>Why:</strong> {decision.why}

                    </p>

                    <p className="case-study-tradeoff">
                      <strong>Tradeoff:</strong> {decision.tradeoff}

                    </p>

                  </div>
                ))}
              </div>

            </Section>
          )}

          <Section title="Architecture">
            <p>{study.architecture}</p>

          </Section>

          {study.outcomes?.length > 0 && (
            <Section title="Outcomes">
              <ul className="case-study-list">
                {study.outcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

            </Section>
          )}

          {study.lessons?.length > 0 && (
            <Section title="What I'd do differently">
              <ul className="case-study-list">
                {study.lessons.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

            </Section>
          )}

          <footer className="case-study-footer">
            <Link to="/#contact" className="hero-btn">
              Discuss this work
            </Link>

          </footer>

        </article>

      </main>

      <BackToTop />
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="case-study-section">
      <h2 className="case-study-section-title">{title}</h2>

      {children}
    </section>
  );
}
