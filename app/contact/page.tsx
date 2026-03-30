import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact links for Mike Yerke."
};

export default function ContactPage() {
  return (
    <section>
      <h1>Contact</h1>
      <p className="page-intro">Best way to reach me is by email or LinkedIn.</p>

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
