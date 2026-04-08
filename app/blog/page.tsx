import type { Metadata } from "next";
import Link from "next/link";
import { getAllContent } from "@/lib/content";
import { BlogSearch } from "@/components/BlogSearch";

export const metadata: Metadata = {
  title: "Writing",
  description: "Writing on GTM systems, AI operations, and RevOps execution."
};

export default function BlogIndexPage() {
  const posts = getAllContent("blog");
  const latest = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <section>
      <h1>Writing</h1>
      <p className="page-intro">Public writing and operating notes.</p>

      {latest ? (
        <article className="showcase-card page-showcase">
          <p className="meta">
            {latest.date} | {latest.readingMinutes} min read | Featured Essay
          </p>
          <h2>
            <Link href={`/blog/${latest.slug}`}>{latest.title}</Link>
          </h2>
          <p>{latest.summary}</p>
        </article>
      ) : (
        <article className="list-item">
          <h2>No public posts yet</h2>
          <p>I removed draft content. New posts will appear here as they are published.</p>
          <div className="link-row">
            <Link className="btn btn-secondary" href="/projects">
              View Work
            </Link>
          </div>
        </article>
      )}

      {remainingPosts.length > 0 ? <BlogSearch posts={remainingPosts} /> : null}
    </section>
  );
}
