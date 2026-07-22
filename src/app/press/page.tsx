import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/book/SiteNav";
import { SiteFooter } from "@/components/book/SiteFooter";
import { SectionHeader } from "@/components/book/SectionHeader";
import { InterviewPlayer } from "@/components/book/InterviewPlayer";
import { parseTimestamp, formatIsoDuration } from "@/lib/video-time";
import {
  INTERVIEW_TITLE,
  INTERVIEW_SUMMARY,
  chapters,
  highlights,
  highlightLabel,
  hasVideo,
  YOUTUBE_VIDEO_ID,
} from "@/content/interview";

const SITE_URL = "https://ambrosepatterson.com.au";

export const metadata: Metadata = {
  title: INTERVIEW_TITLE,
  description: INTERVIEW_SUMMARY,
  alternates: { canonical: "/press" },
  openGraph: {
    type: "video.other",
    url: `${SITE_URL}/press`,
    title: INTERVIEW_TITLE,
    description: INTERVIEW_SUMMARY,
  },
};

const durationSeconds = parseTimestamp(chapters[chapters.length - 1].end);

// NOTE: once the real YouTube video is live, add `uploadDate` (ISO 8601) here —
// Google's VideoObject rich result requires it and we don't have a real value yet.
const videoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: INTERVIEW_TITLE,
  description: INTERVIEW_SUMMARY,
  thumbnailUrl: [
    `https://i.ytimg.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`,
  ],
  embedUrl: `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}`,
  duration: formatIsoDuration(durationSeconds),
  hasPart: highlights.map((highlight) => ({
    "@type": "Clip",
    name: highlightLabel(highlight.type),
    startOffset: parseTimestamp(highlight.start),
    endOffset: parseTimestamp(highlight.end),
    url: `${SITE_URL}/press#t=${parseTimestamp(highlight.start)}`,
  })),
};

export default function InterviewPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {hasVideo && (
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
        />
      )}
      <SiteNav />
      <main className="flex-1">
        <section className="bg-background">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-24 flex flex-col gap-14">
            <SectionHeader
              label="Conversation"
              title="The Interview"
              subtitle={INTERVIEW_SUMMARY}
            />
            <InterviewPlayer />
            <div className="flex flex-col gap-2">
              <Link
                href="/press/around-the-web"
                className="font-sans text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors self-start">
                Explore more of Patterson around the web →
              </Link>
              <Link
                href="/games"
                className="font-sans text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors self-start">
                Play: games & interactives →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
