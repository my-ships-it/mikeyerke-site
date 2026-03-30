import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

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
        <Nav />
        <main className="container page-wrap">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
