const certificates = [
  {
    title: "Microsoft Certified: Azure Solutions Architect Expert",
    issuer: "Microsoft",
    issued: "01/2026",
    credentialId: "9BFDE9A43DE6CFE",
    badge: "https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-expert-badge.svg",
    link: "https://learn.microsoft.com/api/credentials/share/en-us/AlperenGkbak-8544/9BFDE9A43DE6CFE?sharingId=B7456D1AEE0694F0",
  },
  {
    title: "Microsoft Certified: Azure Administrator Associate",
    issuer: "Microsoft",
    issued: "08/2025",
    credentialId: "84349A265A564080",
    badge: "https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-associate-badge.svg",
    link: "https://learn.microsoft.com/api/credentials/share/en-us/AlperenGkbak-8544/84349A265A564080?sharingId=B7456D1AEE0694F0",
  },
  {
    title: "Introduction to Kubernetes (LFS158)",
    issuer: "The Linux Foundation",
    issued: "06/2025",
    badge: "https://cdn.simpleicons.org/linuxfoundation/ffffff",
    link: "https://ti-user-certificates.s3.amazonaws.com/e0df7fbf-a057-42af-8a1f-590912be5460/a20d1a07-e5ee-4bca-957f-1f601d54cc83-alperen-gkbak-15bea80e-8da3-4fc9-a3f0-ff6aed428df0-certificate.pdf",
  },
  {
    title: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    issued: "08/2024",
    credentialId: "BF51F0CD9A432C34",
    badge: "https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-fundamentals-badge.svg",
    link: "https://learn.microsoft.com/api/credentials/share/en-us/AlperenGkbak-8544/BF51F0CD9A432C34?sharingId=B7456D1AEE0694F0",
  },
  {
    title: "Becoming an Ethical Hacker: Cyber Security",
    issuer: "Udemy",
    issued: "2022",
    credentialId: "UC-7d9e782d-387b-42fc-9e80-212b833985af",
    badge: "https://cdn.simpleicons.org/udemy/a435f0",
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
          External proof-points from Microsoft, The Linux Foundation, and Udemy that reinforce my day-to-day architecture, automation, and security work.
        </p>
      </div>

      <div className="certificate-grid">
        {certificates.map((certificate) => (
          <article key={certificate.title} className="certificate-card">
            <div className="certificate-card-row">
              {certificate.badge ? (
                <img className="certificate-badge" src={certificate.badge} alt={`${certificate.issuer} badge`} loading="lazy" />
              ) : null}
              <div className="certificate-card-text">
                <h3 className="certificate-title">{certificate.title}</h3>
                <p className="certificate-issuer">{certificate.issuer}</p>
                <p className="certificate-meta">
                  Issued {certificate.issued}
                  {certificate.credentialId ? ` · ID ${certificate.credentialId}` : null}
                </p>
              </div>
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
