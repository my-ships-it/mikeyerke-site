import type { Metadata } from "next";
import Link from "next/link";
import fs from "node:fs";
import path from "node:path";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume and professional highlights for Mike Yerke."
};

export default function ResumePage() {
  const resumePath = path.join(process.cwd(), "public", "mike-yerke-resume.pdf");
  const hasResumePdf = fs.existsSync(resumePath);

  return (
    <section>
      <h1>Resume</h1>
      <p className="page-intro">
        {hasResumePdf
          ? "Latest resume is available as a downloadable PDF."
          : "Add your latest PDF to /public/mike-yerke-resume.pdf."}
      </p>

      <div className="link-row">
        {hasResumePdf ? (
          <Link className="btn btn-primary" href="/mike-yerke-resume.pdf" target="_blank">
            Download Resume (PDF)
          </Link>
        ) : (
          <span className="meta">Resume PDF not uploaded yet.</span>
        )}
        <Link className="btn btn-secondary" href="/contact">
          Contact Mike
        </Link>
      </div>

      <div className="list-stack">
        <article className="list-item">
          <h2>Current Focus</h2>
          <p>GTM systems design, AI operationalization, and scalable RevOps leadership.</p>
        </article>
        <article className="list-item">
          <h2>Hiring Use Case</h2>
          <p>Use this page in job applications as a one-click path to resume + work samples + contact info.</p>
        </article>
      </div>
    </section>
  );
}
