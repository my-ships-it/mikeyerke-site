import type { Metadata } from "next";
import Link from "next/link";
import { getAllContent } from "@/lib/content";
import { ProjectExplorer } from "@/components/ProjectExplorer";

export const metadata: Metadata = {
  title: "Projects",
  description: "Hands-on projects from GTM systems, AI automation, and RevOps tooling."
};

export default function ProjectsPage() {
  const projects = getAllContent("projects");
  const featured = projects.find((project) => project.featured) ?? projects[0];
  const projectList = featured ? projects.filter((project) => project.slug !== featured.slug) : projects;

  return (
    <section>
      <h1>Projects</h1>
      <p className="page-intro">
        Systems-heavy builds across GTM operations, AI workflow design, and execution tooling.
      </p>

      {featured ? (
        <article className="showcase-card page-showcase">
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
