import { render, screen } from "../test/utils.jsx";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ImageModal from "./ImageModal.jsx";

const defaults = { imgSrc: "/preview.webp", title: "Booking Hotel" };

describe("ImageModal", () => {
  it("renders nothing when closed", () => {
    render(<ImageModal isOpen={false} onClose={vi.fn()} {...defaults} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("exposes dialog semantics and names itself from the project title", () => {
    render(<ImageModal isOpen onClose={vi.fn()} {...defaults} />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAccessibleName(/Booking Hotel/);
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Booking Hotel screenshot");
  });

  it("falls back to a generic label when no title is supplied", () => {
    render(<ImageModal isOpen onClose={vi.fn()} imgSrc="/preview.webp" />);
    expect(screen.getByRole("dialog")).toHaveAccessibleName("Full size preview");
  });

  it("closes on Escape", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<ImageModal isOpen onClose={onClose} {...defaults} />);

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes when the backdrop is clicked but not when the image is", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<ImageModal isOpen onClose={onClose} {...defaults} />);

    await user.click(screen.getByRole("img"));
    expect(onClose).not.toHaveBeenCalled();

    await user.click(screen.getByRole("dialog"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes from the close button", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<ImageModal isOpen onClose={onClose} {...defaults} />);

    await user.click(screen.getByRole("button", { name: /close preview/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("moves focus into the dialog on open", () => {
    render(<ImageModal isOpen onClose={vi.fn()} {...defaults} />);

    expect(screen.getByRole("button", { name: /close preview/i })).toHaveFocus();
  });

  it("restores focus to the trigger when it closes", () => {
    const trigger = document.createElement("button");
    document.body.appendChild(trigger);
    trigger.focus();
    expect(trigger).toHaveFocus();

    const { rerender } = render(<ImageModal isOpen onClose={vi.fn()} {...defaults} />);

    expect(screen.getByRole("button", { name: /close preview/i })).toHaveFocus();

    rerender(<ImageModal isOpen={false} onClose={vi.fn()} {...defaults} />);

    expect(trigger).toHaveFocus();

    trigger.remove();
  });

  it("locks background scrolling while open and releases it on close", () => {
    const { rerender } = render(<ImageModal isOpen onClose={vi.fn()} {...defaults} />);

    expect(document.body.style.overflow).toBe("hidden");

    rerender(<ImageModal isOpen={false} onClose={vi.fn()} {...defaults} />);

    expect(document.body.style.overflow).toBe("");
  });

  it("keeps Tab inside the dialog", async () => {
    const user = userEvent.setup();
    render(<ImageModal isOpen onClose={vi.fn()} {...defaults} />);

    const closeButton = screen.getByRole("button", { name: /close preview/i });
    expect(closeButton).toHaveFocus();

    await user.tab();
    expect(closeButton).toHaveFocus();
  });
});
