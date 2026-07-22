import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/book/SiteNav";
import { SiteFooter } from "@/components/book/SiteFooter";
import { SectionHeader } from "@/components/book/SectionHeader";
import { JourneySection } from "@/components/book/JourneySection";
import { PARIS_TO_SEATTLE_INTRO } from "@/content/parisToSeattleGame";

const SITE_URL = "https://ambrosepatterson.com.au";
const PAGE_TITLE = "Ambrose Patterson's Journey: Melbourne to Seattle";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PARIS_TO_SEATTLE_INTRO,
  alternates: { canonical: "/games/paris-to-seattle" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/games/paris-to-seattle`,
    title: PAGE_TITLE,
    description: PARIS_TO_SEATTLE_INTRO,
  },
};

export default function ParisToSeattlePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <section className="bg-background">
          <div className="max-w-3xl mx-auto px-6 py-20 md:py-24 flex flex-col gap-14">
            <SectionHeader
              label="Games & Interactives"
              title="Paris to Seattle"
              subtitle="A stop-by-stop map of Ambrose Patterson's actual route around the world."
              align="left"
            />
            <JourneySection />
            <Link
              href="/games"
              className="font-sans text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors self-start">
              ← Back to Games
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
