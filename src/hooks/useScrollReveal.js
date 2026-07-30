import { useEffect, useRef } from "react";

/**
 * Attaches a single IntersectionObserver to a container ref.
 * Every direct child with class "reveal" will gain the "visible" class
 * once it enters the viewport, triggering the CSS fade/slide animation.
 *
 * Threshold is 0 (any pixel visible) rather than a ratio: a ratio-based
 * threshold is mathematically unreachable for a section several times taller
 * than the viewport, which would leave that content stuck at opacity 0.
 * The bottom rootMargin is what delays the reveal until the section is
 * meaningfully on screen.
 */
export function useScrollReveal(threshold = 0, rootMargin = "0px 0px -10% 0px") {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // animate only once
          }
        });
      },
      { threshold, rootMargin }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}
