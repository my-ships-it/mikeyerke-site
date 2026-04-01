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

  return (
    <section>
      <h1>Writing</h1>
      <p className="page-intro">
        Notes and playbooks on GTM systems, RevOps execution, and AI operations.
      </p>

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
      ) : null}

      <BlogSearch posts={posts.slice(1)} />
    </section>
  );
}
