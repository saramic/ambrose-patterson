import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/book/SiteNav";
import { SiteFooter } from "@/components/book/SiteFooter";
import { SectionHeader } from "@/components/book/SectionHeader";
import { AroundTheWebSection } from "@/components/book/AroundTheWebSection";
import { AROUND_THE_WEB_INTRO } from "@/content/aroundTheWeb";

const SITE_URL = "https://ambrosepatterson.com.au";
const PAGE_TITLE = "Ambrose Patterson Around the Web";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: AROUND_THE_WEB_INTRO,
  alternates: { canonical: "/press/around-the-web" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/press/around-the-web`,
    title: PAGE_TITLE,
    description: AROUND_THE_WEB_INTRO,
  },
};

export default function AroundTheWebPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <section className="bg-background">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-24 flex flex-col gap-14">
            <SectionHeader
              label="Resource Directory"
              title="Around the Web"
              subtitle="Where to find more of Ambrose Patterson online — museums, archives, images, and further reading."
            />
            <AroundTheWebSection />
            <Link
              href="/press"
              className="font-sans text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors self-start">
              ← Back to the interview
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
