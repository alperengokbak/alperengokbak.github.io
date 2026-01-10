const facts = [
  {
    title: "Current Focus",
    detail: "Cloud-native solution design & DevOps",
    meta: "Designing resilient architectures that bridge software and infrastructure.",
  },
  {
    title: "Education",
    detail: "B.Sc. Software Engineering @ Yasar University",
    meta: "Senior-year student blending academic research with applied product builds.",
  },
  {
    title: "Product Experience",
    detail: "Node.js + React across web & mobile",
    meta: "Hands-on delivery during my Univenn internship and personal launches.",
  },
  {
    title: "Toolbox",
    detail: "JavaScript • Java • Python • SQL/NoSQL",
    meta: "Comfortable moving between backend services, APIs, and data layers.",
  },
  {
    title: "Languages",
    detail: "English • Turkish",
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
          Highlights that shape how I learn, collaborate, and build products. Inspired by Felipe Cordero&apos;s clean, story-first
          layout, but tailored to my journey.
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
