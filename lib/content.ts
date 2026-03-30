import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export type ContentType = "blog" | "projects";

export type ContentItem = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  featured: boolean;
  repo?: string;
  demo?: string;
  content: string;
};

const contentRoots: Record<ContentType, string> = {
  blog: path.join(process.cwd(), "content/blog"),
  projects: path.join(process.cwd(), "content/projects")
};

function readMarkdownFile(filePath: string): ContentItem {
  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);
  const slug = path.basename(filePath, path.extname(filePath));

  return {
    slug,
    title: String(data.title ?? "Untitled"),
    summary: String(data.summary ?? ""),
    date: String(data.date ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    featured: Boolean(data.featured ?? false),
    repo: data.repo ? String(data.repo) : undefined,
    demo: data.demo ? String(data.demo) : undefined,
    content
  };
}

export function getAllContent(type: ContentType): ContentItem[] {
  const root = contentRoots[type];

  if (!fs.existsSync(root)) {
    return [];
  }

  const files = fs
    .readdirSync(root)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));

  return files
    .map((file) => readMarkdownFile(path.join(root, file)))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getContentBySlug(type: ContentType, slug: string): ContentItem | null {
  const root = contentRoots[type];
  const extensions = [".md", ".mdx"];

  for (const ext of extensions) {
    const filePath = path.join(root, `${slug}${ext}`);
    if (fs.existsSync(filePath)) {
      return readMarkdownFile(filePath);
    }
  }

  return null;
}

export function markdownToHtml(markdown: string): string {
  return marked.parse(markdown, { async: false }) as string;
}
