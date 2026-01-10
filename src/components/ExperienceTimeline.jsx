const milestones = [
  {
    period: "06/2024 - Present",
    title: "Solution Architect",
    location: "ConStraight · Osnabrück, Germany",
    summary:
      "Architecting secure, automated cloud foundations for enterprise customers while driving Terraform- and Azure DevOps-first delivery.",
    highlights: [
      "Automated end-to-end infrastructure deployments with Terraform and Azure DevOps to ensure reliability, scalability, and compliance.",
      "Designed Azure DevOps pipelines for IaC provisioning that cut infrastructure rollout time by 50%.",
      "Led DNS migration and AWS infrastructure engagements that improved deployment speed by 40%.",
      "Documented HLD/LLD packages for multiple enterprise cloud architectures and aligned stakeholder expectations.",
      "Partnered with security, platform, and product teams to enforce availability and automation best practices across Azure and AWS.",
      "Established Cloudflare Tunnels to expose self-hosted services securely without opening public ingress.",
    ],
  },
  {
    period: "07/2023 - 12/2023",
    title: "FullStack Web Developer",
    location: "Univenn · Izmir, Turkey",
    summary: "Built and optimized customer-facing products across the full stack while collaborating with cross-functional squads.",
    highlights: [
      "Shipped 3+ full-stack Node.js and React applications that boosted performance by 40%.",
      "Coordinated with front-end and back-end teams to streamline data flow, improving system performance by 30% and lowering latency.",
      "Delivered and tuned 10+ features that enhanced UX and reduced overall load times.",
    ],
  },
];

const ExperienceTimeline = () => {
  return (
    <section className="section-shell" id="experience">
      <div className="section-header">
        <p className="eyebrow">Journey</p>
        <h2 className="section-title">Work Experiences</h2>
        <p className="section-blurb">
          Highlights from recent Solution Architect and FullStack roles where I delivered resilient infrastructure, automation, and product features across Azure and AWS.
        </p>
      </div>

      <div className="timeline">
        {milestones.map((item) => (
          <article key={item.title} className="timeline-item">
            <div className="timeline-node" aria-hidden="true" />
            <div className="timeline-body">
              <div className="flex flex-col gap-1 text-left">
                <div className="text-sm font-semibold text-accent-soft/90 tracking-[0.3em] uppercase">{item.period}</div>
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-meta">{item.location}</p>
              </div>
              <p className="mt-4 text-left text-neutral-300 leading-relaxed">{item.summary}</p>
              <ul className="timeline-list">
                {item.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ExperienceTimeline;
