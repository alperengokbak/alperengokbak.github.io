const stackSections = [
  {
    title: "Cloud & Platforms",
    rows: [
      [
        { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
        { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      ],
      [
        { name: "Cloudflare", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg" },
        { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
      ],
      [
        { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
      ],
    ],
  },
  {
    title: "Automation & IaC",
    rows: [
      [
        { name: "Terraform", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
        { name: "Helm", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/helm/helm-original.svg" },
      ],
      [
        { name: "Azure DevOps", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuredevops/azuredevops-plain.svg" },
        { name: "GitHub Actions", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      ],
      [
        { name: "Grafana", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg" },
        { name: "Prometheus", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg" },
      ],
    ],
  },
  {
    title: "Languages & Frameworks",
    rows: [
      [
        { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      ],
      [
        { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      ],
      [
        { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      ],
    ],
  },
  {
    title: "Data & Messaging",
    rows: [
      [
        { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
        { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      ],
      [
        { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
        { name: "Kafka", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg" },
      ],
      [
        { name: "RabbitMQ", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rabbitmq/rabbitmq-original.svg" },
        { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
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
          Core cloud, automation, and application tools I lean on when designing infrastructure, observability, and product experiences end to end.
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
