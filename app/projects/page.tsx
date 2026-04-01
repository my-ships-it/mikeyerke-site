import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllContent } from "@/lib/content";
import { ProjectExplorer } from "@/components/ProjectExplorer";

export const metadata: Metadata = {
  title: "Work",
  description: "Hands-on projects from GTM systems, AI automation, and RevOps tooling."
};

export default function ProjectsPage() {
  const projects = getAllContent("projects");
  const featured = projects.find((project) => project.featured) ?? projects[0];
  const projectList = featured ? projects.filter((project) => project.slug !== featured.slug) : projects;

  return (
    <section>
      <h1>Work</h1>
      <p className="page-intro">
        Systems-focused builds across GTM operations, AI workflows, and execution tooling.
      </p>

      {featured ? (
        <article className="showcase-card page-showcase">
          {featured.coverImage ? (
            <div className="feature-media">
              <Image
                alt={featured.title}
                className="feature-media-image"
                height={720}
                priority
                sizes="(max-width: 820px) 100vw, 70vw"
                src={featured.coverImage}
                width={1280}
              />
            </div>
          ) : null}
          <p className="meta">Featured Build</p>
          <h2>
            <Link href={`/projects/${featured.slug}`}>{featured.title}</Link>
          </h2>
          <p>{featured.summary}</p>
          <div className="tag-row">
            {featured.tags.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </article>
      ) : null}

      <ProjectExplorer projects={projectList} />
    </section>
  );
}
