import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trust and Security",
  description: "Security, privacy, and data handling approach for mikeyerke.com.",
  alternates: {
    canonical: "https://www.mikeyerke.com/trust"
  }
};

export default function TrustPage() {
  return (
    <section>
      <h1>Trust and Security</h1>
      <p className="page-intro">
        This portfolio uses privacy-first defaults, strict security headers, and minimal data collection.
      </p>

      <div className="list-stack">
        <article className="list-item">
          <h2>Data Collected</h2>
          <p>
            Only contact-form submissions are intentionally collected when you choose to send a message. No user
            account system or application database is used on this site.
          </p>
        </article>

        <article className="list-item">
          <h2>Security Controls</h2>
          <p>
            HTTP security headers, strict transport security, request validation, origin controls, and rate
            limiting are applied at the app and middleware layers.
          </p>
        </article>

        <article className="list-item">
          <h2>Contact Form Handling</h2>
          <p>
            Contact form submissions pass through anti-spam checks and are forwarded to configured delivery
            targets (webhook or email provider). Sensitive secrets are stored in Vercel environment variables.
          </p>
        </article>

        <article className="list-item">
          <h2>Operational Hygiene</h2>
          <p>
            Platform credentials use unique passwords and multi-factor authentication. Dependencies and deployment
            settings are periodically reviewed for updates.
          </p>
        </article>
      </div>

      <section className="cta-banner">
        <p className="eyebrow">Security Questions</p>
        <h2>Need implementation specifics for your security review?</h2>
        <div className="link-row">
          <Link className="btn btn-primary" href="/contact">
            Contact Mike
          </Link>
          <Link className="btn btn-secondary" href="/hire">
            Executive Brief
          </Link>
        </div>
      </section>
    </section>
  );
}
