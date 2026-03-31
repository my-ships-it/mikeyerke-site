import type { MetadataRoute } from "next";
import { getAllContent } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.mikeyerke.com";
  const staticRoutes = ["", "/about", "/projects", "/blog", "/resume", "/contact", "/hire"].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date()
  }));

  const posts = getAllContent("blog").map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date)
  }));

  const projects = getAllContent("projects").map((project) => ({
    url: `${base}/projects/${project.slug}`,
    lastModified: new Date(project.date)
  }));

  return [...staticRoutes, ...posts, ...projects];
}
