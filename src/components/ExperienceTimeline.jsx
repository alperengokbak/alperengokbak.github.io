const milestones = [
  {
    period: "01/2026 - Present",
    title: "DevOps Engineer",
    location: "P3 Group · Germany",
    summary:
      "Owning enterprise cloud architecture and driving Azure Bicep, Terraform, and Kubernetes-based delivery on Azure DevOps.",
    highlights: [
      "Maintaining architectural ownership for enterprise customers, ensuring 100% service continuity following organisational transition and contributing ~15-20% operational improvements through targeted architectural reviews.",
      "Designing and implementing modular Azure Bicep infrastructure and managing Terraform-based IaC deployments, automating multi-stage CI/CD pipelines on Azure DevOps through reusable pipeline templates across multiple environments.",
      "Designing a multi-stage Docker image build strategy for a Java 21 Spring Boot multi-module Maven application and a Helm chart structure for independent microservices deployments on a Kubernetes cluster.",
      "Coordinating inbound and outbound network traffic architecture, managing IP address whitelisting with the client to enable secure real-time price feed data stream access.",
    ],
  },
  {
    period: "04/2025 - 01/2026",
    title: "Cloud Engineer",
    location: "ConStraight – Die CloudExperten · Germany",
    summary:
      "Leading Terraform-driven Azure provisioning and ongoing application support to keep enterprise cloud operations secure and compliant.",
    highlights: [
      "Leading a Terraform team to automate Azure infrastructure provisioning, establishing reusable modules and standardised deployment pipelines to improve reliability and reduce manual effort.",
      "Provisioning and managing Azure infrastructure including Virtual Machines, Storage Accounts, Azure Files, Key Vault, and Azure Data Lake, ensuring secure and compliant cloud operations.",
      "Executing server change requests including disk operations and vertical scaling, maintaining service continuity and minimising downtime.",
      "Providing ongoing application support, troubleshooting and resolving infrastructure-related issues to meet agreed service levels.",
    ],
  },
  {
    period: "09/2024 - 04/2025",
    title: "Solutions Architect",
    location: "ConStraight – Die CloudExperten · Germany",
    summary:
      "Designing end-to-end Azure and AWS architectures and producing HLD/LLD packages for enterprise customers.",
    highlights: [
      "Designed and delivered end-to-end DNS migration architecture from on-premises infrastructure to AWS, utilising EC2, NAT Gateway, BGP, and Route53 to ensure zero-downtime transition and improved scalability.",
      "Automated end-to-end infrastructure deployment for enterprise customers using Terraform and Azure DevOps, ensuring reliability, scalability, and compliance.",
      "Produced formal High-Level Design (HLD) and Low-Level Design (LLD) architecture documents, providing a clear technical blueprint for implementation and stakeholder alignment.",
      "Collaborated cross-functionally with engineering and business stakeholders to ensure security, availability, and automation best practices across Azure and AWS environments.",
    ],
  },
  {
    period: "06/2024 - 09/2024",
    title: "Information Technology Consultant",
    location: "ConStraight – Die CloudExperten · Germany",
    summary:
      "Delivering Microsoft modern workplace and identity services for enterprise end users.",
    highlights: [
      "Delivered Microsoft Intune, Windows 365 Cloud PC, Azure Active Directory, and Entra ID services for enterprise end users, managing device enrolment, identity management, and conditional access policies.",
    ],
  },
  {
    period: "07/2023 - 12/2023",
    title: "Full-Stack Web Developer",
    location: "Univenn · Izmir, Turkey",
    summary:
      "Built customer-facing Node.js and React applications while collaborating across front-end and back-end squads in an Agile environment.",
    highlights: [
      "Developed 3+ full-stack applications using Node.js and React, improving performance by 40%.",
      "Worked cross-functionally with front-end and back-end teams in an Agile environment, optimising data flow and improving system performance by 30%, reducing latency.",
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
          A career progression from Full-Stack development into DevOps, Cloud, and Solutions Architect roles — designing and delivering Azure, AWS, Terraform, and Kubernetes platforms for enterprise customers.
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
