const facts = [
  {
    title: "Current Role",
    detail: "DevOps Engineer @ P3 Group",
    meta: "Owning enterprise cloud architecture and driving Azure Bicep, Terraform, and Kubernetes-based delivery on Azure DevOps.",
  },
  {
    title: "Current Focus",
    detail: "Infrastructure as Code & enterprise architecture",
    meta: "Designing modular Azure environments at enterprise scale and automating multi-stage CI/CD delivery.",
  },
  {
    title: "Education",
    detail: "B.Sc. Software Engineering @ Yasar University (08/2021 – 07/2024)",
    meta: "Capstone: HearingMate, an AI-powered mobile app classifying ambient sounds for hearing-impaired users.",
  },
  {
    title: "Product Experience",
    detail: "Node.js + React across web & mobile",
    meta: "Hands-on delivery during my Univenn internship and personal launches.",
  },
  {
    title: "Languages",
    detail: "Turkish (Native) • English (B2 CEFR)",
    meta: "Daily collaboration with German and international teams in Agile delivery environments.",
  },
  {
    title: "Outside of Code",
    detail: "Basketball, mountain hikes, global travel",
    meta: "I recharge by being outdoors and connecting with new cultures.",
  },
];

const QuickFacts = () => {
  return (
    <section className="section-shell" id="snapshot">
      <div className="section-header">
        <p className="eyebrow">Snapshot</p>
        <h2 className="section-title">Quick Facts</h2>
        <p className="section-blurb">
          Key details that shape how I learn, collaborate, and build products — tailored to my journey as a cloud and software engineer.
        </p>
      </div>

      <div className="quick-facts-grid">
        {facts.map((fact) => (
          <article key={fact.title} className="quick-fact-card">
            <p className="quick-fact-title">{fact.title}</p>
            <p className="quick-fact-body">{fact.detail}</p>
            <p className="quick-fact-meta">{fact.meta}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default QuickFacts;
