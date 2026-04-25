const stackSections = [
  {
    title: "Cloud & Infrastructure",
    rows: [
      [
        { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
        { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      ],
      [
        { name: "Terraform", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
        { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
      ],
      [
        { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
      ],
    ],
  },
  {
    title: "DevOps & CI/CD",
    rows: [
      [
        { name: "Azure DevOps", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuredevops/azuredevops-plain.svg" },
        { name: "GitHub Actions", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      ],
      [
        { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      ],
    ],
  },
  {
    title: "Development",
    rows: [
      [
        { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      ],
      [
        { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      ],
    ],
  },
];

const TechStack = () => {
  return (
    <section className="section-shell" id="tech">
      <div className="section-header">
        <p className="eyebrow">Toolbelt</p>
        <h2 className="section-title">Tech Stack</h2>
        <p className="section-blurb">
          The day-to-day toolbelt behind my cloud, automation, and development work — Azure and AWS platforms, Terraform and Kubernetes for delivery, and Python/JavaScript for the glue.
        </p>
      </div>

      <div className="tech-stack-grid">
        {stackSections.map((section) => (
          <article key={section.title} className="tech-stack-card">
            <h3 className="tech-stack-title">{section.title}</h3>
            <div className="tech-icon-grid">
              {section.rows.map((row, rowIndex) => (
                <div key={`${section.title}-row-${rowIndex}`} className="tech-icon-row">
                  {row.map((item) => (
                    <div key={item.name} className="tech-icon-chip">
                      <img src={item.icon} alt={`${item.name} logo`} loading="lazy" />
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
