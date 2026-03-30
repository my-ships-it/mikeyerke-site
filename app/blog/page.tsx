import type { Metadata } from "next";
import Link from "next/link";
import { getAllContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on GTM systems, AI operations, and RevOps execution."
};

export default function BlogIndexPage() {
  const posts = getAllContent("blog");

  return (
    <section>
      <h1>Blog</h1>
      <p className="page-intro">Thoughts on GTM systems, AI workflows, and operating at scale.</p>

      <div className="list-stack">
        {posts.map((post) => (
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
