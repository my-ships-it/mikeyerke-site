import type { Metadata } from "next";
import { Space_Grotesk, Source_Sans_3 } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display"
});

const bodyFont = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mikeyerke.com"),
  title: {
    default: "Mike Yerke | GTM Systems + AI + RevOps",
    template: "%s | Mike Yerke"
  },
  description:
    "Portfolio hub for Mike Yerke. Projects, writing, and GTM systems work focused on AI, RevOps, and scalable growth operations.",
  openGraph: {
    title: "Mike Yerke",
    description: "Projects, writing, and GTM systems work.",
    url: "https://mikeyerke.com",
    siteName: "Mike Yerke",
    type: "website"
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
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>
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
      </body>
    </html>
  );
}
