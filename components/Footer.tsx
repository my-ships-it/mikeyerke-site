import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-shell">
        <p>{new Date().getFullYear()} Mike Yerke | GTM systems, AI workflows, and RevOps execution.</p>
        <p className="footer-links">
          <Link href="/hire">Executive Brief</Link>
          <Link href="/artifacts">Artifacts</Link>
          <Link href="/trust">Trust and Security</Link>
        </p>
      </div>
    </footer>
  );
}
