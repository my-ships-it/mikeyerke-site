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
    description: post.summary,
    alternates: {
      canonical: `https://www.mikeyerke.com/blog/${post.slug}`
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      url: `https://www.mikeyerke.com/blog/${post.slug}`,
      images: [{ url: `/blog/${post.slug}/opengraph-image`, width: 1200, height: 630, alt: post.title }]
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [`/blog/${post.slug}/opengraph-image`]
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getContentBySlug("blog", slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Mike Yerke"
    },
    url: `https://www.mikeyerke.com/blog/${post.slug}`,
    keywords: post.tags
  };

  return (
    <article>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} type="application/ld+json" />
      <p className="meta">
        {post.date} | {post.readingMinutes} min read
      </p>
      <h1>{post.title}</h1>
      <p className="page-intro">{post.summary}</p>
      <div className="article-body" dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }} />
    </article>
  );
}
