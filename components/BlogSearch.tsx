"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type SearchPost = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  readingMinutes: number;
};

type BlogSearchProps = {
  posts: SearchPost[];
};

export function BlogSearch({ posts }: BlogSearchProps) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string>("All");

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    for (const post of posts) {
      for (const tag of post.tags) {
        tags.add(tag);
      }
    }

    return ["All", ...Array.from(tags).sort((a, b) => a.localeCompare(b))];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return posts.filter((post) => {
      const tagMatch = activeTag === "All" || post.tags.includes(activeTag);
      const haystack = `${post.title} ${post.summary} ${post.tags.join(" ")}`.toLowerCase();
      const queryMatch = !normalizedQuery || haystack.includes(normalizedQuery);
      return tagMatch && queryMatch;
    });
  }, [activeTag, posts, query]);

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

      <div className="explorer-controls" aria-label="Blog filters">
        {allTags.map((tag) => (
          <button
            className={`filter-chip ${activeTag === tag ? "is-active" : ""}`}
            key={tag}
            onClick={() => setActiveTag(tag)}
            type="button"
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="journal-grid">
        {filteredPosts.map((post) => (
          <article className="list-item" key={post.slug}>
            <p className="meta">
              {post.date} | {post.readingMinutes} min read
            </p>
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
