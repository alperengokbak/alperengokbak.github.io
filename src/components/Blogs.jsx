import { posts } from "../data/blogs.js";
import { useTranslation } from "../i18n/useTranslation.js";

export default function Blogs() {
  const { t } = useTranslation();

  return (
    <section className="section-shell" id="blogs">
      <div className="section-header">
        <p className="eyebrow">{t("sections.blogsEyebrow")}</p>
        <h2 className="section-title">{t("sections.blogsTitle")}</h2>
        <p className="section-blurb">
          Opinionated notes on cloud automation, secure access, and container craft. Each post ships with steps you can replicate.
        </p>
      </div>

      <div className="blog-card-grid">
        {posts.map((post) => (
          <a
            key={post.slug}
            href={post.href}
            target="_blank"
            rel="noreferrer"
            className="blog-card"
            style={{ "--card-accent": post.accent }}
          >
            {/* A cover can be absent when Medium refuses the image download. */}
            <div className="blog-card-media">
              {post.image ? (
                <img src={post.image} alt="" width="800" height="450" loading="lazy" />
              ) : (
                <div className="blog-card-media-placeholder" aria-hidden="true" />
              )}
              <span className="blog-card-pill">{post.topic}</span>
            </div>
            <div className="blog-card-body">
              <p className="blog-card-date">{post.date}</p>
              <h3 className="blog-card-title">{post.title}</h3>
              <p className="blog-card-summary">{post.summary}</p>
              <div className="blog-card-tags">
                {post.tags.map((tag) => (
                  <span key={`${post.slug}-${tag}`}>{tag}</span>
                ))}
              </div>
              <span className="blog-card-link">{t("blogs.readStory")}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

