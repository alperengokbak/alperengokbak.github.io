import BookingHotelSs from "../assets/BookingHotelSs.webp";
import PrescriptionManagement from "../assets/PrescriptionManagement.webp";
import SwaggerUi from "../assets/Swagger_ui.webp";
import twitterFrontend from "../assets/twitter_frontend.webp";
import kubernetesImg from "../assets/kubernetes.webp";
import terraformAwsCover from "../assets/project-covers/terraform-aws.svg";
import azureDevOpsTerraformCover from "../assets/project-covers/azure-devops-terraform.svg";

/**
 * Categories offered by the filter bar, in display order. `All` is prepended by the UI.
 *
 * Category is also what drives a card's accent colour — see --cat-* in styles/theme.css.
 * Cards previously carried a hand-picked rgba() each, which meant eight unrelated hues
 * that encoded nothing. Colour now means something.
 */
export const projectCategories = ["FullStack", "Cloud", "DevOps"];

// Content for the Projects section.
export const projects = [
  {
    title: "Booking Hotel",
    timeframe: "React · Node · Mongo",
    imgSrc: BookingHotelSs,
    description:
      "Full-stack reservation experience with JWT auth, dynamic availability search, and Stripe-ready checkout. Currently demo-only due to DB plan limits.",
    badges: ["React", "Express", "MongoDB"],
    videoLink: "https://www.youtube.com/watch?v=SRnzqtjv-tE",
    link: "https://booking-hotel-sntf.onrender.com/",
    category: "FullStack",
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
    category: "FullStack",
  },
  {
    title: "Airline Management System",
    timeframe: "Node · Swagger",
    imgSrc: SwaggerUi,
    description:
      "RESTful API for bookings, cancellations, and fleet metadata secured with JWT. Includes full Swagger docs and Postman collections for onboarding teams fast.",
    badges: ["Node.js", "Express", "Swagger"],
    link: "https://github.com/alperengokbak/Airline-Management-System",
    category: "FullStack",
  },
  {
    title: "Twitter Clone",
    timeframe: "Internship Challenge",
    imgSrc: twitterFrontend,
    description:
      "Feature-complete React client mirroring Twitter timelines, likes, and composer flows paired with a Node/PG backend for real-time updates.",
    badges: ["React", "Tailwind", "Node"],
    link: "https://github.com/alperengokbak/TwitterFrontend",
    category: "FullStack",
  },
  {
    title: "Twitter Clone API",
    timeframe: "Express · PostgreSQL",
    imgSrc: twitterFrontend,
    description:
      "Backend powering the clone: RESTful services, auth flows, and feed fan-out with Prisma migrations and deployment scripts.",
    badges: ["Express", "PostgreSQL", "Prisma"],
    link: "https://github.com/alperengokbak/TwitterBackend",
    category: "FullStack",
  },
  {
    title: "Automated Cloud Infrastructure with Terraform & AWS",
    timeframe: "11/2024 - 12/2024",
    imgSrc: terraformAwsCover,
    description:
      "Terraform blueprints that spin up VPC, ALB, EC2, RDS, and S3 with IAM guardrails, plus GitHub Actions lint/plan gates cutting release toil in half.",
    badges: ["Terraform", "AWS", "GitHub Actions"],
    link: "https://github.com/alperengokbak?tab=repositories",
    category: "Cloud",
  },
  {
    title: "Azure DevOps Terraform Platform",
    timeframe: "06/2025 - 08/2025",
    imgSrc: azureDevOpsTerraformCover,
    description:
      "Azure DevOps pipelines provisioning VNets, subnets, AKS, and storage accounts with policy compliance, drift detection, and auto-approvals.",
    badges: ["Azure DevOps", "Terraform", "AKS"],
    link: "https://dev.azure.com/alperengokbak",
    category: "Cloud",
  },
  {
    title: "Multi-node Kubernetes Cluster",
    timeframe: "01/2025 - Present",
    imgSrc: kubernetesImg,
    description:
      "Three-node kubeadm lab with HA control plane, Argo CD GitOps flow, Prometheus/Grafana stack, and chaos testing scripts.",
    badges: ["Kubernetes", "kubeadm", "Argo CD"],
    link: "https://github.com/alperengokbak/k8s-lab",
    category: "DevOps",
  },
];
