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
  const project = getContentBySlug("projects", slug);
  const title = clampText(project?.title || "Mike Yerke Projects", 95);
  const summary = clampText(
    project?.summary || "Case studies across GTM systems, AI workflow design, and RevOps operations.",
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
            "radial-gradient(circle at 12% 18%, rgba(89, 171, 255, 0.3), transparent 27%), linear-gradient(140deg, #08162b, #103050 60%, #1a4469)",
          color: "#f2f8ff",
          padding: "54px"
        }}
      >
        <div style={{ display: "flex", fontSize: 24, color: "#95beff", fontWeight: 700 }}>Project Case Study</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 980 }}>
          <div style={{ fontSize: 64, lineHeight: 1.06, fontWeight: 800 }}>{title}</div>
          <div style={{ fontSize: 30, color: "#dce9ff", lineHeight: 1.24 }}>{summary}</div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#bdd8ff" }}>mikeyerke.com/projects</div>
      </div>
    ),
    size
  );
}
