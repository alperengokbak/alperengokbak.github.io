import { render, screen, within } from "../test/utils.jsx";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import NavBar from "./NavBar.jsx";

const hamburger = () => screen.getByRole("button", { name: /toggle navigation/i });
const mobileMenu = () => document.getElementById("mobile-menu");

describe("NavBar", () => {
  it("starts with the mobile menu closed", () => {
    render(<NavBar />);

    expect(hamburger()).toHaveAttribute("aria-expanded", "false");
    expect(mobileMenu()).not.toHaveClass("mobile-menu-open");
  });

  it("toggles the menu open and closed", async () => {
    const user = userEvent.setup();
    render(<NavBar />);

    await user.click(hamburger());
    expect(hamburger()).toHaveAttribute("aria-expanded", "true");
    expect(mobileMenu()).toHaveClass("mobile-menu-open");

    await user.click(hamburger());
    expect(hamburger()).toHaveAttribute("aria-expanded", "false");
    expect(mobileMenu()).not.toHaveClass("mobile-menu-open");
  });

  it("keeps the closed menu out of the tab order and the accessibility tree", async () => {
    const user = userEvent.setup();
    render(<NavBar />);

    // jsdom does not implement inert's focus behaviour, so assert the attribute
    // contract that drives it in real browsers. This is the regression that made ten
    // invisible links tabbable when the menu was closed.
    expect(mobileMenu()).toHaveAttribute("inert");
    expect(mobileMenu()).toHaveAttribute("aria-hidden", "true");

    await user.click(hamburger());

    expect(mobileMenu()).not.toHaveAttribute("inert");
    expect(mobileMenu()).toHaveAttribute("aria-hidden", "false");
  });

  it("wires the hamburger to the menu it controls", () => {
    render(<NavBar />);
    expect(hamburger()).toHaveAttribute("aria-controls", "mobile-menu");
    expect(mobileMenu()).toBeInTheDocument();
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<NavBar />);

    await user.click(hamburger());
    expect(hamburger()).toHaveAttribute("aria-expanded", "true");

    await user.keyboard("{Escape}");
    expect(hamburger()).toHaveAttribute("aria-expanded", "false");
  });

  it("closes when a menu link is clicked", async () => {
    const user = userEvent.setup();
    render(<NavBar />);

    await user.click(hamburger());
    await user.click(within(mobileMenu()).getByRole("link", { name: "Projects" }));

    expect(hamburger()).toHaveAttribute("aria-expanded", "false");
  });

  it("locks background scrolling only while the menu is open", async () => {
    const user = userEvent.setup();
    render(<NavBar />);

    expect(document.body.style.overflow).toBe("");

    await user.click(hamburger());
    expect(document.body.style.overflow).toBe("hidden");

    await user.click(hamburger());
    expect(document.body.style.overflow).toBe("");
  });
});
