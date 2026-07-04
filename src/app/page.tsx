import { SiteNav } from "@/components/book/SiteNav";
import { HeroSection } from "@/components/book/HeroSection";
import { ArtistSection } from "@/components/book/ArtistSection";
import { BookSection } from "@/components/book/BookSection";
import { AuthorSection } from "@/components/book/AuthorSection";
import { SiteFooter } from "@/components/book/SiteFooter";

const SITE_URL = "https://ambrosepatterson.com.au";

// Marks the on-page sections as distinct parts of the homepage so search
// engines have an explicit hint for anchor/jump-link sitelinks (the nav's
// #artist/#book/#author anchors + matching <h2> headings are the on-page
// half of this signal — see ArtistSection/BookSection/AuthorSection).
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": SITE_URL,
  url: SITE_URL,
  name: "Ambrose Patterson: His Life & Art",
  hasPart: [
    {
      "@type": "WebPageElement",
      "@id": `${SITE_URL}#artist`,
      name: "The Artist",
    },
    {
      "@type": "WebPageElement",
      "@id": `${SITE_URL}#book`,
      name: "The Book",
    },
    {
      "@type": "WebPageElement",
      "@id": `${SITE_URL}#author`,
      name: "The Author",
    },
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <SiteNav />
      <main className="flex-1">
        <HeroSection />
        <ArtistSection />
        <BookSection />
        <AuthorSection />
      </main>
      <SiteFooter />
    </div>
  );
}
