import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const isProtected = Boolean(process.env.SITE_USERNAME && process.env.SITE_PASSWORD);

  return {
    rules: {
      userAgent: "*",
      ...(isProtected ? { disallow: "/" } : { allow: "/" })
    },
    sitemap: "https://www.mikeyerke.com/sitemap.xml"
  };
}
