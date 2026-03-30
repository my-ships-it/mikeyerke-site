"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type ExplorerProject = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  date: string;
};

type ProjectExplorerProps = {
  projects: ExplorerProject[];
};

export function ProjectExplorer({ projects }: ProjectExplorerProps) {
  const [activeTag, setActiveTag] = useState<string>("All");

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    for (const project of projects) {
      for (const tag of project.tags) {
        tagSet.add(tag);
      }
    }

    return ["All", ...Array.from(tagSet).sort((a, b) => a.localeCompare(b))];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeTag === "All") {
      return projects;
    }

    return projects.filter((project) => project.tags.includes(activeTag));
  }, [activeTag, projects]);

  return (
    <div className="explorer">
      <div className="explorer-controls" aria-label="Project filters">
        {allTags.map((tag) => (
          <button
            className={`filter-chip ${activeTag === tag ? "is-active" : ""}`}
            key={tag}
            onClick={() => setActiveTag(tag)}
            type="button"
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="showcase-grid">
        {filteredProjects.map((project) => (
          <article className="card" key={project.slug}>
            <p className="meta">{project.date}</p>
            <h3>
              <Link href={`/projects/${project.slug}`}>{project.title}</Link>
            </h3>
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

      {filteredProjects.length === 0 ? (
        <p className="meta">No projects match that filter yet.</p>
      ) : null}
    </div>
  );
}
