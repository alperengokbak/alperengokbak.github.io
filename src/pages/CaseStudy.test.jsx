import { screen } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { render } from "../test/utils.jsx";
import CaseStudy from "./CaseStudy.jsx";
import { caseStudies } from "../data/caseStudies.js";

vi.mock("../data/caseStudies.js", async (importOriginal) => {
  const actual = await importOriginal();
  const published = {
    slug: "published-example",
    projectTitle: "Azure DevOps Terraform Platform",
    status: "published",
    title: "Published Example",
    summary: "A real summary.",
    role: "Sole author",
    timeframe: "01/2025 - 03/2025",
    stack: ["Terraform", "Azure DevOps"],
    problem: "The problem statement.",
    constraints: ["A real constraint."],
    decisions: [{ choice: "Chose X", why: "Because Y", tradeoff: "Gave up Z" }],
    architecture: "How it fits together.",
    outcomes: ["A measurable result."],
    lessons: ["What I'd change."],
  };
  const draft = { ...published, slug: "draft-example", status: "draft", title: "Draft Example" };
  const all = [published, draft];
  return {
    ...actual,
    caseStudies: all,
    caseStudyBySlug: (slug) => all.find((s) => s.slug === slug),
    publishedCaseStudies: [published],
    caseStudyForProject: (title) => (title === published.projectTitle ? published : undefined),
  };
});

const renderAt = (path) =>
  render(
    <Routes>
      <Route path="/case-studies/:slug" element={<CaseStudy />} />

    </Routes>,

    { route: path }
  );

describe("CaseStudy route", () => {
  it("renders a published study in full", () => {
    renderAt("/case-studies/published-example");

    expect(screen.getByRole("heading", { level: 1, name: "Published Example" })).toBeInTheDocument();
    expect(screen.getByText("The problem statement.")).toBeInTheDocument();
    expect(screen.getByText("A real constraint.")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Chose X" })).toBeInTheDocument();
    expect(screen.getByText(/Gave up Z/)).toBeInTheDocument();
    expect(screen.getByText("A measurable result.")).toBeInTheDocument();
  });

  it("sets the document title from the study", () => {
    renderAt("/case-studies/published-example");
    expect(document.title).toContain("Published Example");
  });

  it("shows the not-found page for a draft instead of leaking scaffold text", () => {
    renderAt("/case-studies/draft-example");

    expect(screen.getByRole("heading", { name: /doesn't exist/i })).toBeInTheDocument();
    expect(screen.queryByText("Draft Example")).not.toBeInTheDocument();
  });

  it("shows the not-found page for an unknown slug", () => {
    renderAt("/case-studies/no-such-study");
    expect(screen.getByRole("heading", { name: /doesn't exist/i })).toBeInTheDocument();
  });
});

describe("caseStudies scaffold", () => {
  it("ships every study as a draft until its content is written", async () => {
    const actual = await vi.importActual("../data/caseStudies.js");
    for (const study of actual.caseStudies) {
      const serialised = JSON.stringify(study);
      if (serialised.includes("TODO")) {
        expect(study.status, `${study.slug} still contains TODOs and must stay a draft`).toBe("draft");
      }
    }
  });

  it("links each study to a project that actually exists", async () => {
    const actual = await vi.importActual("../data/caseStudies.js");
    const { projects } = await vi.importActual("../data/projects.js");
    const titles = projects.map((p) => p.title);
    for (const study of actual.caseStudies) {
      expect(titles, `${study.slug} points at a missing project`).toContain(study.projectTitle);
    }
  });

  it("keeps slugs unique", () => {
    const slugs = caseStudies.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
