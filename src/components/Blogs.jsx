const featuredImages = {
  wireguard: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1200&q=80",
  cloudPc: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  dockerSecurity: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1200&q=80",
};

export default function Blogs({ DockerMedium, kubernetes }) {
  const posts = [
    {
      title: "What Is Dockerize And Dockerize Your Project",
      date: "25 Dec 2021",
      href: "https://medium.com/@alperengokbak/what-is-dockerize-and-dockerize-your-project-a-step-by-step-guide-899c48a34df6",
      summary:
        "A fundamentals-first primer on packaging a Flask API into a portable Docker image, complete with CLI commands and troubleshooting tips.",
      tags: ["Docker", "Containerization", "CI/CD"],
      image: DockerMedium,
      topic: "DevOps",
      accent: "rgba(251, 146, 60, 0.35)",
    },
    {
      title: "Building a Secure WireGuard VPN Server on Windows for Remote Access from macOS",
      date: "28 May 2024",
      href: "https://medium.com/@alperengokbak/building-a-secure-wireguard-vpn-server-on-windows-for-remote-access-from-macos-79ce0adf4da2",
      summary:
        "Step-by-step guide to running WireGuard on Windows, sharing tunnel profiles with macOS clients, and hardening ingress with firewall policies.",
      tags: ["WireGuard", "VPN", "Security"],
      image: featuredImages.wireguard,
      topic: "Security",
      accent: "rgba(14, 165, 233, 0.35)",
    },
    {
      title: "How to Provision a Windows 365 Cloud PC",
      date: "15 Jul 2024",
      href: "https://medium.com/@alperengokbak/how-to-provision-a-windows-365-cloud-pc-8d0db8e75560",
      summary:
        "Licensing, network prerequisites, and deployment checklist for rolling out Microsoft's Cloud PC experience in a secure tenant.",
      tags: ["Windows 365", "Azure AD", "Endpoints"],
      image: featuredImages.cloudPc,
      topic: "Azure",
      accent: "rgba(59, 130, 246, 0.35)",
    },
    {
      title: "Writing Secure and Efficient Dockerfiles",
      date: "03 Sep 2024",
      href: "https://medium.com/@alperengokbak/writing-secure-and-efficient-dockerfiles-7c16f164ffff",
      summary:
        "Multi-stage builds, least-privilege users, image scanning, and caching tactics for production-ready container images.",
      tags: ["Docker", "Best Practices", "AppSec"],
      image: featuredImages.dockerSecurity,
      topic: "Containers",
      accent: "rgba(236, 72, 153, 0.35)",
    },
    {
      title: "Creating multi-node Kubernetes Cluster by using Kubeadm tool",
      date: "18 Mar 2025",
      href: "https://alperengokbak.medium.com/creating-multi-node-kubernetes-cluster-by-using-kubeadm-tool-53af0faf27a4",
      summary:
        "Hands-on walkthrough of kubeadm, from bootstrapping the control plane to joining workers and validating workloads.",
      tags: ["Kubernetes", "Kubeadm", "Multipass"],
      image: kubernetes,
      topic: "Kubernetes",
      accent: "rgba(34, 197, 94, 0.35)",
    },
  ];

  return (
    <section className="section-shell" id="blogs">
      <div className="section-header">
        <p className="eyebrow">Writing</p>
        <h2 className="section-title">Blogs</h2>
        <p className="section-blurb">
          Opinionated notes on cloud automation, secure access, and container craft. Each post ships with steps you can replicate.
        </p>
      </div>

      <div className="blog-card-grid">
        {posts.map((post) => (
          <a
            key={post.title}
            href={post.href}
            target="_blank"
            rel="noreferrer"
            className="blog-card"
            style={{ "--card-accent": post.accent }}
          >
            <div className="blog-card-media">
              <img src={post.image} alt={post.title} loading="lazy" />
              <span className="blog-card-pill">{post.topic}</span>
            </div>
            <div className="blog-card-body">
              <p className="blog-card-date">{post.date}</p>
              <h3 className="blog-card-title">{post.title}</h3>
              <p className="blog-card-summary">{post.summary}</p>
              <div className="blog-card-tags">
                {post.tags.map((tag) => (
                  <span key={`${post.title}-${tag}`}>{tag}</span>
                ))}
              </div>
              <span className="blog-card-link">Read story ↗</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
