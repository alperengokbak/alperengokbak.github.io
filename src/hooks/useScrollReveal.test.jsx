import { render, act } from "../test/utils.jsx";
import { describe, expect, it } from "vitest";
import { useScrollReveal } from "./useScrollReveal.js";
import { MockIntersectionObserver } from "../test/setup.js";

function Revealer({ count = 3 }) {
  const ref = useScrollReveal();
  return (
    <main ref={ref}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="reveal" data-testid={`reveal-${i}`} />
      ))}
    </main>
  );
}

const latestObserver = () => MockIntersectionObserver.instances.at(-1);

describe("useScrollReveal", () => {
  it("observes every .reveal child", () => {
    const { getByTestId } = render(<Revealer count={3} />);

    const observer = latestObserver();

    expect(observer.observed.size).toBe(3);
    expect(observer.observed.has(getByTestId("reveal-0"))).toBe(true);
    expect(observer.observed.has(getByTestId("reveal-2"))).toBe(true);
  });

  it("adds the visible class only to entries that are intersecting", () => {
    const { getByTestId } = render(<Revealer count={2} />);

    const observer = latestObserver();

    act(() => {
      observer.trigger([
        { target: getByTestId("reveal-0"), isIntersecting: true },
        { target: getByTestId("reveal-1"), isIntersecting: false },
      ]);
    });

    expect(getByTestId("reveal-0")).toHaveClass("visible");
    expect(getByTestId("reveal-1")).not.toHaveClass("visible");
  });

  it("unobserves a target after revealing it so it only animates once", () => {
    const { getByTestId } = render(<Revealer count={1} />);

    const observer = latestObserver();
    const target = getByTestId("reveal-0");

    act(() => {
      observer.trigger([{ target, isIntersecting: true }]);
    });

    expect(observer.observed.has(target)).toBe(false);
  });

  it("uses a zero threshold so sections taller than the viewport still reveal", () => {
    render(<Revealer count={1} />);

    expect(latestObserver().options.threshold).toBe(0);
    expect(latestObserver().options.rootMargin).toBe("0px 0px -10% 0px");
  });

  it("disconnects on unmount", () => {
    const { unmount } = render(<Revealer count={2} />);

    const observer = latestObserver();

    unmount();

    expect(observer.disconnected).toBe(true);
  });
});
