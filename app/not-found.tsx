import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section>
      <h1>Page not found</h1>
      <p className="page-intro">
        The page you requested does not exist or may have moved. Use one of the links below to continue.
      </p>
      <div className="link-row">
        <Link className="btn btn-primary" href="/">
          Home
        </Link>
        <Link className="btn btn-secondary" href="/projects">
          Work
        </Link>
        <Link className="btn btn-secondary" href="/contact">
          Contact
        </Link>
      </div>
    </section>
  );
}
