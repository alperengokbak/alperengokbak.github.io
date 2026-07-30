import { useEffect, useState } from "react";
import { useTranslation } from "../i18n/useTranslation.js";

export default function BackToTop() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollToTop}
      className={`back-to-top ${visible ? "back-to-top-visible" : ""}`}
      aria-label={t("backToTop")}
    >
      ↑
    </button>
  );
}
