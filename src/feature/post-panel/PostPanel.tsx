"use client";

import { useEffect, useState } from "react";
import { DashboardErrorState } from "@/feature/dashboard-error-state/DashboardErrorState";
import type { Post } from "@/types/post";

type PostPanelProps = {
  companyId?: string;
};

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function formatPostDate(dateTime: string) {
  return dateFormatter.format(new Date(dateTime));
}

const loadingPosts: Post[] = [
  {
    id: "loading-post-1",
    title: "Loading post data...",
    resourceUid: "",
    dateTime: "2024-01-01T00:00:00.000Z",
    content: "Post data is being loaded for the selected company.",
  },
  {
    id: "loading-post-2",
    title: "Loading post data...",
    resourceUid: "",
    dateTime: "2024-01-01T00:00:00.000Z",
    content: "Post data is being loaded for the selected company.",
  },
];

export function PostPanel({ companyId }: PostPanelProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!companyId) return;

    const controller = new AbortController();
    const params = new URLSearchParams({ companyId });

    async function loadPosts() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const query = params.toString();
        const response = await fetch(`/api/posts${query ? `?${query}` : ""}`, {
          signal: controller.signal,
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message ?? "Post 목록을 불러오지 못했습니다");
        }

        setPosts(data);
        setErrorMessage(null);
      } catch (error) {
        if (controller.signal.aborted) return;

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Post 목록을 불러오지 못했습니다",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadPosts();

    return () => controller.abort();
  }, [companyId, retryCount]);

  const visibleErrorMessage = companyId ? errorMessage : null;
  const visibleIsLoading = companyId ? isLoading : false;
  const companyPosts = companyId ? posts : [];
  const visiblePosts = visibleIsLoading ? loadingPosts : companyPosts;

  return (
    <article
      className="dashboard-card scroll-mt-24 p-(--space-md) xl:col-span-4"
      id="recent-posts"
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-(--on-surface)">
          Recent Posts
        </h2>
      </div>

      {visibleErrorMessage ? (
        <div className="mb-5">
          <DashboardErrorState
            message={visibleErrorMessage}
            onRetry={() => setRetryCount((count) => count + 1)}
            title="Post 목록을 불러오지 못했습니다"
          />
        </div>
      ) : null}

      {!visibleIsLoading &&
      !visibleErrorMessage &&
      companyPosts.length === 0 ? (
        <div className="rounded-lg border border-(--outline-variant) p-5 text-sm font-semibold text-(--on-surface-variant)">
          No posts available for this company
        </div>
      ) : !visibleErrorMessage || visibleIsLoading ? (
        <div
          className={visibleIsLoading ? "space-y-5 opacity-45" : "space-y-5"}
        >
          {visiblePosts.map((post) => (
            <article
              className="border-b border-(--outline-variant) pb-5 last:border-b-0 last:pb-0"
              key={post.id}
            >
              <div className="text-micro mb-2 flex justify-end gap-4 font-bold uppercase text-(--outline)">
                <span>{formatPostDate(post.dateTime)}</span>
              </div>
              <h3 className="font-bold text-(--on-surface) transition hover:text-(--primary)">
                {post.title}
              </h3>
              <p className="text-clamp-2 mt-2 text-sm text-(--on-surface-variant)">
                {post.content}
              </p>
            </article>
          ))}
        </div>
      ) : null}
    </article>
  );
}
