import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getHireTrackBySlug, hireTracks } from "@/lib/hireTracks";

type Props = {
  params: Promise<{ track: string }>;
};

export function generateStaticParams() {
  return hireTracks.map((track) => ({ track: track.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { track: trackSlug } = await params;
  const track = getHireTrackBySlug(trackSlug);

  if (!track) {
    return { title: "Role Track" };
  }

  return {
    title: track.title,
    description: track.description,
    alternates: {
      canonical: `https://www.mikeyerke.com/hire/${track.slug}`
    },
    openGraph: {
      title: `${track.title} | Mike Yerke`,
      description: track.description,
      type: "website",
      url: `https://www.mikeyerke.com/hire/${track.slug}`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Mike Yerke" }]
    }
  };
}

export default async function HireTrackPage({ params }: Props) {
  const { track: trackSlug } = await params;
  const track = getHireTrackBySlug(trackSlug);

  if (!track) {
    notFound();
  }

  return (
    <section>
      <p className="meta">{track.label}</p>
      <h1>{track.title}</h1>
      <p className="page-intro">{track.description}</p>

      <div className="track-brief-grid">
        <article className="list-item">
          <h2>Ideal For</h2>
          <ul>
            {track.idealFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="list-item">
          <h2>Mandate Focus</h2>
          <ul>
            {track.mandateFocus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>

      <div className="track-brief-grid">
        <article className="list-item">
          <h2>Outcomes Focus</h2>
          <ul>
            {track.outcomesFocus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="list-item">
          <h2>First 90 Days</h2>
          <ul>
            {track.firstNinetyDays.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>

      <section className="cta-banner">
        <p className="eyebrow">Next Step</p>
        <h2>Use the links below to continue the evaluation flow.</h2>
        <div className="link-row">
          <Link className="btn btn-primary" href="/contact">
            Contact Mike
          </Link>
          <Link className="btn btn-secondary" href="/projects">
            Case Studies
          </Link>
          <Link className="btn btn-secondary" href="/hire">
            Back To Executive Brief
          </Link>
        </div>
      </section>
    </section>
  );
}
