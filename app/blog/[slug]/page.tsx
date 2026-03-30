import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllContent, getContentBySlug, markdownToHtml } from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllContent("blog").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getContentBySlug("blog", slug);

  if (!post) {
    return { title: "Post" };
  }

  return {
    title: post.title,
    description: post.summary
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getContentBySlug("blog", slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <p className="meta">{post.date}</p>
      <h1>{post.title}</h1>
      <p className="page-intro">{post.summary}</p>
      <div className="article-body" dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }} />
    </article>
  );
}
