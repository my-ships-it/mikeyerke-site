import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mikeyerke.com"),
  title: {
    default: "Mike Yerke | GTM Systems + AI + RevOps",
    template: "%s | Mike Yerke"
  },
  description:
    "Portfolio hub for Mike Yerke. Projects, writing, and GTM systems work focused on AI, RevOps, and scalable growth operations.",
  openGraph: {
    title: "Mike Yerke",
    description: "Projects, writing, and GTM systems work.",
    url: "https://www.mikeyerke.com",
    siteName: "Mike Yerke",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Mike Yerke | GTM Systems + AI + RevOps"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Mike Yerke | GTM Systems + AI + RevOps",
    description: "Projects, writing, and GTM systems work.",
    images: ["/opengraph-image"]
  },
  alternates: {
    canonical: "https://www.mikeyerke.com"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mike Yerke",
              url: "https://www.mikeyerke.com",
              jobTitle: "GTM Systems and RevOps Leader",
              sameAs: ["https://www.linkedin.com/in/mikeyerke/", "https://github.com/my-ships-it"]
            })
          }}
          type="application/ld+json"
        />
        <Nav />
        <main className="container page-wrap" id="main-content">
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
