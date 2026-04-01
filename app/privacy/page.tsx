import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy notice for mikeyerke.com.",
  alternates: {
    canonical: "https://www.mikeyerke.com/privacy"
  }
};

const LAST_UPDATED = "2026-04-01";

export default function PrivacyPage() {
  return (
    <section>
      <h1>Privacy</h1>
      <p className="page-intro">
        This site is a portfolio and hiring hub. It is designed to collect as little data as possible.
      </p>

      <p className="meta">Last updated: {LAST_UPDATED}</p>

      <div className="list-stack">
        <article className="list-item">
          <h2>What Data Is Collected</h2>
          <p>
            If you submit the contact form, the message and basic contact details you enter are sent to the
            configured delivery destination. No account system or user profile database exists on this site.
          </p>
        </article>

        <article className="list-item">
          <h2>How Data Is Used</h2>
          <p>
            Contact details are used only to respond to hiring or collaboration inquiries. Data is not sold, and
            no advertising profile is created.
          </p>
        </article>

        <article className="list-item">
          <h2>Retention</h2>
          <p>
            Messages are retained only as needed for recruiting and business communication, then deleted when no
            longer necessary.
          </p>
        </article>
      </div>

      <section className="cta-banner">
        <p className="eyebrow">Related</p>
        <h2>Need details on security controls?</h2>
        <div className="link-row">
          <Link className="btn btn-primary" href="/trust">
            Trust & Security
          </Link>
          <Link className="btn btn-secondary" href="/.well-known/security.txt">
            security.txt
          </Link>
        </div>
      </section>
    </section>
  );
}
