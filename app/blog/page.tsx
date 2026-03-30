import type { Metadata } from "next";
import Link from "next/link";
import { getAllContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on GTM systems, AI operations, and RevOps execution."
};

export default function BlogIndexPage() {
  const posts = getAllContent("blog");
  const latest = posts[0];
  const remaining = posts.slice(1);

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

      <div className="journal-grid">
        {remaining.map((post) => (
          <article className="list-item" key={post.slug}>
            <p className="meta">{post.date}</p>
            <h2>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p>{post.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
