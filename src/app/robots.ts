import type { MetadataRoute } from "next";

const SITE_URL = "https://ambrosepatterson.com.au";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/ui", "/ui/og", "/reviews", "/launch"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
