import { render, screen } from "../test/utils.jsx";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ProjectLightbox from "./ProjectLightbox.jsx";

const projects = [
  {
    title: "Booking Hotel",
    timeframe: "React · Node · Mongo",
    imgSrc: "/booking.webp",
    badges: ["React", "Express"],
    videoLink: "https://youtube.com/watch?v=demo",
    link: "https://booking.example.com/",
    category: "FullStack",
  },
  {
    title: "Azure DevOps Terraform Platform",
    timeframe: "06/2025 - 08/2025",
    imgSrc: "/azure.svg",
    badges: ["Terraform"],
    link: "https://dev.azure.com/alperengokbak",
    category: "Cloud",
  },
  {
    title: "Multi-node Kubernetes Cluster",
    timeframe: "01/2025 - Present",
    imgSrc: "/k8s.webp",
    badges: ["Kubernetes"],
    link: "https://github.com/alperengokbak/k8s-lab",
    category: "DevOps",
  },
];

const setup = (overrides = {}) => {
  const props = { projects, index: 0, onClose: vi.fn(), onIndexChange: vi.fn(), ...overrides };
  return { props, ...render(<ProjectLightbox {...props} />) };
};

describe("ProjectLightbox", () => {
  it("renders nothing when no index is selected", () => {
    setup({ index: null });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders nothing when the filtered set is empty", () => {
    setup({ projects: [], index: 0 });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("exposes dialog semantics named from the project title", () => {
    setup();

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAccessibleName(/Booking Hotel/);
  });

  it("describes the image as a preview rather than a screenshot", () => {
    setup({ index: 1 });

    expect(screen.getByRole("img")).toHaveAttribute("alt", "Azure DevOps Terraform Platform preview");
  });

  it("shows the caption, tags and counter for the active project", () => {
    setup();

    expect(screen.getByRole("heading", { name: "Booking Hotel" })).toBeInTheDocument();
    expect(screen.getByText("React · Node · Mongo")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("renders action links conditionally", () => {
    const { rerender, props } = setup();

    expect(screen.getByRole("link", { name: /watch demo/i })).toHaveAttribute("href", "https://youtube.com/watch?v=demo");
    expect(screen.getByRole("link", { name: /view project/i })).toHaveAttribute("href", "https://booking.example.com/");

    rerender(<ProjectLightbox {...props} index={2} />);

    expect(screen.queryByRole("link", { name: /watch demo/i })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view project/i })).toHaveAttribute(
      "href",
      "https://github.com/alperengokbak/k8s-lab"
    );
  });

  it("escapes transformed ancestors so the fixed overlay anchors to the viewport", () => {
    const transformed = document.createElement("div");
    transformed.style.transform = "translateY(0)";
    document.body.appendChild(transformed);

    render(<ProjectLightbox projects={projects} index={0} onClose={vi.fn()} onIndexChange={vi.fn()} />, {
      container: transformed,
    });

    expect(transformed.contains(screen.getByRole("dialog"))).toBe(false);

    transformed.remove();
  });

  it("closes on Escape", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    setup({ onClose });

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes on backdrop click but not on clicks inside the panel", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    setup({ onClose });

    await user.click(screen.getByRole("img"));
    expect(onClose).not.toHaveBeenCalled();

    await user.click(screen.getByRole("heading", { name: "Booking Hotel" }));
    expect(onClose).not.toHaveBeenCalled();

    await user.click(screen.getByRole("dialog"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("advances and rewinds with the arrow buttons", async () => {
    const onIndexChange = vi.fn();
    const user = userEvent.setup();
    setup({ index: 1, onIndexChange });

    await user.click(screen.getByRole("button", { name: /next project/i }));
    expect(onIndexChange).toHaveBeenLastCalledWith(2);

    await user.click(screen.getByRole("button", { name: /previous project/i }));
    expect(onIndexChange).toHaveBeenLastCalledWith(0);
  });

  it("navigates with the arrow keys", async () => {
    const onIndexChange = vi.fn();
    const user = userEvent.setup();
    setup({ index: 0, onIndexChange });

    await user.keyboard("{ArrowRight}");
    expect(onIndexChange).toHaveBeenLastCalledWith(1);

    await user.keyboard("{ArrowLeft}");
    expect(onIndexChange).toHaveBeenLastCalledWith(2);
  });

  it("wraps around at both ends", async () => {
    const onIndexChange = vi.fn();
    const user = userEvent.setup();
    const { rerender, props } = setup({ index: 2, onIndexChange });

    await user.click(screen.getByRole("button", { name: /next project/i }));
    expect(onIndexChange).toHaveBeenLastCalledWith(0);

    rerender(<ProjectLightbox {...props} index={0} />);

    await user.click(screen.getByRole("button", { name: /previous project/i }));
    expect(onIndexChange).toHaveBeenLastCalledWith(2);
  });

  it("hides navigation when only one project is in the filtered set", () => {
    setup({ projects: [projects[0]], index: 0 });

    expect(screen.queryByRole("button", { name: /next project/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /previous project/i })).not.toBeInTheDocument();
    expect(screen.queryByText("1 / 1")).not.toBeInTheDocument();
  });

  it("moves focus into the dialog on open and restores it on close", () => {
    const trigger = document.createElement("button");
    document.body.appendChild(trigger);
    trigger.focus();

    const { rerender, props } = setup();

    expect(screen.getByRole("button", { name: /close preview/i })).toHaveFocus();

    rerender(<ProjectLightbox {...props} index={null} />);

    expect(trigger).toHaveFocus();

    trigger.remove();
  });

  it("locks background scrolling while open and releases it on close", () => {
    const { rerender, props } = setup();

    expect(document.body.style.overflow).toBe("hidden");

    rerender(<ProjectLightbox {...props} index={null} />);

    expect(document.body.style.overflow).toBe("");
  });

  it("keeps Tab inside the dialog once navigation controls exist", async () => {
    const user = userEvent.setup();
    setup();

    const closeButton = screen.getByRole("button", { name: /close preview/i });
    expect(closeButton).toHaveFocus();

    await user.tab();
    expect(closeButton).not.toHaveFocus();
    expect(screen.getByRole("dialog").contains(document.activeElement)).toBe(true);
  });
});
