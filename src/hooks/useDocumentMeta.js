import { useEffect } from "react";

const BASE_TITLE = "Alperen Gökbak — Solution Architect & DevOps Engineer";

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
