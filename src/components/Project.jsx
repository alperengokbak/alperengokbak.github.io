import React, { useState } from "react";
import ImageModal from "./ImageModal";

export default function Project({ twitter_frontend, BookingHotelSs, PrescriptionManagement, SwaggerUi, kubernetesImg }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (imgSrc) => {
    setSelectedImage(imgSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const projects = [
    {
      title: "Booking Hotel",
      timeframe: "React · Node · Mongo",
      imgSrc: BookingHotelSs,
      description:
        "Full-stack reservation experience with JWT auth, dynamic availability search, and Stripe-ready checkout. Currently demo-only due to DB plan limits.",
      badges: ["React", "Express", "MongoDB"],
      videoLink: "https://www.youtube.com/watch?v=SRnzqtjv-tE",
      link: "https://booking-hotel-sntf.onrender.com/",
      accent: "rgba(248, 113, 113, 0.35)",
    },
    {
      title: "Prescription Management",
      timeframe: "Next.js · Node",
      imgSrc: PrescriptionManagement,
      description:
        "Clinician dashboard for tracking prescriptions, refills, and approvals with audit logging. Demo video available while hosted DB is paused.",
      badges: ["Next.js", "Express", "PostgreSQL"],
      videoLink: "https://www.youtube.com/watch?v=ZMvQaYzIY6w",
      link: "https://prescription-frontend.onrender.com/",
      accent: "rgba(251, 191, 36, 0.35)",
    },
    {
      title: "Airline Management System",
      timeframe: "Node · Swagger",
      imgSrc: SwaggerUi,
      description:
        "RESTful API for bookings, cancellations, and fleet metadata secured with JWT. Includes full Swagger docs and Postman collections for onboarding teams fast.",
      badges: ["Node.js", "Express", "Swagger"],
      link: "https://github.com/alperengokbak/Airline-Management-System",
      accent: "rgba(94, 234, 212, 0.25)",
    },
    {
      title: "Twitter Clone",
      timeframe: "Internship Challenge",
      imgSrc: twitter_frontend,
      description:
        "Feature-complete React client mirroring Twitter timelines, likes, and composer flows paired with a Node/PG backend for real-time updates.",
      badges: ["React", "Tailwind", "Node"],
      link: "https://github.com/alperengokbak/TwitterFrontend",
      accent: "rgba(59, 130, 246, 0.35)",
    },
    {
      title: "Twitter Clone API",
      timeframe: "Express · PostgreSQL",
      imgSrc: twitter_frontend,
      description:
        "Backend powering the clone: RESTful services, auth flows, and feed fan-out with Prisma migrations and deployment scripts.",
      badges: ["Express", "PostgreSQL", "Prisma"],
      link: "https://github.com/alperengokbak/TwitterBackend",
      accent: "rgba(14, 165, 233, 0.35)",
    },
    {
      title: "Automated Cloud Infrastructure with Terraform & AWS",
      timeframe: "11/2024 - 12/2024",
      imgSrc: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1600&q=80",
      description:
        "Terraform blueprints that spin up VPC, ALB, EC2, RDS, and S3 with IAM guardrails, plus GitHub Actions lint/plan gates cutting release toil in half.",
      badges: ["Terraform", "AWS", "GitHub Actions"],
      link: "https://github.com/alperengokbak?tab=repositories",
      accent: "rgba(16, 185, 129, 0.35)",
    },
    {
      title: "Azure DevOps Terraform Platform",
      timeframe: "06/2025 - 08/2025",
      imgSrc: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
      description:
        "Azure DevOps pipelines provisioning VNets, subnets, AKS, and storage accounts with policy compliance, drift detection, and auto-approvals.",
      badges: ["Azure DevOps", "Terraform", "AKS"],
      link: "https://dev.azure.com/alperengokbak",
      accent: "rgba(99, 102, 241, 0.35)",
    },
    {
      title: "Multi-node Kubernetes Cluster",
      timeframe: "01/2025 - Present",
      imgSrc: kubernetesImg ?? SwaggerUi,
      description:
        "Three-node kubeadm lab with HA control plane, Argo CD GitOps flow, Prometheus/Grafana stack, and chaos testing scripts.",
      badges: ["Kubernetes", "kubeadm", "Argo CD"],
      link: "https://github.com/alperengokbak/k8s-lab",
      accent: "rgba(96, 165, 250, 0.35)",
    },
  ];

  return (
    <section className="section-shell" id="projects">
      <div className="section-header">
        <p className="eyebrow">Builds</p>
        <h2 className="section-title">Projects</h2>
        <p className="section-blurb">
          Selected launches where I owned architecture, automation, or product polish. Each card links to repos, demos, or case studies.
        </p>
      </div>

      <div className="project-card-grid">
        {projects.map((project) => (
          <article key={project.title} className="project-card" style={{ "--project-accent": project.accent }}>
            <div className="project-card-media" onClick={() => openModal(project.imgSrc)}>
              <img src={project.imgSrc} alt={project.title} loading="lazy" />
              {project.timeframe && <span className="project-card-pill">{project.timeframe}</span>}
            </div>
            <div className="project-card-body">
              <h3 className="project-card-title">{project.title}</h3>
              <p className="project-card-summary">{project.description}</p>
              <div className="project-card-tags">
                {project.badges?.map((badge) => (
                  <span key={`${project.title}-${badge}`}>{badge}</span>
                ))}
              </div>
              <div className="project-card-actions">
                {project.videoLink && (
                  <a href={project.videoLink} target="_blank" rel="noreferrer" className="project-card-action project-card-action-secondary">
                    Watch demo
                  </a>
                )}
                <a href={project.link} target="_blank" rel="noreferrer" className="project-card-action">
                  View project
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <ImageModal isOpen={isModalOpen} onClose={closeModal} imgSrc={selectedImage} />
    </section>
  );
}
