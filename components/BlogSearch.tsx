"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type SearchPost = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
};

type BlogSearchProps = {
  posts: SearchPost[];
};

export function BlogSearch({ posts }: BlogSearchProps) {
  const [query, setQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return posts;
    }

    return posts.filter((post) => {
      const haystack = `${post.title} ${post.summary} ${post.tags.join(" ")}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [posts, query]);

  return (
    <div className="blog-search-shell">
      <label className="search-label" htmlFor="blog-search-input">
        Search writing
      </label>
      <input
        className="search-input"
        id="blog-search-input"
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Try: forecasting, AI, revops"
        type="search"
        value={query}
      />

      <div className="journal-grid">
        {filteredPosts.map((post) => (
          <article className="list-item" key={post.slug}>
            <p className="meta">{post.date}</p>
            <h2>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p>{post.summary}</p>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 ? (
        <p className="meta">No posts match your search yet.</p>
      ) : null}
    </div>
  );
}
