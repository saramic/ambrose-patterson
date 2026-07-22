import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/book/SiteNav";
import { SiteFooter } from "@/components/book/SiteFooter";
import { SectionHeader } from "@/components/book/SectionHeader";
import { SlidingJigsawGameLoader } from "@/components/book/SlidingJigsawGameLoader";

const SITE_URL = "https://ambrosepatterson.com.au";
const PAGE_TITLE = "Sliding Jigsaw: Ambrose Patterson's Self-Portrait";
const PAGE_DESCRIPTION =
  "A sliding tile puzzle of Ambrose Patterson's Self-portrait (La Fenêtre de l'Atelier), ca. 1902 — reassemble it at four difficulty levels, from 3×3 up to 6×6.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/games/sliding-jigsaw" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/games/sliding-jigsaw`,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

export default function SlidingJigsawPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <section className="bg-background">
          <div className="max-w-3xl mx-auto px-6 py-20 md:py-24 flex flex-col gap-10">
            <SectionHeader
              label="Games & Interactives"
              title="Sliding Jigsaw"
              subtitle="Reassemble Ambrose Patterson's Self-portrait (La Fenêtre de l'Atelier), ca. 1902 — click any tile next to the empty space to slide it into place."
              align="left"
            />
            <p className="font-sans text-sm leading-[1.85] text-foreground/80 max-w-2xl">
              Patterson painted this self-portrait in his Paris studio around
              1902, catching his own reflection at work in a freestanding
              mirror beside the window — a quiet, self-referential scene from
              the same bohemian years covered in{" "}
              <Link
                href="/press"
                className="text-primary underline underline-offset-2 hover:no-underline">
                the interview
              </Link>{" "}
              and{" "}
              <Link
                href="/#book"
                className="text-primary underline underline-offset-2 hover:no-underline">
                Jane Alexander&apos;s monograph
              </Link>
              .
            </p>
            <SlidingJigsawGameLoader />
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
