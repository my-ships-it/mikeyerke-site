import fs from "node:fs";
import path from "node:path";
import Link from "next/link";

type VideoWalkthroughProps = {
  title?: string;
  description?: string;
  ctaLabel?: string;
};

const LOCAL_VIDEO_PUBLIC_PATH = "/walkthrough/mike-yerke-walkthrough.webm";

function toEmbedUrl(rawUrl: string): string {
  if (rawUrl.includes("youtube.com/embed") || rawUrl.includes("player.vimeo.com/video")) {
    return rawUrl;
  }

  if (rawUrl.includes("youtube.com/watch")) {
    try {
      const url = new URL(rawUrl);
      const id = url.searchParams.get("v");
      if (id) {
        return `https://www.youtube.com/embed/${id}`;
      }
    } catch {
      return rawUrl;
    }
  }

  if (rawUrl.includes("youtu.be/")) {
    const id = rawUrl.split("youtu.be/")[1]?.split("?")[0];
    if (id) {
      return `https://www.youtube.com/embed/${id}`;
    }
  }

  return rawUrl;
}

function hasLocalWalkthroughVideo(): boolean {
  const localPath = path.join(process.cwd(), "public", LOCAL_VIDEO_PUBLIC_PATH.replace(/^\//, ""));
  return fs.existsSync(localPath);
}

export function VideoWalkthrough({
  title = "2-Minute Walkthrough",
  description = "A concise walkthrough helps recruiters quickly evaluate systems thinking, technical depth, and communication style.",
  ctaLabel = "Open Executive Brief"
}: VideoWalkthroughProps) {
  const rawVideoUrl = process.env.NEXT_PUBLIC_WALKTHROUGH_VIDEO_URL;
  const embedUrl = rawVideoUrl ? toEmbedUrl(rawVideoUrl) : "";
  const showLocalVideo = !embedUrl && hasLocalWalkthroughVideo();

  if (!embedUrl && !showLocalVideo) {
    return null;
  }

  return (
    <section className="video-walkthrough">
      <div className="section-header">
        <h2>{title}</h2>
      </div>
      <p className="page-intro">{description}</p>

      <div className="video-frame-wrap">
        {embedUrl ? (
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="video-frame"
            src={embedUrl}
            title="Mike Yerke walkthrough video"
          />
        ) : (
          <video className="video-native" controls preload="metadata">
            <source src={LOCAL_VIDEO_PUBLIC_PATH} type="video/webm" />
            Your browser does not support embedded video playback.
          </video>
        )}
      </div>

      <div className="link-row">
        <Link className="btn btn-secondary" href="/hire">
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
