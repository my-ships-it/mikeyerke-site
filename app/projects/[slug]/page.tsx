import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllContent, getContentBySlug, markdownToHtml } from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllContent("projects").map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getContentBySlug("projects", slug);

  if (!project) {
    return { title: "Project" };
  }

  return {
    title: project.title,
    description: project.summary
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getContentBySlug("projects", slug);

  if (!project) {
    notFound();
  }

  return (
    <article>
      <p className="meta">{project.date}</p>
      <h1>{project.title}</h1>
      <p className="page-intro">{project.summary}</p>

      <div className="link-row">
        {project.repo ? (
          <Link className="btn btn-secondary" href={project.repo} target="_blank" rel="noreferrer">
            GitHub Repo
          </Link>
        ) : null}
        {project.demo ? (
          <Link className="btn btn-primary" href={project.demo} target="_blank" rel="noreferrer">
            Live Demo
          </Link>
        ) : null}
      </div>

      <div className="article-body" dangerouslySetInnerHTML={{ __html: markdownToHtml(project.content) }} />
    </article>
  );
}
