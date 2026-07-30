import { Link } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import { useDocumentMeta } from "../hooks/useDocumentMeta.js";

export default function NotFound() {
  useDocumentMeta({ title: "Page not found", description: "This page does not exist." });

  return (
    <div className="site-shell">
      <NavBar />
      <main className="not-found">
        <p className="eyebrow">404</p>
        <h1 className="not-found-title">This page doesn&apos;t exist</h1>
        <p className="not-found-body">
          The link may be out of date, or the page may not be published yet.
        </p>
        <Link to="/" className="hero-btn">
          Back to the portfolio
        </Link>
      </main>
    </div>
  );
}
