import { useEffect } from "react";

const BASE_TITLE = "Alperen Gökbak — Solution Architect & DevOps Engineer";

/**
 * Sets the document title and meta description for a route, restoring the previous
 * values on unmount.
 *
 * Note: this runs client-side, so crawlers that do not execute JavaScript will only
 * ever see the tags in index.html. If per-page SEO becomes important, prerender the
 * routes at build time rather than relying on this.
 */
export function useDocumentMeta({ title, description }) {
  useEffect(() => {
    const previousTitle = document.title;
    const tag = document.querySelector('meta[name="description"]');
    const previousDescription = tag?.getAttribute("content");

    if (title) document.title = `${title} — Alperen Gökbak`;
    if (description && tag) tag.setAttribute("content", description);

    return () => {
      document.title = previousTitle || BASE_TITLE;
      if (tag && previousDescription != null) tag.setAttribute("content", previousDescription);
    };
  }, [title, description]);
}
