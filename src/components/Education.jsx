import yasarLogo from "../assets/company-logos/yasar_university_logo.webp";

const education = [
  {
    period: "08/2021 - 07/2024",
    title: "Bachelor of Science in Software Engineering",
    location: "Yasar University · Izmir, Turkey",
    logo: yasarLogo,
    summary:
      "Software engineering fundamentals with a research-flavoured capstone in applied AI on mobile and cloud.",
    highlights: [
      "Graduation project: Developed an AI-powered mobile application (HearingMate) with a dual-backend architecture and a cloud-hosted AI engine classifying ambient sounds for hearing-impaired users.",
      "Implemented a voice recognition model using supervised learning to detect distress signals and trigger real-time alerts.",
      "Key Modules: Computer Architecture, Software Architecture.",
    ],
  },
];

const Education = () => {
  return (
    <section className="section-shell" id="education">
      <div className="section-header">
        <p className="eyebrow">Foundation</p>
        <h2 className="section-title">Education</h2>
        <p className="section-blurb">
          Where the engineering fundamentals were built — from systems and architecture coursework to a cloud-AI capstone.
        </p>
      </div>

      <div className="timeline">
        {education.map((item) => (
          <article key={item.title} className="timeline-item">
            <div className="timeline-node" aria-hidden="true" />
            <div className="timeline-body">
              <div className="timeline-header">
                {item.logo ? (
                  <img className="timeline-logo" src={item.logo} alt={`${item.location} logo`} loading="lazy" />
                ) : null}
                <div className="flex flex-col gap-1 text-left">
                  <div className="text-sm font-semibold text-accent-soft/90 tracking-[0.3em] uppercase">{item.period}</div>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-meta">{item.location}</p>
                </div>
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

export default Education;
