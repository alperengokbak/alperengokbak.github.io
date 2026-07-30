export const caseStudies = [
  {
    slug: "azure-devops-terraform",
    projectTitle: "Azure DevOps Terraform Platform",
    status: "draft",

    title: "Azure DevOps Terraform Platform",
    summary:
      "TODO: One paragraph a hiring manager could read on its own and understand what you built and why it mattered.",
    role: "TODO: e.g. Sole author of the pipeline templates and module library",
    timeframe: "06/2025 - 08/2025",
    stack: ["Azure DevOps", "Terraform", "AKS", "Azure Policy"],

    problem:
      "TODO: What was the situation before? What was slow, risky, manual, or non-compliant? " +
      "Concrete beats abstract — 'four environments drifted because each was provisioned by hand' " +
      "is worth more than 'infrastructure was inconsistent'.",

    constraints: [
      "TODO: A real limit you designed around — compliance regime, existing tooling, team size, budget, migration window.",
    ],

    decisions: [
      {
        choice: "TODO: A specific technical decision you made",
        why: "TODO: What made this the right call here",
        tradeoff: "TODO: What you gave up. Naming a real tradeoff is what makes a case study credible.",
      },
    ],

    architecture:
      "TODO: Describe the resulting design — the layers, what provisions what, how state and secrets " +
      "are handled, where the gates sit. If you have an HLD/LLD diagram you can share, reference it here.",

    outcomes: [
      "TODO: A measurable result you can defend in an interview.",
    ],

    lessons: [
      "TODO: Something you would do differently. Interviewers ask this, and having an answer ready is an advantage.",
    ],
  },

  {
    slug: "kubernetes-cluster",
    projectTitle: "Multi-node Kubernetes Cluster",
    status: "draft",

    title: "Multi-node Kubernetes Cluster",
    summary: "TODO: One paragraph on what this lab is and what it demonstrates.",
    role: "TODO",
    timeframe: "01/2025 - Present",
    stack: ["Kubernetes", "kubeadm", "Argo CD", "Prometheus", "Grafana"],

    problem:
      "TODO: What were you trying to learn or prove? A self-directed lab is still a case study if " +
      "you frame the goal — 'understand control-plane failure modes hands-on' is a real problem statement.",

    constraints: [
      "TODO: e.g. Ran on local hardware / Multipass VMs, so no cloud load balancer was available.",
    ],

    decisions: [
      {
        choice: "TODO: e.g. kubeadm rather than a managed distribution",
        why: "TODO",
        tradeoff: "TODO",
      },
    ],

    architecture: "TODO: Node layout, networking/CNI choice, GitOps flow, what the observability stack watches.",

    outcomes: [
      "TODO: What works today, and what you can now demonstrate live.",
    ],

    lessons: ["TODO"],
  },
];

export const caseStudyBySlug = (slug) => caseStudies.find((study) => study.slug === slug);

export const publishedCaseStudies = caseStudies.filter((study) => study.status === "published");

export const caseStudyForProject = (projectTitle) =>
  publishedCaseStudies.find((study) => study.projectTitle === projectTitle);
