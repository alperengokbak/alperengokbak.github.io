import { describe, expect, it } from "vitest";
import { accentFor, posts, topicFromTags } from "./blogs.js";
import { generatedPosts } from "./blogs.generated.js";

describe("blog curation", () => {
  it("keeps hidden posts off the site", () => {
    const slugs = posts.map((p) => p.slug);
    expect(slugs.some((s) => s.includes("java-collection-framework"))).toBe(false);
    expect(slugs.some((s) => s.includes("material-ui"))).toBe(false);
    expect(posts.length).toBeLessThan(generatedPosts.length);
  });

  it("gives every rendered post a topic and an accent", () => {
    expect(posts.length).toBeGreaterThan(0);
    for (const post of posts) {
      expect(post.topic).toBeTruthy();

      expect(post.accent).toMatch(/^var\(--topic-(teal|azure|indigo|rose|gold|orange|neutral)\)$/);
    }
  });

  it("applies curated labels where one is configured", () => {
    const k8s = posts.find((p) => p.slug.includes("creating-multi-node-kubernetes-cluster"));
    expect(k8s?.topic).toBe("Kubernetes");
  });

  it("gives every rendered post a capitalised, non-empty topic", () => {
    for (const post of posts) {
      expect(post.topic).not.toMatch(/^\s*$/);
      expect(post.topic[0]).toBe(post.topic[0].toUpperCase());
    }
  });

  describe("topicFromTags", () => {
    it("classifies from any tag position, not just the first", () => {
      expect(topicFromTags(["ci cd pipeline", "containers", "security"])).toBe("Containers");
      expect(topicFromTags(["windows 365", "azure", "windows"])).toBe("Azure");
      expect(topicFromTags(["cloud", "microsoft", "intune for windows"])).toBe("Azure");
    });

    it("matches keywords inside multi-word tags", () => {
      expect(topicFromTags(["python programming"])).toBe("Python");
      expect(topicFromTags(["kubernetes cluster"])).toBe("Kubernetes");
      expect(topicFromTags(["containerization"])).toBe("Containers");
    });

    it("prefers Kubernetes over Containers when a post carries both", () => {
      expect(topicFromTags(["docker", "kubernetes"])).toBe("Kubernetes");
    });

    it("is case insensitive", () => {
      expect(topicFromTags(["AZURE", "Terraform"])).toBe("Azure");
    });

    it("falls back to Writing when nothing matches", () => {
      expect(topicFromTags(["react", "javascript"])).toBe("Writing");
      expect(topicFromTags([])).toBe("Writing");
    });

    it("only classifies into topics that have a real accent colour", () => {
      const samples = [["docker"], ["kubernetes"], ["azure"], ["security"], ["python"], ["devops"]];
      for (const tags of samples) {
        expect(accentFor(topicFromTags(tags))).not.toBe("var(--topic-neutral)");
      }
    });
  });

  it("carries the fields the card renders", () => {
    for (const post of posts) {
      expect(post.title).toBeTruthy();
      expect(post.href).toMatch(/^https:\/\//);
      expect(post.href).not.toContain("?source=");
      expect(post.date).toBeTruthy();
      expect(Array.isArray(post.tags)).toBe(true);
    }
  });
});
