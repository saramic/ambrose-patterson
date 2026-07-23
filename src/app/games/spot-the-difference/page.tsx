import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/book/SiteNav";
import { SiteFooter } from "@/components/book/SiteFooter";
import { SectionHeader } from "@/components/book/SectionHeader";
import { SpotTheDifferenceGame } from "@/components/book/SpotTheDifferenceGame";

const SITE_URL = "https://ambrosepatterson.com.au";
const PAGE_TITLE = "Spot the Difference: Ambrose Patterson's Still Life";
const PAGE_DESCRIPTION =
  "Find all 5 differences between two versions of the still life on the cover of Ambrose Patterson: His Life & Art, before the clock runs out.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/games/spot-the-difference" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/games/spot-the-difference`,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

export default function SpotTheDifferencePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <section className="bg-background">
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-24 flex flex-col gap-10">
            <SectionHeader
              label="Games & Interactives"
              title="Spot the Difference"
              subtitle="Two versions of the still life from the cover of Ambrose Patterson: His Life & Art — find all 5 changes before time runs out."
              align="left"
            />
            <p className="font-sans text-sm leading-[1.85] text-foreground/80 max-w-2xl">
              This still life — flowers, a patterned screen, and a cluttered
              tabletop — is the painting on the front cover of{" "}
              <Link
                href="/#book"
                className="text-primary underline underline-offset-2 hover:no-underline">
                Jane Alexander&apos;s monograph
              </Link>
              . See more of Patterson&apos;s work and circle in{" "}
              <Link
                href="/press/around-the-web"
                className="text-primary underline underline-offset-2 hover:no-underline">
                Around the Web
              </Link>
              .
            </p>
            <SpotTheDifferenceGame />
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
