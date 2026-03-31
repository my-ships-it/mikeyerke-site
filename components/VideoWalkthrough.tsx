import Link from "next/link";

type VideoWalkthroughProps = {
  title?: string;
  description?: string;
  ctaLabel?: string;
};

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

export function VideoWalkthrough({
  title = "2-Minute Walkthrough",
  description = "A concise walkthrough helps recruiters quickly evaluate systems thinking, technical depth, and communication style.",
  ctaLabel = "Open Recruiter Quick View"
}: VideoWalkthroughProps) {
  const rawVideoUrl = process.env.NEXT_PUBLIC_WALKTHROUGH_VIDEO_URL;
  const embedUrl = rawVideoUrl ? toEmbedUrl(rawVideoUrl) : "";

  return (
    <section className="video-walkthrough">
      <div className="section-header">
        <h2>{title}</h2>
      </div>
      <p className="page-intro">{description}</p>

      {embedUrl ? (
        <div className="video-frame-wrap">
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="video-frame"
            src={embedUrl}
            title="Mike Yerke walkthrough video"
          />
        </div>
      ) : (
        <article className="list-item">
          <h3>Video Not Added Yet</h3>
          <p>
            Set <code>NEXT_PUBLIC_WALKTHROUGH_VIDEO_URL</code> in Vercel to publish your 2-minute walkthrough.
          </p>
        </article>
      )}

      <div className="link-row">
        <Link className="btn btn-secondary" href="/hire">
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
