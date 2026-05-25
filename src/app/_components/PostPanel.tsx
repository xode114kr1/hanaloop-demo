import { posts } from "./dashboard-data";

export function PostPanel() {
  return (
    <article className="dashboard-card p-(--space-md) xl:col-span-4">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-(--on-surface)">
          Recent ESG Updates
        </h2>
        <button className="text-sm font-bold text-(--primary)">
          View All
        </button>
      </div>
      <div className="space-y-5">
        {posts.map((post, index) => (
          <article
            className="border-b border-(--outline-variant) pb-5 last:border-b-0 last:pb-0"
            key={post.title}
          >
            <div className="text-micro mb-2 flex justify-between gap-4 font-bold uppercase text-(--outline)">
              <span>{post.category}</span>
              <span>{post.date}</span>
            </div>
            <h3 className="font-bold text-(--on-surface) transition hover:text-(--primary)">
              {post.title}
            </h3>
            <p className="text-clamp-2 mt-2 text-sm text-(--on-surface-variant)">
              {post.content}
            </p>
            {index === 0 ? (
              <span className="mt-3 inline-flex rounded-full bg-(--primary-container)/10 px-2.5 py-1 text-xs font-bold text-(--on-primary-container)">
                Active briefing
              </span>
            ) : null}
          </article>
        ))}
      </div>
    </article>
  );
}
