import { render, screen, within } from "../test/utils.jsx";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import NavBar from "./NavBar.jsx";

const hamburger = () => screen.getByRole("button", { name: /toggle navigation/i });
const mobileMenu = () => document.getElementById("mobile-menu");

describe("NavBar", () => {
  it("offers the CV from the bar, which scrolling cannot otherwise reach", () => {
    render(<NavBar />);

    // The hero's download button scrolls out of sight; the bar is pinned. There are two
    // copies by design — the bar's is hidden below lg, where the mobile menu carries it.
    const [barCv] = within(document.querySelector(".nav-actions")).getAllByRole("link", {
      name: /download cv/i,
    });
    expect(barCv).toHaveAttribute("href", "/Alperen_Gokbak_CV.pdf");
    expect(barCv).toHaveAttribute("download");
  });

  it("also offers the CV inside the mobile menu", async () => {
    const user = userEvent.setup();
    render(<NavBar />);

    // The closed menu is inert and aria-hidden, so its contents are correctly absent
    // from the accessibility tree until it is opened.
    await user.click(hamburger());

    const menuCv = within(mobileMenu()).getByRole("link", { name: /download cv/i });
    expect(menuCv).toHaveAttribute("href", "/Alperen_Gokbak_CV.pdf");
  });

  it("closes the mobile menu after the CV is downloaded", async () => {
    const user = userEvent.setup();
    render(<NavBar />);

    await user.click(hamburger());
    await user.click(within(mobileMenu()).getByRole("link", { name: /download cv/i }));

    expect(hamburger()).toHaveAttribute("aria-expanded", "false");
  });

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
