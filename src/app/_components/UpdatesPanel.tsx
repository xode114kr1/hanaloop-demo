import { posts } from "./dashboard-data";

export function UpdatesPanel() {
  return (
    <article className="dashboard-card p-[var(--space-md)] xl:col-span-4">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-[var(--on-surface)]">
          Recent ESG Updates
        </h2>
        <button className="text-sm font-bold text-[var(--primary)]">
          View All
        </button>
      </div>
      <div className="space-y-5">
        {posts.map((post, index) => (
          <article
            className="border-b border-[var(--outline-variant)] pb-5 last:border-b-0 last:pb-0"
            key={post.title}
          >
            <div className="mb-2 flex justify-between gap-4 text-[11px] font-bold uppercase text-[var(--outline)]">
              <span>{post.category}</span>
              <span>{post.date}</span>
            </div>
            <h3 className="font-bold text-[var(--on-surface)] transition hover:text-[var(--primary)]">
              {post.title}
            </h3>
            <p className="text-clamp-2 mt-2 text-sm text-[var(--on-surface-variant)]">
              {post.content}
            </p>
            {index === 0 ? (
              <span className="mt-3 inline-flex rounded-full bg-[rgb(0_184_148_/_10%)] px-2.5 py-1 text-xs font-bold text-[var(--on-primary-container)]">
                Active briefing
              </span>
            ) : null}
          </article>
        ))}
      </div>
    </article>
  );
}
