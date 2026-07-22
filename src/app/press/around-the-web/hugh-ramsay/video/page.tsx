import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/book/SiteNav";
import { SiteFooter } from "@/components/book/SiteFooter";
import { SectionHeader } from "@/components/book/SectionHeader";
import { HughRamsayVideoSection } from "@/components/book/HughRamsayVideoSection";
import {
  HUGH_RAMSAY_VIDEO_TITLE,
  HUGH_RAMSAY_VIDEO_SUMMARY,
  HUGH_RAMSAY_VIDEO_SPEAKER,
} from "@/content/hughRamsayVideo";

const SITE_URL = "https://ambrosepatterson.com.au";
const PAGE_TITLE = `${HUGH_RAMSAY_VIDEO_TITLE} — Hugh Ramsay`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: HUGH_RAMSAY_VIDEO_SUMMARY,
  alternates: { canonical: "/press/around-the-web/hugh-ramsay/video" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/press/around-the-web/hugh-ramsay/video`,
    title: PAGE_TITLE,
    description: HUGH_RAMSAY_VIDEO_SUMMARY,
  },
};

export default function HughRamsayVideoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <section className="bg-background">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-24 flex flex-col gap-14">
            <SectionHeader
              label="Hugh Ramsay on Film"
              title={HUGH_RAMSAY_VIDEO_TITLE}
              subtitle={`${HUGH_RAMSAY_VIDEO_SUMMARY} Presented by ${HUGH_RAMSAY_VIDEO_SPEAKER}.`}
            />
            <HughRamsayVideoSection />
            <Link
              href="/press/around-the-web/hugh-ramsay"
              className="font-sans text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors self-start">
              ← Back to Hugh Ramsay
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
