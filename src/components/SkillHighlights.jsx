const skillAreas = [
  {
    title: "Cloud & Infrastructure",
    description:
      "Designing and operating production cloud platforms on Azure and AWS — provisioning Kubernetes clusters, container workloads, and Linux-based infrastructure for enterprise customers with Terraform and Azure Bicep.",
    stack: ["Microsoft Azure", "AWS", "Azure Bicep", "Terraform (IaC)", "Kubernetes", "Docker", "Linux"],
  },
  {
    title: "DevOps & CI/CD",
    description:
      "Automating multi-stage delivery pipelines on Azure DevOps and GitHub Actions with reusable templates, branching strategies, and policy gates that keep infrastructure rollouts reliable and repeatable.",
    stack: ["Azure DevOps", "GitHub Actions", "Git", "CI/CD Pipelines"],
  },
  {
    title: "Development",
    description:
      "Writing automation scripts, glue services, and the occasional full-stack feature — comfortable across server-side JavaScript and Python tooling.",
    stack: ["Python", "JavaScript", "Node.js"],
  },
  {
    title: "Professional",
    description:
      "Working in Agile delivery teams, owning stakeholder communication, and producing HLD/LLD design packages that align engineering and business outcomes.",
    stack: ["Agile", "Scrum", "Stakeholder Management", "Cross-functional Collaboration", "HLD/LLD Documentation"],
  },
];

const SkillHighlights = () => {
  return (
    <section className="section-shell" id="skills">
      <div className="section-header">
        <p className="eyebrow">Capabilities</p>
        <h2 className="section-title">Skills</h2>
        <p className="section-blurb">
          The four pillars I deliver across enterprise engagements: cloud and infrastructure design, DevOps automation, hands-on development, and professional collaboration.
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
