import type { MetadataRoute } from "next";
import { getAllContent } from "@/lib/content";
import { hireTracks } from "@/lib/hireTracks";

export default function sitemap(): MetadataRoute.Sitemap {
  const isProtected = Boolean(process.env.SITE_USERNAME && process.env.SITE_PASSWORD);
  if (isProtected) {
    return [];
  }

  const base = "https://www.mikeyerke.com";
  const staticRoutes = ["", "/about", "/projects", "/blog", "/resume", "/contact", "/hire", "/artifacts", "/trust"].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date()
  }));
  const hireTrackRoutes = hireTracks.map((track) => ({
    url: `${base}/hire/${track.slug}`,
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

  return [...staticRoutes, ...hireTrackRoutes, ...posts, ...projects];
}
