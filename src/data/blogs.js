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

const accentFor = (topic) => `var(--topic-${TOPIC_ACCENT[topic] ?? "neutral"})`;

const CURATION = [
  { match: "writing-secure-and-efficient-dockerfiles", topic: "Containers" },
  { match: "how-to-provision-a-windows-365-cloud-pc", topic: "Azure" },
  { match: "how-i-converted-a-windows-iso", topic: "Azure" },
  { match: "building-a-secure-wireguard-vpn-server", topic: "Security" },
  { match: "creating-multi-node-kubernetes-cluster", topic: "Kubernetes" },
  { match: "what-is-dockerize-and-dockerize-your-project", topic: "DevOps" },
  { match: "demystifying-args-and-kwargs-in-python", topic: "Python" },
];

const curationFor = (slug) => CURATION.find((entry) => slug.includes(entry.match));

const topicFromTags = (tags) =>
  tags[0] ? tags[0].replace(/\b\w/g, (c) => c.toUpperCase()) : "Writing";

export const posts = generatedPosts
  .filter((post) => !HIDDEN.some((slug) => post.slug.includes(slug)))
  .map((post) => {
    const topic = curationFor(post.slug)?.topic ?? topicFromTags(post.tags);
    return { ...post, topic, accent: accentFor(topic) };
  });
