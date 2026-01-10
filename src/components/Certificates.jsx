const certificates = [
  {
    title: "Microsoft Certified: Azure Administrator Associate",
    issuer: "Microsoft",
    issued: "2024",
    credentialId: "84349A265A564080",
    link: "https://learn.microsoft.com/api/credentials/share/en-us/AlperenGkbak-8544/84349A265A564080?sharingId=B7456D1AEE0694F0",
  },
  {
    title: "Microsoft Certified: Azure Fundamentals (AZ-900)",
    issuer: "Microsoft",
    issued: "2024",
    credentialId: "BF51F0CD9A432C34",
    link: "https://learn.microsoft.com/api/credentials/share/en-us/AlperenGkbak-8544/BF51F0CD9A432C34?sharingId=B7456D1AEE0694F0",
  },
  {
    title: "Becoming an Ethical Hacker: Cyber Security",
    issuer: "Udemy",
    issued: "2024",
    credentialId: "UC-7d9e782d-387b-42fc-9e80-212b833985af",
    link: "https://www.udemy.com/certificate/UC-7d9e782d-387b-42fc-9e80-212b833985af/",
  },
];

const Certificates = () => {
  return (
    <section className="section-shell" id="certificates">
      <div className="section-header">
        <p className="eyebrow">Validation</p>
        <h2 className="section-title">Certificates</h2>
        <p className="section-blurb">
          External proof-points from Microsoft and Udemy that reinforce my day-to-day architecture, automation, and security work.
        </p>
      </div>

      <div className="certificate-grid">
        {certificates.map((certificate) => (
          <article key={certificate.title} className="certificate-card">
            <div>
              <h3 className="certificate-title">{certificate.title}</h3>
              <p className="certificate-issuer">{certificate.issuer}</p>
              <p className="certificate-meta">
                Issued {certificate.issued}
                {certificate.credentialId ? ` · ID ${certificate.credentialId}` : null}
              </p>
            </div>
            {certificate.link ? (
              <a className="certificate-link" href={certificate.link} target="_blank" rel="noreferrer">
                View credential ↗
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
};

export default Certificates;
