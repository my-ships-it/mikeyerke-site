import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-shell">
        <p>{new Date().getFullYear()} Mike Yerke</p>
        <p className="footer-links">
          <Link href="/projects">Work</Link>
          <Link href="/blog">Writing</Link>
          <Link href="/hire">Executive Brief</Link>
          <Link href="/trust">Security</Link>
        </p>
      </div>
    </footer>
  );
}
