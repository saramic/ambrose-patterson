import type { MetadataRoute } from "next";
import { relatedArtists } from "@/content/relatedArtists";
import { games } from "@/content/games";

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
    {
      url: `${SITE_URL}/press/around-the-web/hugh-ramsay/video`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/games`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    // Only games with a real page (an `href`) belong in the sitemap —
    // the rest are "coming soon" entries on /games with no route yet.
    ...games
      .filter((game) => game.href)
      .map((game) => ({
        url: `${SITE_URL}${game.href}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.5,
      })),
  ];
}
