"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Work" },
  { href: "/blog", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
  { href: "/hire", label: "Brief" }
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Link className="brand" href="/">
          Mike Yerke
        </Link>
        <nav>
          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  className={`${isActivePath(pathname, link.href) ? "is-active " : ""}${
                    link.href === "/hire" ? "nav-cta" : ""
                  }`}
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function isActivePath(pathname: string, href: string): boolean {
  if (pathname === href) {
    return true;
  }

  if (href === "/") {
    return false;
  }

  return pathname.startsWith(`${href}/`);
}
