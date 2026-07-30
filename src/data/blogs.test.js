import { describe, expect, it } from "vitest";
import { posts } from "./blogs.js";
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

      expect(post.accent).toMatch(/^var\(--cat-(devops|cloud|fullstack|neutral)\)$/);
    }
  });

  it("applies curated labels where one is configured", () => {
    const k8s = posts.find((p) => p.slug.includes("creating-multi-node-kubernetes-cluster"));
    expect(k8s?.topic).toBe("Kubernetes");
  });

  it("falls back to a title-cased tag for uncurated posts", () => {
    for (const post of posts) {
      expect(post.topic).not.toMatch(/^\s*$/);
      expect(post.topic[0]).toBe(post.topic[0].toUpperCase());
    }
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
