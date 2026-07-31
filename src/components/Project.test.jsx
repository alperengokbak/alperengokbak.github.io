import { render, screen, within } from "../test/utils.jsx";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Project from "./Project.jsx";

const renderProjects = () => render(<Project />);
const cardTriggers = () => screen.getAllByRole("button", { name: /open a larger preview of/i });
const filter = (name) => screen.getByRole("button", { name });

describe("Project", () => {
  it("shows every project under the All filter", () => {
    renderProjects();
    expect(cardTriggers()).toHaveLength(8);
    expect(filter("All")).toHaveAttribute("aria-pressed", "true");
  });

  it("narrows the grid to the selected category", async () => {
    const user = userEvent.setup();
    renderProjects();

    await user.click(filter("Cloud"));

    expect(cardTriggers()).toHaveLength(2);
    expect(screen.getByText("Azure DevOps Terraform Platform")).toBeInTheDocument();
    expect(screen.queryByText("Booking Hotel")).not.toBeInTheDocument();
  });

  it("moves aria-pressed to the active filter", async () => {
    const user = userEvent.setup();
    renderProjects();

    await user.click(filter("DevOps"));

    expect(filter("DevOps")).toHaveAttribute("aria-pressed", "true");
    expect(filter("All")).toHaveAttribute("aria-pressed", "false");
    expect(cardTriggers()).toHaveLength(1);
  });

  it("restores the full grid when All is reselected", async () => {
    const user = userEvent.setup();
    renderProjects();

    await user.click(filter("FullStack"));
    expect(cardTriggers()).toHaveLength(5);

    await user.click(filter("All"));
    expect(cardTriggers()).toHaveLength(8);
  });

  it("opens the lightbox from the keyboard", async () => {
    const user = userEvent.setup();
    renderProjects();

    const trigger = screen.getByRole("button", { name: /open a larger preview of Booking Hotel/i });
    trigger.focus();
    await user.keyboard("{Enter}");

    expect(screen.getByRole("dialog")).toHaveAccessibleName(/Booking Hotel/);
  });

  it("passes the project title through to the lightbox instead of a generic alt", async () => {
    const user = userEvent.setup();
    renderProjects();

    await user.click(screen.getByRole("button", { name: /open a larger preview of Twitter Clone API/i }));

    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByRole("img")).toHaveAttribute("alt", "Twitter Clone API preview");
  });

  it("closes the lightbox when the filter changes, so the index cannot outlive its list", async () => {
    const user = userEvent.setup();
    renderProjects();

    await user.click(screen.getByRole("button", { name: /open a larger preview of Booking Hotel/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.click(filter("Cloud"));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("walks the filtered set rather than the full project list", async () => {
    const user = userEvent.setup();
    renderProjects();

    await user.click(filter("Cloud"));
    await user.click(screen.getByRole("button", { name: /open a larger preview of Automated Cloud Infrastructure/i }));

    expect(screen.getByText("1 / 2")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /next project/i }));

    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByRole("heading")).toHaveTextContent("Azure DevOps Terraform Platform");
    expect(screen.getByText("2 / 2")).toBeInTheDocument();
  });

  it("returns focus to the card that opened the lightbox", async () => {
    const user = userEvent.setup();
    renderProjects();

    const trigger = screen.getByRole("button", { name: /open a larger preview of Multi-node Kubernetes Cluster/i });
    await user.click(trigger);
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
