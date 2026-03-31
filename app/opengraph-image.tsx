import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Mike Yerke | GTM Systems + AI + RevOps";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function OpenGraphImage() {
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
            "radial-gradient(circle at 15% 15%, rgba(45, 115, 255, 0.35), transparent 28%), linear-gradient(130deg, #0b1326, #11284a 55%, #0f3a62)",
          color: "#f3f7ff",
          padding: "56px"
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            color: "#8dc2ff"
          }}
        >
          Mike Yerke
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 920 }}>
          <div style={{ fontSize: 70, fontWeight: 800, lineHeight: 1.05 }}>GTM Systems + AI + RevOps</div>
          <div style={{ fontSize: 30, color: "#dbe9ff" }}>
            Building high-accountability operating systems that convert strategy into measurable execution.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#afd0ff" }}>mikeyerke.com</div>
      </div>
    ),
    size
  );
}
