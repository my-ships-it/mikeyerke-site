import type { Metadata } from "next";
import Link from "next/link";
import { getAllContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Hands-on projects from GTM systems, AI automation, and RevOps tooling."
};

export default function ProjectsPage() {
  const projects = getAllContent("projects");

  return (
    <section>
      <h1>Projects</h1>
      <p className="page-intro">Selected work across AI tooling, ops automation, and growth systems.</p>

      <div className="card-grid">
        {projects.map((project) => (
          <article className="card" key={project.slug}>
            <p className="meta">{project.date}</p>
            <h2>
              <Link href={`/projects/${project.slug}`}>{project.title}</Link>
            </h2>
            <p>{project.summary}</p>
            <div className="tag-row">
              {project.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
