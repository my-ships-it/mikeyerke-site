"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
  { href: "/hire", label: "Hire" }
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
                <Link className={pathname === link.href ? "is-active" : ""} href={link.href}>
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
