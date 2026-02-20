const facts = [
  {
    title: "Current Role",
    detail: "Cloud Solution Architect @ P3",
    meta: "Designing enterprise cloud architectures and automating infrastructure delivery across Azure and AWS.",
  },
  {
    title: "Current Focus",
    detail: "Cloud-native solution design & DevOps",
    meta: "Designing resilient architectures that bridge software and infrastructure.",
  },
  {
    title: "Education",
    detail: "B.Sc. Software Engineering @ Yasar University (Graduated 2024)",
    meta: "Specialized in software engineering and algorithms; capstone on AI engineering.",
  },
  {
    title: "Product Experience",
    detail: "Node.js + React across web & mobile",
    meta: "Hands-on delivery during my Univenn internship and personal launches.",
  },
  {
    title: "Languages",
    detail: "English (Professional) • Turkish (Native)",
    meta: "Daily collaboration with international teams and communities.",
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
