import type { MetadataRoute } from "next";
import { relatedArtists } from "@/content/relatedArtists";

const SITE_URL = "https://ambrosepatterson.com.au";

// /reviews, /launch, /ui and /ui/og are excluded (dummy data / internal
// preview pages, not ready for indexing — see robots.ts). Anchor sections
// (#artist, #book, #author) live on this one page and aren't separately
// crawlable documents, so they aren't listed as their own sitemap entries.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/press`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/press/around-the-web`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...relatedArtists.map((artist) => ({
      url: `${SITE_URL}/press/around-the-web/${artist.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
