import { generatedPosts } from "./blogs.generated.js";

/**
 * The post list itself is generated from the Medium RSS feed by
 * `node scripts/sync-blogs.mjs`. This file owns the editorial decisions on top of it:
 * which posts to feature, what to call the topic, and the card accent colour.
 *
 * New posts appear automatically with a default topic. Add an entry here to give one a
 * proper label and colour, or add its slug to HIDDEN to keep it off the page.
 */

/** Slug fragments to keep off the site — older posts outside the current focus. */
const HIDDEN = ["java-collection-framework", "creating-custom-typography-themes-in-material-ui"];

/**
 * Topic -> category bucket. Buckets are the same three the projects grid uses, so a
 * "Cloud" post and a "Cloud" project share a hue and colour carries one consistent
 * meaning across the whole site. See --cat-* in styles/theme.css.
 */
const TOPIC_CATEGORY = {
  Containers: "cloud",
  Kubernetes: "cloud",
  Azure: "cloud",
  Security: "fullstack",
  Python: "fullstack",
  DevOps: "devops",
};

const accentFor = (topic) => `var(--cat-${TOPIC_CATEGORY[topic] ?? "neutral"})`;

/** Display overrides keyed by a distinctive fragment of the post slug. */
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

/** Title-cases the first RSS category as a fallback topic label for uncurated posts. */
const topicFromTags = (tags) =>
  tags[0] ? tags[0].replace(/\b\w/g, (c) => c.toUpperCase()) : "Writing";

export const posts = generatedPosts
  .filter((post) => !HIDDEN.some((slug) => post.slug.includes(slug)))
  .map((post) => {
    const topic = curationFor(post.slug)?.topic ?? topicFromTags(post.tags);
    return { ...post, topic, accent: accentFor(topic) };
  });
