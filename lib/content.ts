import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export type ContentType = "blog" | "projects";

export type ImpactMetric = {
  label: string;
  value: string;
  detail?: string;
};

export type ProjectVisual = {
  src: string;
  alt: string;
  caption?: string;
};

export type ContentItem = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  featured: boolean;
  coverImage?: string;
  visuals: ProjectVisual[];
  repo?: string;
  demo?: string;
  role?: string;
  timeline?: string;
  team?: string;
  stakeholders: string[];
  tradeoffs: string[];
  governance: string[];
  rollout: string[];
  adoption: string[];
  before: string[];
  after: string[];
  impact: ImpactMetric[];
  readingMinutes: number;
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
    coverImage: data.coverImage ? String(data.coverImage) : undefined,
    visuals: toProjectVisuals(data.visuals),
    repo: data.repo ? String(data.repo) : undefined,
    demo: data.demo ? String(data.demo) : undefined,
    role: data.role ? String(data.role) : undefined,
    timeline: data.timeline ? String(data.timeline) : undefined,
    team: data.team ? String(data.team) : undefined,
    stakeholders: toStringArray(data.stakeholders),
    tradeoffs: toStringArray(data.tradeoffs),
    governance: toStringArray(data.governance),
    rollout: toStringArray(data.rollout),
    adoption: toStringArray(data.adoption),
    before: toStringArray(data.before),
    after: toStringArray(data.after),
    impact: toImpactMetrics(data.impact),
    readingMinutes: getReadingMinutes(content),
    content
  };
}

function getReadingMinutes(markdown: string): number {
  const plainText = markdown.replace(/[#_*`>\-\[\]\(\)]/g, " ").trim();
  if (!plainText) {
    return 1;
  }

  const wordCount = plainText.split(/\s+/).length;
  return Math.max(1, Math.round(wordCount / 220));
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => String(item)).filter((item) => item.length > 0);
}

function toImpactMetrics(value: unknown): ImpactMetric[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.reduce<ImpactMetric[]>((accumulator, item) => {
    if (typeof item !== "object" || item === null) {
      return accumulator;
    }

    const metric = item as { label?: unknown; value?: unknown; detail?: unknown };
    if (!metric.label || !metric.value) {
      return accumulator;
    }

    accumulator.push({
      label: String(metric.label),
      value: String(metric.value),
      detail: metric.detail ? String(metric.detail) : undefined
    });

    return accumulator;
  }, []);
}

function toProjectVisuals(value: unknown): ProjectVisual[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.reduce<ProjectVisual[]>((accumulator, item) => {
    if (typeof item !== "object" || item === null) {
      return accumulator;
    }

    const visual = item as { src?: unknown; alt?: unknown; caption?: unknown };
    if (!visual.src || !visual.alt) {
      return accumulator;
    }

    accumulator.push({
      src: String(visual.src),
      alt: String(visual.alt),
      caption: visual.caption ? String(visual.caption) : undefined
    });

    return accumulator;
  }, []);
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
