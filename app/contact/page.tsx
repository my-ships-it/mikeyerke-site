import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact links for Mike Yerke."
};

export default function ContactPage() {
  const calendlyBaseUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/mikeyerke";
  const calendlyEmbedUrl = `${calendlyBaseUrl}?hide_event_type_details=1&hide_gdpr_banner=1`;

  return (
    <section>
      <h1>Contact</h1>
      <p className="page-intro">
        For leadership opportunities, consulting conversations, or collaboration on GTM systems, reach out here.
      </p>

      <div className="contact-grid">
        <article className="showcase-card">
          <p className="eyebrow">Book Time Directly</p>
          <h2>Schedule A 30-Minute Intro</h2>
          <p>
            The fastest path is a live conversation. Use the scheduler below, or open Calendly in a new tab.
          </p>
          <div className="link-row">
            <Link className="btn btn-primary" href={calendlyBaseUrl} rel="noreferrer" target="_blank">
              Open Calendly
            </Link>
          </div>
          <div className="calendly-frame-wrap">
            <iframe className="calendly-frame" src={calendlyEmbedUrl} title="Book time with Mike Yerke" />
          </div>
        </article>

        <article className="list-item">
          <h2>Send A Detailed Note</h2>
          <p>Use this form when you want to share role context, scope, or workflow challenges up front.</p>
          <ContactForm />
        </article>
      </div>

      <section className="list-item">
        <h2>What Happens Next</h2>
        <div className="readiness-list">
          <p>
            <strong>Within 24 hours:</strong> I reply with fit signal and proposed next step.
          </p>
          <p>
            <strong>Before first call:</strong> I share relevant case-study links and artifact context.
          </p>
          <p>
            <strong>After first call:</strong> If aligned, I send a role-specific operating hypothesis.
          </p>
        </div>
      </section>

      <div className="list-stack">
        <article className="list-item">
          <h2>Email</h2>
          <p>
            <a href="mailto:mike@mikeyerke.com">mike@mikeyerke.com</a>
          </p>
        </article>

        <article className="list-item">
          <h2>LinkedIn</h2>
          <p>
            <Link href="https://www.linkedin.com/in/mikeyerke/" target="_blank" rel="noreferrer">
              linkedin.com/in/mikeyerke
            </Link>
          </p>
        </article>

        <article className="list-item">
          <h2>GitHub</h2>
          <p>
            <Link href="https://github.com/my-ships-it" target="_blank" rel="noreferrer">
              github.com/my-ships-it
            </Link>
          </p>
        </article>
      </div>
    </section>
  );
}
