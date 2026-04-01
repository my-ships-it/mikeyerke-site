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
        {hasResumePdf ? "Latest resume is available as a PDF." : "Upload the file to /public/mike-yerke-resume.pdf."}
      </p>

      <div className="link-row">
        {hasResumePdf ? (
          <Link className="btn btn-primary" href="/mike-yerke-resume.pdf" target="_blank">
            Download Resume (PDF)
          </Link>
        ) : (
          <span className="meta">Resume PDF not uploaded yet.</span>
        )}
        <Link className="btn btn-secondary" href="/projects">
          View Work
        </Link>
        <Link className="btn btn-secondary" href="/contact">
          Contact
        </Link>
        <Link className="btn btn-secondary" href="/hire">
          Executive Brief
        </Link>
      </div>

      <section className="list-item">
        <h2>Current Focus</h2>
        <p>GTM systems design, AI operationalization, and high-accountability RevOps leadership.</p>
      </section>
    </section>
  );
}
