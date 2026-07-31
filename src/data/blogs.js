import { generatedPosts } from "./blogs.generated.js";

const HIDDEN = ["java-collection-framework", "creating-custom-typography-themes-in-material-ui"];

const TOPIC_ACCENT = {
  Containers: "teal",
  Azure: "azure",
  Kubernetes: "indigo",
  Security: "rose",
  Python: "gold",
  DevOps: "orange",
};

export const accentFor = (topic) => `var(--topic-${TOPIC_ACCENT[topic] ?? "neutral"})`;

const CURATION = [
  { match: "writing-secure-and-efficient-dockerfiles", topic: "Containers" },
  { match: "how-to-provision-a-windows-365-cloud-pc", topic: "Azure" },
  { match: "how-i-converted-a-windows-iso", topic: "Azure" },
  { match: "building-a-secure-wireguard-vpn-server", topic: "Security" },
  { match: "creating-multi-node-kubernetes-cluster", topic: "Kubernetes" },
  { match: "what-is-dockerize-and-dockerize-your-project", topic: "DevOps" },
  { match: "demystifying-args-and-kwargs-in-python", topic: "Python" },
];

const TOPIC_KEYWORDS = {
  Kubernetes: ["kubernetes", "kubeadm", "helm", "argo"],
  Containers: ["container", "docker", "dockerize", "podman"],
  Azure: ["azure", "intune", "microsoft", "windows 365", "bicep", "entra"],
  Security: ["security", "vpn", "wireguard", "tls", "firewall"],
  Python: ["python"],
  DevOps: ["ci cd", "cicd", "devops", "pipeline", "terraform", "ansible"],
};

const curationFor = (slug) => CURATION.find((entry) => slug.includes(entry.match));

export const topicFromTags = (tags) => {
  const haystack = tags.map((tag) => tag.toLowerCase());
  const match = Object.entries(TOPIC_KEYWORDS).find(([, keywords]) =>
    keywords.some((keyword) => haystack.some((tag) => tag.includes(keyword)))
  );
  return match?.[0] ?? "Writing";
};

export const posts = generatedPosts
  .filter((post) => !HIDDEN.some((slug) => post.slug.includes(slug)))
  .map((post) => {
    const topic = curationFor(post.slug)?.topic ?? topicFromTags(post.tags);
    return { ...post, topic, accent: accentFor(topic) };
  });
