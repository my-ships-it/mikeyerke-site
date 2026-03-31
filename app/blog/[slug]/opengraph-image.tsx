import { ImageResponse } from "next/og";
import { getContentBySlug } from "@/lib/content";

export const runtime = "nodejs";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

function clampText(value: string, maxLength: number): string {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1)}…`;
}

export default async function OpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const post = getContentBySlug("blog", slug);
  const title = clampText(post?.title || "Mike Yerke Blog", 95);
  const summary = clampText(
    post?.summary || "Practical writing on GTM systems, AI workflows, and RevOps execution.",
    160
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at 15% 15%, rgba(64, 145, 255, 0.32), transparent 27%), linear-gradient(140deg, #0f1322, #102d4f 62%, #17486f)",
          color: "#f5f9ff",
          padding: "54px"
        }}
      >
        <div style={{ display: "flex", fontSize: 24, color: "#97c1ff", fontWeight: 700 }}>Blog Article</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 980 }}>
          <div style={{ fontSize: 64, lineHeight: 1.06, fontWeight: 800 }}>{title}</div>
          <div style={{ fontSize: 30, color: "#dbe9ff", lineHeight: 1.24 }}>{summary}</div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#b8d6ff" }}>mikeyerke.com/blog</div>
      </div>
    ),
    size
  );
}
