const skillAreas = [
  {
    title: "Cloud & DevOps Engineering",
    description:
      "Terraform-free experiments built with Kubernetes, Docker, and GitHub Actions. I focus on observability, cost-aware architectures, and tightening feedback loops.",
    stack: ["Kubernetes", "Docker", "GitHub Actions", "CI/CD", "Monitoring"],
  },
  {
    title: "Full-Stack Product Builds",
    description:
      "React (web + native) on the front, Node.js/Express services on the back, and Postgres or MongoDB for data. I like owning UX and DX end-to-end.",
    stack: ["React", "Node.js", "Express", "PostgreSQL", "MongoDB"],
  },
  {
    title: "API & Systems Design",
    description:
      "Designing modular REST APIs, documenting with Swagger, and layering authentication, caching, and rate limiting so that services are reliable at launch.",
    stack: ["REST", "Swagger", "Auth", "Caching", "Testing"],
  },
  {
    title: "Developer Enablement",
    description:
      "I author setup docs, automate repetitive scripts, and create onboarding guides so collaborators can deploy or ship in minutes instead of hours.",
    stack: ["Docs", "CLI automation", "Playbooks", "Storytelling"],
  },
];

const SkillHighlights = () => {
  return (
    <section className="section-shell" id="skills">
      <div className="section-header">
        <p className="eyebrow">Capabilities</p>
        <h2 className="section-title">Skills</h2>
        <p className="section-blurb">
          Borrowing the modular feel of Felipe Cordero&apos;s skills grid, this section surfaces the areas where I deliver the most value today.
        </p>
      </div>

      <div className="skill-grid">
        {skillAreas.map((area) => (
          <article key={area.title} className="skill-card">
            <h3 className="skill-title">{area.title}</h3>
            <p className="text-neutral-300 leading-relaxed">{area.description}</p>
            <div className="skill-pill-container">
              {area.stack.map((item) => (
                <span key={item} className="skill-pill">
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default SkillHighlights;
