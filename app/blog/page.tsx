import type { Metadata } from "next";
import Link from "next/link";
import { getAllContent } from "@/lib/content";
import { BlogSearch } from "@/components/BlogSearch";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on GTM systems, AI operations, and RevOps execution."
};

export default function BlogIndexPage() {
  const posts = getAllContent("blog");
  const latest = posts[0];

  return (
    <section>
      <h1>Blog</h1>
      <p className="page-intro">
        Ideas, playbooks, and operating principles for scaling GTM execution with AI and strong systems design.
      </p>

      {latest ? (
        <article className="showcase-card page-showcase">
          <p className="meta">{latest.date} | Featured Essay</p>
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
