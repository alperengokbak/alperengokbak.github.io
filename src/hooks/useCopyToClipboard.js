import { useState, useCallback } from "react";

/**
 * Returns a [copied, copyToClipboard] tuple.
 * `copied` resets to false after `resetMs` milliseconds (default 2000).
 */
export function useCopyToClipboard(resetMs = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), resetMs);
      } catch {
        // Fallback for older browsers
        const el = document.createElement("textarea");
        el.value = text;
        el.style.position = "fixed";
        el.style.opacity = "0";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setCopied(true);
        setTimeout(() => setCopied(false), resetMs);
      }
    },
    [resetMs]
  );

  return [copied, copy];
}
